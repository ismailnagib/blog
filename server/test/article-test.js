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
        Article.deleteOne({
            title: 'Test',
            content: 'Lorem ipsum'
        })
        .then(() => {
            done()
        })
    })

    var id = ''

    it('POST /articles/ should save a new article', function(done) {
        chai
        .request(app)
        .post('/articles/')
        .send({
            title: 'Test',
            content: 'Lorem ipsum',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE1Mzc3NjE5MTJ9.ZAfnSsIE1UBVE2l1NpUw1dRh4Lv1zf-eA1XGynlWJYI'
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body.data).to.have.property('title')
            expect(res.body.data).to.have.property('content')
            expect(res.body.data.title).to.equal('Test')
            expect(res.body.data.content).to.equal('Lorem ipsum')
            id = res.body.data._id
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
            expect(res.body.data).to.have.lengthOf(2)
            expect(res.body.data[0]).to.have.property('_id')
            expect(res.body.data[0]).to.have.property('title')
            expect(res.body.data[0]).to.have.property('content')
            expect(res.body.data[0]).to.have.property('author')
            expect(res.body.data[0].author).to.have.property('name')
            expect(res.body.data[0]._id).to.equal(id)
            expect(res.body.data[0].title).to.equal('Test')
            expect(res.body.data[0].content).to.equal('Lorem ipsum')
            expect(res.body.data[0].author.name).to.equal('A')
            done()
        })
    })

    it('GET /articles/:id/ should show a spesific article based on its id', function (done) {
        chai
        .request(app)
        .get('/articles/5ba8722c780caf304d37b90a/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.data).to.be.a('object')
            expect(res.body.data).to.have.property('title')
            expect(res.body.data).to.have.property('content')
            expect(res.body.data).to.have.property('author')
            expect(res.body.data.author).to.have.property('name')
            expect(res.body.data.title).to.equal('Title')
            expect(res.body.data.content).to.equal('Content')
            expect(res.body.data.author.name).to.equal('A')
            done()
        })
    })

    it('PUT /articles/ should edit added article', function (done) {
        chai
        .request(app)
        .put('/articles')
        .send({
            id: id,
            title: 'The title was Test',
            content: 'The content was Lorem ipsum',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE1Mzc3NjE5MTJ9.ZAfnSsIE1UBVE2l1NpUw1dRh4Lv1zf-eA1XGynlWJYI'
        })
        .end((err, res) => {
            chai
            .request(app)
            .get('/articles/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(2)
                expect(res.body.data[0]).to.have.property('_id')
                expect(res.body.data[0]).to.have.property('title')
                expect(res.body.data[0]).to.have.property('content')
                expect(res.body.data[0]._id).to.equal(id)
                expect(res.body.data[0].title).to.equal('The title was Test')
                expect(res.body.data[0].content).to.equal('The content was Lorem ipsum')
                done()
            })
        })
    })

    it('DELETE /articles/ should delete added article', function(done) {
        chai
        .request(app)
        .delete('/articles/')
        .send({
            id: id,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE1Mzc3NjE5MTJ9.ZAfnSsIE1UBVE2l1NpUw1dRh4Lv1zf-eA1XGynlWJYI'
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            
            chai
            .request(app)
            .get('/articles/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(1)
            })

            done()
        })
    })    
});