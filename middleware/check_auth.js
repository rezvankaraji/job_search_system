const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded_token = jwt.verify(token, 'job_search_system_secret');
        req.body.decoded_token = decoded_token;
        next();
    } catch(error){
        res.status(401).json({
            message: "authentication failed!"
        })
    }

};