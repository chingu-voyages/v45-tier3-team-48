const groups = require('../models/groups');
const userGroups = require('../models/userGroups');
var mongoose = require('mongoose');

/**
* Creates a new group in the database and assigns the creator as 'Caregiver'.
*/
async function createGroup(req,res) {
    try {
        var newGroup = await groups.create({
            nameCaregiver : req.body.groupData.user_fullName,
            namePatient : req.body.patientName,
            description : req.body.description
        });

        var newMember = await userGroups.create({
            user_id : req.body.groupData.user_id,
            group_id : newGroup._id,
            role : "Caregiver"
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
        var memberId = new mongoose.Types.ObjectId(req.body.group_id);
        var newMember = await userGroups.create({
            user_id : req.body.user_id,
            group_id : memberId,
            role : "Support"
        });

        res.status(201);
    } catch(err) {
        console.error(err);
    }
}

/**
* Updates a group's information with new info from the user.
*/
async function editGroup(req,res) {
    try {
        var memberId = new mongoose.Types.ObjectId(req.body.groupId);
        await groups.findOneAndUpdate( {_id: memberId}, {
               nameGroup: req.body.groupName,
               namePatient: req.body.patientName,
               description: req.body.description
        });
    } catch(err) {
        console.error(err);
    }
}

/**
* Deletes a group and all related userGroup entries.
*/
async function deleteGroup(req,res) {
    try {
        var memberId = new mongoose.Types.ObjectId(req.query.groupId);
        await groups.deleteOne( {_id: memberId} );
        await userGroups.deleteMany( {group_id: memberId} );
        res.status(204);
    } catch(err) {
        console.error(err);
    }
}

/**
* Checks the role of a user in a group.
*/
async function checkUserGroup(req,res) { //change method after database change
    try {
        var searchFor = new mongoose.Types.ObjectId(req.query.group_id);
        const userRole = await userGroups.findOne( {user_id: req.query.user_id, group_id: searchFor} );
        res.send(userRole);
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
        const allGroup = await groups.findOne( {_id: searchFor} );
        res.send(allGroup);
    } catch(err) {
        console.error(err);
    }
}

module.exports = { createGroup, joinGroup, editGroup, deleteGroup, checkUserGroup, getAllGroup, getIndividualGroup };