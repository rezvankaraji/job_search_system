const job_model = require("../models/job");
const employer_model = require("../models/employer");

module.exports = {
    create: function(req, res){
        employer_model.findOne({_id: req.body.decoded_token.user_id})
            .then(employer => {
                if(!employer){
                    return res.status(401).json({
                        message: "authorization failed!"
                    });
                }
                const url = req.protocol + '://' + req.get("host");
                let image_path = url + "/images/default.jpg";
                if(req.file){
                    image_path = url + "/images/" + req.file.filename;
                }
                const job = new job_model({
                    employer_id: employer._id,
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
        
            }); 
    },

    edit: function(req, res){
        employer_model.findOne({_id: req.body.decoded_token.user_id})
            .then(employer => {
                if(!employer){
                    return res.status(401).json({
                        message: "authorization failed!"
                    });
                }
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
                job_model.updateOne({_id: req.body._id, employer_id: req.body.decoded_token.user_id}, job)
                    .then( result => {
                        if(result.n > 0){
                            res.status(200).json({
                                message: "edited successfully"
                            });
                        }else{
                            res.status(401).json({
                                message: "authorization failed!"
                            });
                        }
                    });
            });
    },

    show: function(req, res){
        job_model.find()
        .then(documents => {
            res.status(200).json({
                message: "jobs fetched successfully",
                jobs: documents
            });
        })
        .limit(req.query.page_size)
        .skip(req.query.page_size * (req.query.current_page - 1));
    },

    // show_employee: function(req, res){
    //     job_model.find()
    //     .then(documents => {
    //         res.status(200).json({
    //             message: "jobs fetched successfully",
    //             jobs: documents
    //         });
    //     })
    //     .limit(req.query.page_size)
    //     .skip(req.query.page_size * (req.query.current_page - 1));
    // },

    show_employer: function(req, res){
        employer_model.findOne({_id: req.body.decoded_token.user_id})
            .then(employer => {
                if(!employer){
                    return res.status(401).json({
                        message: "authorization failed!"
                    });
                }
                job_model.find({employer_id: req.body.decoded_token.user_id})
                    .then(documents => {
                        res.status(200).json({
                            message: "jobs fetched successfully",
                            jobs: documents
                        });
                    })
                    .limit(req.query.page_size)
                    .skip(req.query.page_size * (req.query.current_page - 1));
            });
    }
};