const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 

chai.use(chaiHttp);


class Tests {
    getAll (url, model, validation) {
        return done => {
            chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                
                if(validation) {
                    validation(res);
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
    
    getFirstFromCollection (url, model, validation) {
        return done => {
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
                        validation(res);
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
    
    getOneById (url, model, id, validation) {
        return done => {
            if(!id) {
                console.log("You must pass a valid id");
                return false;
            }
    
            chai.request(server)
            .get(`${url}${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
    
                if(validation) {
                    validation(res);
                } 
                else {
                    const instance = new model(res.body);
                    
                    should.not.exist(instance.validateSync())
                }
    
                done();
            });
        }
    };
    
    updateExisting(url, model, payload, validation) {
        return done => {
            chai.request(server)
            .put(`${url}${payload._id}`)
            .send(payload)
            .end((end, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                if(validation) {
                    validation(res);
                }
                else {
                    const instance = new model(res.body.result);
                    
                    res.body.message.should.be.equal("Document updated!");

                    should.not.exist(instance.validateSync());
                }

                done();
            });
        };
    };

    createNew (url, model, payload, validation) {
        return done => {
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
    
                    if(validation) {
                        validation(res);
                    }
                    else {
                        const instance = new model(res.body.result);
        
                        should.not.exist(instance.validateSync())
                    }
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
    }

    deleteById(url, model, id, validation) {
        return done => {
            let totalPages = 0;
            let deletedId;
    
            chai.request(server)
            .get(url)
            .end((err, res) => {
                totalPages = res.body.length;
    
                chai.request(server)
                .delete(`${url}${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    
                    if(validation) {
                        validation(res);
                    }
                    else {
                        res.body.message.should.equal('Document successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                    }

                    done();
                });
            });
        };
    }
}

module.exports = Tests;