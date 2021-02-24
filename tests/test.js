const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaiHttp);

const server = require('../app/server');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IktvbmFuIiwidXNlcklkIjoiNjAzNjUzNzdhMDgyNTk0OTQ4OTQ3NDFiIiwiaWF0IjoxNjE0MTc4NTc3LCJleHAiOjE2MTQxODIxNzd9.1g6JgyiHzx3RDyzJrvtuKgH8GVOXyM2SuUhTYYrMZQc';

describe('Pangolin tests', function() {
    describe('All Pangolins', function() {
        it('should send pangolins list', function(done) {
            chai.request(server)
            .get('/v1')
            .auth(token, { type: 'bearer' })
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
        });
    });

    describe('One Pangolin', function() {
        it('should send a pangolin', function(done) {
            chai.request(server)
            .get('/v1/pangolins/6036234120a12c4478952445')
            .auth(token, { type: 'bearer' })
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            });
        });
    });
});