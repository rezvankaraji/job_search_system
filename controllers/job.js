const job_model = require("../models/job");

module.exports = {
    create: function(req, res){
        const url = req.protocol + '://' + req.get("host");
        let image_path = url + "/images/default.jpg";
        if(req.file){
        image_path = url + "/images/" + req.file.filename;
        }

        const job = new job_model({
            employer_id: req.body.employer_id,
            title: req.body.title,
            image_path: image_path,
            expiration_date: req.body.expiration_date,
            job_fields: req.body.job_fields,
            work_hour: req.body.work_hour
        });
        job.save().then( created_job => {
            res.status(201).json({
                message: "job successfully added",
                job: {
                    ...created_job,
                    id: created_job._id
                }
            });
        }); 
    },

    show: function(req, res){

    },

    edit: function(req, res){
        const url = req.protocol + '://' + req.get("host");
        let image_path = url + "/images/default.jpg";
        if(req.file){
        image_path = url + "/images/" + req.file.filename;
        }

        const job = new job_model({
            _id: req.body.id,
            employer_id: req.body.employer_id,
            title: req.body.title,
            image_path: image_path,
            expiration_date: req.body.expiration_date,
            job_fields: req.body.job_fields,
            work_hour: req.body.work_hour
        });

        job_model.updateOne({_id: req.body._id}, job).then( result => {
            res.status(200).json({message: "edited successfully"});
        });
    },

    search: function(req, res){

    }
};