const groups = require('../models/groups');
const userGroups = require('../models/userGroups');

/**
* Creates a new group in the database and assigns the creator as 'Caretaker'.
*/
async function createGroup(req,res) {
    try {
        var newGroup = await groups.create({
            nameGroup : req.body.groupName,
            nameCaregiver : req.user.username,
            namePatient : req.body.patientName,
            description : req.body.description
        });

        var newMember = await userGroups.create({
            user_id : req.user._id,
            group_id : newGroup._id,
            role : "Caretaker"
        });

        res.status(201);
    } catch(err) {
        console.error(err);
    }
}

async function getIndividualGroup(req,res) {
    res.send('Hello Individual Group ')
}

module.exports = { createGroup, getIndividualGroup };