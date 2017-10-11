const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema ({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    surname: String,
    created: {type:Date, default: Date.now(), required: true},
    isCreator: Boolean,
    lastActivity: Date,
    isAdmin: {type: Boolean, default: false}
});

userSchema.methods = {
    validPassword: password => {
        return bcrypt.compareSync(password, this.password);
    }
};

module.exports = mongoose.model('User', userSchema);