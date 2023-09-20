const groups = require('../models/groups');
const users = require('../models/userModel');
//const userGroups = require('../models/userGroups');//remove
var mongoose = require('mongoose');
//test all methods incase
/**
* Creates a new group in the database and assigns the creator as 'Caregiver'.
*/
async function createGroup(req,res) {
    try {
        // no nameGroup assigned during creation
        var newGroup = await groups.create({
            nameCaregiver : req.body.user_fullName,
            namePatient : req.body.patientName,
            description : req.body.description
        });

        // add additional group info here 
        var memberId = new mongoose.Types.ObjectId(req.body.user_id);
        var member = await users.findOne(memberId);
        member.groupInfo.push({
            groupId : newGroup._id,
            userRole : "Caregiver",
            nameCaregiver : req.body.user_fullName,
            namePatient : req.body.patientName,
            description : req.body.description
        });
        member.save();

        res.status(201);
    } catch(err) {
        console.error(err);
    }
}

/**
* Adds user as a new 'Support' member of an existing group in the database.
*/
async function joinGroup(req,res) { //add check if already joined group?
    try {
        // add group info here
        var memberId = new mongoose.Types.ObjectId(req.body.user_id);
        var member = await users.findOne(memberId);
        const { nameCaregiver, namePatient, description, nameGroup } = req.body;

        // added additional group data to user groupInfo 
        member.groupInfo.push({
            groupId : req.body.group_id,
            userRole : "Support",
            nameCaregiver: nameCaregiver,
            namePatient: namePatient,
            description: description,
            nameGroup: nameGroup
        });
        member.save();

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
        var refId = new mongoose.Types.ObjectId(req.body.group_id);
        await groups.findOneAndUpdate( {_id: refId}, {
               namePatient: req.body.patientName,
               description: req.body.description
        });
    } catch(err) {
        console.error(err);
    }
}

/**
* Deletes a group and all related groupInfo entries.
*/
async function deleteGroup(req,res) {
    try {
        var refId = new mongoose.Types.ObjectId(req.body.group_id);
        await groups.findOneAndDelete( {_id: refId} );
        await users.updateMany(
            { groupInfo: {$elemMatch: { groupId: req.body.group_id } } },
            { $pull: { groupInfo: { groupId: req.body.group_id } } }
        );

        res.status(204);
    } catch(err) {
        console.error(err);
    }
}

/**
* Checks the role of a user in a group.
*/
async function checkUserGroup(req,res) {
    try {
        var userRole = "Unknown";
        var member = await users.findOne( {groupInfo: {$elemMatch: {groupId: req.query.group_id} } } );
        if(member != null) {
            var i = 0
            while(member.groupInfo[i] !== undefined) { //iterate through groupInfo array
                if(member.groupInfo[i].groupId === req.query.group_id) {
                    userRole = member.groupInfo[i].userRole;
                }
                i++;
            }
        }

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
        const singleGroup = await groups.findOne( {_id: searchFor} );
        res.send(singleGroup);
    } catch(err) {
        console.error(err);
    }
}

module.exports = { createGroup, joinGroup, editGroup, deleteGroup, checkUserGroup, getAllGroup, getIndividualGroup };