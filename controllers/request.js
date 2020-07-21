const request_model = require("../models/request");
const employee_model = require("../models/employee");


module.exports = {
    create: function(req, res){
        
        employee_model.findOne({_id: req.body.decoded_token.user_id})
            .then(employee => {
                if(!employee){
                    return res.status(401).json({
                        message: "authorization failed!"
                    });
                }
                const request = new request_model({
                    employee_id: employee._id,
                    job_id: req.body.job_id
                });
                request.save()
                .then( created_request => {
                    res.status(201).json({
                        message: "request successfully added",
                        request: {
                            ...created_request,
                            id: created_request._id
                        }
                    });
                }); 
            })
            .catch( error => {
                res.status(500).json({
                    message: "creating the request failed!"
                });
            });
    }
};
