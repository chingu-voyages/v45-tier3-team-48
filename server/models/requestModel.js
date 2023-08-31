const mongoose = require('mongoose');
const { isAfter } = require('validator');

const RequestSchema = new mongoose.Schema(
    {
        groupId: {
            type: String,
        },
        dateTimeNeeded: {
            type: String,
            required: [true, 'Date and time are required.'],
            validate: [
                isAfter,
                'Requests must be assigned a date and time in the future.',
            ],
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
            maxlength: [
                100,
                'Description must not be longer than 100 characters.',
            ],
        },
        category: {
            type: String,
            required: [true, 'Please select a category for this request'],
        },
        createdBy: {
            type: String,
        },
        assignedTo: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Request', RequestSchema);
