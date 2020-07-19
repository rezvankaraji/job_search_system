const request_model = require("../models/request");

module.exports = {
    create: function(req, res){
        const request = new request_model({
            employer_id: req.body.employer_id,
            job_id: req.body.job_id
        });
        request.save().then( created_request => {
            res.status(201).json({
                message: "request successfully added",
                request: {
                    ...created_request,
                    id: created_request._id
                }
            });
        }); 
    }
};
