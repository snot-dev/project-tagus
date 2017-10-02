var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../../app');
var mongoose = require('mongoose'); 

chai.use(chaiHttp);

const getAll = (url, model, validation) => {
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

const getOneById = (url, model, validation) => {
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
    };
};

const createNew = (url, model,payload, validation) => {
    return (done) => {
        let totalDocs = 0;
        chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            totalDocs = res.body.length;

            chai.request(server)
            .post(url)
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                const instance = new model(res.body);

                console.log(instance);

                //should.not.exist(instance.validateSync())

                chai.request(server)
                .get(url)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.to.equal(totalDocs + 1);
                    done();
                });
            });
        });
    };
};

module.exports = {
    getAll,
    getOneById,
    createNew
};