var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema ({
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
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
};

module.exports = mongoose.model('User', userSchema);
