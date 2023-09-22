const groups = require('../models/groups');
const users = require('../models/userModel');
var mongoose = require('mongoose');

/**
* Creates a new group in the database and assigns the creator as 'Caregiver'.
*/
async function createGroup(req,res) {
    try {
        let newGroup = await groups.create({
            nameCaregiver : req.body.user_fullName,
            namePatient : req.body.patientName,
            description : req.body.description
        });

        let memberId = new mongoose.Types.ObjectId(req.body.user_id);
        let member = await users.findOne(memberId);
        member.groupInfo.push({
            groupId : newGroup._id,
            userRole : "Caregiver",
            nameCaregiver : req.body.user_fullName,
            namePatient : req.body.patientName,
            description : req.body.description
        });
        member.save();

        res.status(201).send(newGroup._id);
    } catch(err) {
        console.error(err);
    }
}

/**
* Adds user as a new 'Support' member of an existing group in the database.
*/
async function joinGroup(req,res) { //add check if already joined group?
    try {
        const { nameCaregiver, namePatient, description, nameGroup } = req.body;
        let memberId = new mongoose.Types.ObjectId(req.body.user_id);
        let member = await users.findOne(memberId);
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
        let refId = new mongoose.Types.ObjectId(req.body.group_id);
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
        let refId = new mongoose.Types.ObjectId(req.body.group_id);
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
        let userRole = "Unknown";
        memberId = new mongoose.Types.ObjectId(req.query.user_id);
        let member = await users.findOne( {_id: memberId, groupInfo: {$elemMatch: {groupId: req.query.group_id} } } );
        if(member != null) {
            let i = 0
            while(member.groupInfo[i] !== undefined && userRole === "Unknown") { //iterate through groupInfo array
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
        let searchFor = new mongoose.Types.ObjectId(req.query.group_id);
        const singleGroup = await groups.findOne( {_id: searchFor} );
        res.send(singleGroup);
    } catch(err) {
        console.error(err);
    }
}

module.exports = { createGroup, joinGroup, editGroup, deleteGroup, checkUserGroup, getAllGroup, getIndividualGroup };