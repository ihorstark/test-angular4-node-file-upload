const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('user', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(newUser.password, salt, function (error, hash) {
            if (error) {
                throw error;
            } else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    })
};


module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcryptjs.compare(candidatePassword, hash, function (error, isMatched) {
        if (error) throw error;
        callback(null, isMatched);
    })
}