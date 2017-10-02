var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');
var mongoose = require('mongoose'); 

chai.use(chaiHttp);

const testAll = (url, model, validation) => {
    return (done) => {
        chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            
            if(validation) {
                validation();
            } 
            else {
                res.body.forEach(doc => {
                    const instance = new model(doc);
                    should.not.exist(instance.validateSync())
                });
            }

            done();
        });
    };
};

const testSingle = (url, model, validation) => {
    return (done) => {
        chai.request(server)
        .get(url)
        .end((err, res) => {
            chai.request(server)
            .get(`${url}${res.body[0]._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                if(validation) {
                    validation();
                } 
                else {
                    const instance = new model(res.body);
                    
                    should.not.exist(instance.validateSync())
                }

                done();
            });
        });
    }
};

module.exports = {
    testAll,
    testSingle
};