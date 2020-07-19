const mongoose = require('mongoose');

const request_schema = mongoose.Schema({
    employee_id: {type: String, required: true },
    job_id: {type: String, required: true }
});

module.exports = mongoose.model('Request', request_schema);