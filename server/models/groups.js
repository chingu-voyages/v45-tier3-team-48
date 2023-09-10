const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    nameCaregiver : String,
    namePatient : String,
    description : String
});

module.exports = mongoose.model('group', groupSchema);