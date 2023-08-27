const Request = require('../models/requestModel');

module.exports = {
    // create a new request
    createNewRequest: (req, res) => {
        Request.create(req.body)
            .then(createdRequest => res.json(createdRequest))
            .catch(err => res.status(400).json(err));
    },
};
