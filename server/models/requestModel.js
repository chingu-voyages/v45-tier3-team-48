const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
    {
        dateTimeNeeded: {
            type: Date,
            required: [true, 'Date and time are required.'],
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
