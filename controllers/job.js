const job_model = require("../models/job");

module.exports = {
    create: function(req, res){
        const Job = new job_model({
            employer_id: req.body.employer_id,
            title: req.body.title,
            picture: req.body.picture,
            expiration_date: req.body.expiration_date,
            job_fields: req.body.job_fields,
            work_hour: req.body.work_hour
        });
        Job.save();
        res.status().json({
            message: "job successfully added"
        });
    }
}



