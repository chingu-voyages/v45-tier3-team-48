const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    fullName: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //this will be an assigment
    token: {
        type: String,
    },
    groupInfo: [{
        _id: {
            type: String,
        },
        userRole: {
            type: String
        },
        nameCaregiver: {
            type: String
        },
        namePatient: {
            type: String
        },
        description: {
            type: String
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);