const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //this will be an assigment
    token: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('user', UserSchema);