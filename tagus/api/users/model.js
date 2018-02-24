const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema ({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    name: String,
    surname: String,
    created: {type:Date, default: Date.now(), required: true},
    isCreator: Boolean,
    isAdmin: {type: Boolean, default: false},
    lastActivity: Date,
    logs: {type: Array, default: []}
});

userSchema.methods = {
    validPassword: password => {
        return bcrypt.compareSync(password, this.password);
    }
};

userSchema.pre('save', next => {
    console.log("PRE SAVE!");
    next();
});

module.exports = mongoose.model('User', userSchema);
