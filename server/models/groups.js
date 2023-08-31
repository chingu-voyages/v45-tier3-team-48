const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    nameGroup : String,
    nameCaregiver : String,
    namePatient : String,
    description : String
});

module.exports = mongoose.model('group', groupSchema);