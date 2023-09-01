const groups = require('../models/groups');
const userGroups = require('../models/userGroups');
var mongoose = require('mongoose');//test

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

/**
* Adds user as a new 'Support' member of an existing group in the database.
*/
async function joinGroup(req,res) {
    try {
        var memberId = new mongoose.Types.ObjectId(req.user.group_id);
        var newMember = await userGroups.create({
            user_id : req.user._id,
            group_id : memberId,
            role : "Support"
        });

        res.status(201);
    } catch(err) {
        console.error(err);
    }
}

async function getAllGroup(req,res) {
    try {
        const allGroup = await groups.find();
        res.send(allGroup);
    } catch(err) {
        console.error(err);
    }
}

async function getIndividualGroup(req,res) {
    try {
        var searchFor = new mongoose.Types.ObjectId(req.query.group_id);
        const allGroup = await groups.find( {_id: searchFor} );
        res.send(allGroup);
    } catch(err) {
        console.error(err);
    }
}

module.exports = { createGroup, joinGroup, getAllGroup, getIndividualGroup };