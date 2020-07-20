const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const employee_model = require("../models/employee");
const employer_model = require("../models/employer");

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
                }else if(req.params.role == 'employer'){
                    user = new employer_model({
                        company_name: req.body.company_name,
                        password: hashed_password,
                        established_year: req.body.established_year,
                        company_address: req.company_address,
                        company_phone: req.company_phone
                    });
                }else{
                    //unvalid user
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
                        { expiresIn: '1h' });
                    
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

        }else if(req.params.role == 'employer'){
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
                        { expiresIn: '1h' });
                    
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
            //unvalid user
        }

        
    }
};

