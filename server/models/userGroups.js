const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
    user_id :  { type: mongoose.Schema.Types.ObjectId },
    group_id : { type: mongoose.Schema.Types.ObjectId },
    role : String
});

module.exports = mongoose.model('userGroup', userGroupSchema);