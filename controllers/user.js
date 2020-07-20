const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const employee_model = require("../models/employee");
const employer_model = require("../models/employer");
const employer = require('../models/employer');

module.exports = {
    signup: function(req, res){
        bcrypt.hash(req.body.password, 10)
            .then(hashed_password => {
                let user;
                if(req.params.role == 'employee'){
                    user = new employee_model({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        user_name: req.body.user_name,
                        password: hashed_password,
                        age: req.body.age,
                        gender: req.body.gender
                    });
                }else{
                    user = new employer_model({
                        company_name: req.body.company_name,
                        password: hashed_password,
                        established_year: req.body.established_year,
                        company_address: req.company_address,
                        company_phone: req.company_phone
                    });
                }
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: "user created",
                            result: result
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    });
            });
    },

    signin: function(req, res){
        let fetched_user;
        if(req.params.role == 'employee'){
            employee_model.findOne({user_name: req.body.user_name})
                .then(user => {
                    if(!user){
                        return res.status(401).json({
                            message: "authentication failed!"
                        });
                    }
                    fetched_user = user;
                    return bcrypt.compare(req.body.password, user.password);
                })
                .then(result => {
                    if(!result){
                        return res.status(401).json({
                            message: "authentication failed!"
                        });
                    }
                    const token = jwt.sign(
                        {user_name: fetched_user.user_name, user_id: fetched_user._id},
                        'job_search_system_secret',
                        { expiresIn: '1h' 
                    });
                    res.status(200).json({
                        token: token,
                        expiresIn: '1h',
                        user_id: fetched_user._id
                    });
                })
                .catch(error => {
                    return res.status(401).json({
                        message: "authentication failed!"
                    });
                });
        }else{
            employer_model.findOne({company_name: req.body.company_name})
                .then(user => {
                    if(!user){
                        return res.status(401).json({
                            message: "authentication failed!"
                        });
                    }
                    fetched_user = user;
                    return bcrypt.compare(req.body.password, user.password);
                })
                .then(result => {
                    if(!result){
                        return res.status(401).json({
                            message: "authentication failed!"
                        });
                    }
                    const token = jwt.sign(
                        {company_name: fetched_user.company_name, user_id: fetched_user._id},
                        'job_search_system_secret',
                        { expiresIn: '1h' 
                    });
                    res.status(200).json({
                        token: token,
                        expiresIn: '1h',
                        user_id: fetched_user._id
                    });
                })
                .catch(error => {
                    return res.status(401).json({
                        message: "authentication failed!"
                    });
                });
        }
    },

    edit_profile: function(req, res){
        employee_model.findOne({_id: req.body.decoded_token.user_id})
            .then(employee => {
                if(!employee){

                    const employer = new employer_model({
                        _id: req.body.decoded_token.user_id,
                        company_name: req.body.company_name,
                        established_year: req.body.established_year,
                        company_address: req.body.company_address,
                        company_phone: req.body.company_phone,
                        job_fields: req.body.job_fields
                    });
                    employer_model.updateOne({_id: req.body.decoded_token.user_id}, employer)
                        .then(result => {
                            if(result.n > 0){
                                res.status(200).json({
                                    message: "edited successfully!"
                                });
                            }else{
                                res.status(401).json({
                                    message: "authorization failed!"
                                });
                            }
                        });

                }
                const url = req.protocol + '://' + req.get("host");
                let cv_path = employee.cv_path;
                if(req.file){
                    cv_path = url + "/CVs/" + req.file.filename;
                }
                const new_employee = new employee_model({
                    _id: req.body.decoded_token.user_id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    cv_path: cv_path,
                    age: req.body.age,
                    skills: req.body.skills
                });
                employee_model.updateOne({_id: employee._id}, new_employee)
                .then(result => {
                    if(result.n > 0){
                        res.status(200).json({
                            message: "edited successfully!"
                        });
                    }else{
                        res.status(401).json({
                            message: "authorization failed!"
                        });
                    }
                });
        });
    }
};

