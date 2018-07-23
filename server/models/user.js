const mongoose = require('mongoose');
// user schema

var User = mongoose.model('User', {
    
        email: {
            required: true,
            type: String,
            trim: true,
            minlength: 3
        }
    });

    module.exports = {
        User
    };