const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


// user schema

var UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim: true,
        minlength: 3,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    },
    tokens: [{

        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {

    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123456').toString();

    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
}

// before save hash password
UserSchema.pre('save', function (next) {

    var user = this;
    console.log(user.password,"----------");
    if (user.isModified('password')) {
        console.log('dddd00');
        bcrypt.genSalt(10, (err, salt) => {
            console.log(err,'sss');
            bcrypt.hash(user.password, salt, (err, hashed) => {
                user.password = hashed;
                next();
            });
        });
      
    } else {
        next();
    }
});

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123456');
    } catch (e) {
        return Promise.reject({ message: "Invalid token" })
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });


};


var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};