const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');

const server = require('../server/server');
const knex = require('../db/knex');

chai.use(chaiHTTP)

describe('API route', () => {
	before((done) => {
		knex.migrate.latest()
		.then(() => {
		done();
		})
	})

	beforeEach((done) => {
		knex.seed.run()
		.then(() => {
		done();
		})
	})


	it('should return a random clue', (done) => {
		chai.request(server)
		.get('/api/v1/category/sports')
		.end((error, res) => {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('id');
			res.body.should.have.property('question');
			res.body.should.have.property('answer');
			res.body.should.have.property('value');
			done();
		})
	})

	it('should throw an error', (done) => {
		chai.request(server)
		.get('/api/v1/category/jack')
		.end((error, res) => {
			res.should.have.status(404);
			res.should.be.json;
			res.body.should.have.property('error');
			res.body.error.should.equal('jack does not exist! Please check the category you requested!');
			done();
		})
	})

	it('should return a random category', (done) => {
		chai.request(server)
		.get('/api/v1/category')
		.end((error, res) => {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('id');
			res.body.should.have.property('title');
			done();
		})
	})

	it('should not return a random category', (done) => {
		chai.request(server)
		.get('/api/v1/jack')
		.end((error, res) => {
			res.should.have.status(404);
			done();
		})
	})
})
