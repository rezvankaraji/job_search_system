const mongoose = require('mongoose');

const request_schema = mongoose.Schema({
    employee_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    job_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }
});

module.exports = mongoose.model('Request', request_schema);