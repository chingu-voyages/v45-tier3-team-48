const Request = require('../models/requestModel');

module.exports = {
    // create a new request
    createNewRequest: (req, res) => {
        Request.create(req.body)
            .then(createdRequest => res.json(createdRequest))
            .catch(err => res.status(400).json(err));
    },
    // find all requests associated with a group
    findAllRequestsForOneGroup: (req, res) => {
        Request.find({ groupId: req.params.groupId })
            .sort({ dateTimeUTC: 'asc' })
            .then(allRequests => res.json(allRequests))
            .catch(err => res.status(400).json(err));
    },
    // find one request
    findOneRequest: (req, res) => {
        Request.findById(req.params.requestId)
        .then(oneRequest => res.json(oneRequest))
        .catch(err => res.status(400).json(err));
    },
    // sign up for a request as a support person
    signUpForRequest: (req, res) => {
        
    },
    // allow caregiver to edit a request
    updateOneRequest: (req, res) => {
        Request.findByIdAndUpdate(req.params.requestId, req.body, {
            new: true,
            runValidators: true
        })
            .then(updatedRequest => res.json(updatedRequest))
            .catch(err => res.status(400).json(err));
    },
    // allow a caregiver to delete a request
    deleteOneRequest: (req, res) => {
        Request.findByIdAndDelete(req.params.requestId)
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.status(400).json(err));
    }
};
