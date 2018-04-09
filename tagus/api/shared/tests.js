const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const User = require('../users/model');
const jwt = require('jwt-simple');


chai.use(chaiHttp);

const mockUser = {
    username: "Tester",
    email: "admin@tagus.com",
    password: "tester1234",
    name: "Tagus",
    surname: "Tester",
    created: new Date(),
    isAdmin: true
}

class Tests {
    constructor() {
        this._token = null;
        this._userId = null;
        this._createdItem = false;
    }

    _createMockUser(done) {
        return new Promise((resolve, reject) => {
            const user = new User(mockUser);
            user.save()
            .then(result => {
                this._userId = result._id;
                this._token = jwt.encode({id: result._id}, process.env.AUTHSECRETORKEY);
                if (done) {
                    done();
                }
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        });
    };
    
    _deleteMockUser(done) {
        return new Promise((resolve, reject) => {
            User.remove({_id: this._userId}, (err, result)  => {
                this._token = null;
                this._userId = null;
                
                if (done) {
                    done();
                }
                resolve();
            })
            .catch(err => {
                if(done) {
                    done(err);
                }
                reject(err);
            });
        })
    };

    _deleteMockIfStillExists (Model, mock) {
        return Model.remove({_id: mock._id});
    }

    CRUD (url, Model, mocks = {}, validation =  {}) {
        const that = this;
        return function() {
            before('Create test user and new item', function(done){
                that._createMockUser()
                .then(function () {
                    if (mocks.new) {
                        return that._deleteMockIfStillExists(Model, mocks.new);
                    }
                })
                .then(function() {
                    done();
                })
                .catch(function(err) {
                    done(err);
                })
            });
            
            after('Delete item and test user', function(done) {
                that._deleteMockUser()
                .then(function () {
                    if (mocks.new) {
                        return that._deleteMockIfStillExists(Model, mocks.new);
                    }
                })
                .then(function() {
                    done();
                })
                .catch(function(err) {
                    done(err);
                })
            });

            it("Create new Item", that.createNew(url, Model, mocks.new));

            it("List all items",that.getAll(url, Model));

            it("List one item", that.getById(url, Model, mocks.new._id));

            it('Delete Created Item', that.deleteById(url, Model, mocks.new._id));
        };
    };

    _createNew (url, Model, payload, validation) {
        const that = this;
        return new Promise(function(resolve, reject) {
            chai.request(server)
            .post(url)
            .set('Authorization', `Bearer ${that._token}`)
            .send(payload)
            .then(function(res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.success.should.to.equal(true);
                    
                if(validation) {
                    validation(res);
                }
                else {
                    const instance = new Model(res.body.result);
                    
                    should.not.exist(instance.validateSync())
                }

                that._createdItem = true;
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }

    createNew (url, Model, payload, validation) {
        const that = this;
        
        return function(done) {
            that._createNew(url, Model, payload, validation)
            .then(function() {
                done();
            })
            .catch(that._failTest(done));
        };
    }

    _getAll (url, Model, validation) {
        const that = this;
        
        return new Promise(function(resolve, reject) {
            chai.request(server)
            .get(url)   
            .set('Authorization', `Bearer ${that._token}`)         
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.success.should.to.equal(true);
                res.body.list.should.be.a('array');

                if(validation) {
                    validation(res);
                } 
                else {
                    res.body.list.forEach(doc => {
                        const instance = new Model(doc);
                        should.not.exist(instance.validateSync())
                    });
                }
    
               resolve();
            })
            .catch(function(err){
                reject(err);
            });
        });
    }

    getAll (url, Model, validation) {
       const that = this;

        return function (done) {
            that._getAll(url, Model, validation)
            .then (function() {
                done();
            })
            .catch(that._failTest(done))
       };
    };
    
    _getFirstFromCollection (url, Model, validation) {
        const that = this;

        return new Promise(function (resolve, reject) {
            chai.request(server)
            .get(url)
            .set('Authorization', `Bearer ${that._token}`)
            .then((err, res) => {
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
        });
    }
    
    _getById (url, Model, id, validation) {
        const that = this;

        return new Promise(function (resolve, reject) {
            if(!id) {
                reject(Error("You must pass a valid id"));
            }

            chai.request(server)
            .get(`${url}${id}`)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.success.should.to.equal(true);
    
                if(validation) {
                    validation(res);
                } 
                else {
                    const instance = new Model(res.body.item);
                    
                    should.not.exist(instance.validateSync())
                }
    
                resolve();
            })
            .catch(function (err) {
                reject(err);
            });
        });
    }

    getById (url, Model, id, validation) {
        const that = this;
        
        return function (done) {
            that._getById(url, Model, id, validation)
            .then(function () {
                done();
            })
            .catch(that._failTest(done));
        };
    };
    
    _update (url, Model, payload, validation) {
        return new Promise(function (resolve, reject) {
            chai.request(server)
            .put(`${url}${payload.mock._id}`)
            .send(payload.mock)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.success.should.to.equal(true);

                if(validation) {
                    validation(res);
                }
                else {
                    const instance = new model(res.body.result);
                    
                    instance[payload.test].should.equalt.to(payload.mock[payload.test]);
                    
                    should.not.exist(instance.validateSync());
                }

                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    };

    update (url, Model, payload, validation) {
        const that = this;

        return function (done) {
            that._update(url, Model, payload, validation)
            .then(function () {
                done();
            })
            .catch(that._failTest(done));
        };
    };

    updateExisting(url, model, payload, validation) {
        return done => {
            chai.request(server)
            .put(`${url}${payload._id}`)
            .send(payload)
            .set('Authorization', `Bearer ${that._token}`)
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



    _deleteById (url, Model, id, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            let deletedId;
        
            chai.request(server)
            .delete(`${url}${id}`)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.success.should.to.equal(true);

                if(validation) {
                    validation(res);
                }
        
                that._createdItem = false;
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }

    deleteById(url, Model, id, validation) {
        const that = this;

        return function(done) {
            that._deleteById(url, Model, id, validation)
            .then(function(){
                done();
            })
            .catch(that._failTest(done));
        };
    }

    _failTest(done) {
        return function (err) {
            done(err);
        }
    }
}

module.exports = Tests;