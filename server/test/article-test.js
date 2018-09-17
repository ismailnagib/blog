process.env.STATUS = 'test'

var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var Article = require('../models/articleModel')
var app = require('../app')

chai.use(chaiHttp);

describe('Article', function() {
    
    this.afterAll('Remove dummy data from DB', function (done) {
        Article.deleteMany({})
        .then(() => {
            done()
        })
    })

    it('POST /articles/ should save a new article', function(done) {
        chai
        .request(app)
        .post('/articles/')
        .send({
            title: 'Test',
            content: 'Lorem ipsum'
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body.data).to.have.property('title')
            expect(res.body.data).to.have.property('content')
            expect(res.body.data.title).to.equal('Test')
            expect(res.body.data.content).to.equal('Lorem ipsum')
            done()
        })
    });

    it('GET /articles/ should show added article', function(done) {
        chai
        .request(app)
        .get('/articles/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.lengthOf(1)
            expect(res.body.data[0]).to.have.property('title')
            expect(res.body.data[0]).to.have.property('content')
            expect(res.body.data[0].title).to.equal('Test')
            expect(res.body.data[0].content).to.equal('Lorem ipsum')
            done()
        })
    })

    it('DELETE /articles/ should delete added article', function(done) {
        chai
        .request(app)
        .delete('/articles/')
        .send({
            title: 'Test'
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            
            chai
            .request(app)
            .get('/articles/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(0)
            })

            done()
        })
    })    
});