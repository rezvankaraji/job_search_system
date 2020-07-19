const mongoose = require('mongoose');

const employer_schema = mongoose.Schema({
    company_name: { type: String, required: true },
    password: { type: String, required: true },
    established_year: { type: Number },
    company_address: { type: String },
    company_phone: { type: Number },
    job_fields: { type: Array }
});

module.exports = mongoose.model('Employer', employer_schema);