process.env.STATUS = 'test'

var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var User = require('../models/userModel')
var app = require('../app')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('User', function() {
    
    this.afterAll('Remove dummy data from DB', function (done) {
        User.deleteOne({
            name: 'Test',
            email: 'test@test.com',
        })
        .then(() => {
            done()
        })
    })

    it('POST /users/register should add new user', function (done) {
        chai
        .request(app)
        .post('/users/register')
        .send({
            name: 'Test',
            email: 'test@test.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('email')
            expect(res.body.data).to.have.property('password')
            expect(res.body.data.name).to.equal('Test')
            expect(res.body.data.email).to.equal('test@test.com')
            expect(bcrypt.compareSync('password',res.body.data.password)).to.equal(true)
            done()
        })
    })

    it('POST /users/login should return token', function(done) {
        chai
        .request(app)
        .post('/users/login')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('token')
            expect(res.body.token).to.be.a('string')

            jwt.verify(res.body.token, process.env.JWT_KEY, (err, decoded) => {
                expect(decoded.email).to.equal('test@test.com')
            })

            done()
        })
    }); 
});