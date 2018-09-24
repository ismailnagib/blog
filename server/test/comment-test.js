process.env.STATUS = 'test'

var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var Comment = require('../models/commentModel')
var app = require('../app')

chai.use(chaiHttp);

describe('Comment', function () {

    this.afterAll('Remove dummy data from DB', function (done) {
        Comment.deleteOne({
            words: 'Comment Test',
            commenter: '5ba8625fdfee191ba7934e04'
        })
        .then(() => {
            done()
        })
    })

    var id = ''

    it('POST /comments/ should save a new comment', function(done) {
        chai
        .request(app)
        .post('/comments/')
        .send({
            words: 'Comment Test',
            postId: '5ba8722c780caf304d37b90a',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE1Mzc3NjE5MTJ9.ZAfnSsIE1UBVE2l1NpUw1dRh4Lv1zf-eA1XGynlWJYI'
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body.data).to.have.property('words')
            expect(res.body.data).to.have.property('commenter')
            expect(res.body.data.words).to.equal('Comment Test')
            expect(res.body.data.commenter).to.equal('5ba8625fdfee191ba7934e04')
            id = res.body.data._id
            done()
        })
    });

    it('DELETE /comments/ should delete added comment', function(done) {
        chai
        .request(app)
        .delete('/comments/')
        .send({
            id: id,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE1Mzc3NjE5MTJ9.ZAfnSsIE1UBVE2l1NpUw1dRh4Lv1zf-eA1XGynlWJYI'
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            
            chai
            .request(app)
            .get('/comments/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(0)
            })

            done()
        })
    })    
})