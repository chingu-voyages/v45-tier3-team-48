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
    
    // sign up for a request as a support person
    signUpForRequest: (req, res) => {
        
    }
};
