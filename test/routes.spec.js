process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server/app.js');



chai.use(chaiHttp);

describe('API Routes', function() {
	it('should create statsOnDate entries', function(done) {
		chai.request(server)
		.post('/stats')
		.send({"team": "Boston"})
		.end(function(err, res) {
			res.should.have.status(200);
			done();
		})
	})
});