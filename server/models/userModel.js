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
    groupInfo: {
        groupId: {
            type: String,
        },
        userRole: {
            type: String
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);