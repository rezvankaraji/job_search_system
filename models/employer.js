const mongoose = require('mongoose');
const unique_validator = require('mongoose-unique-validator');

const employer_schema = mongoose.Schema({
    company_name: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    established_year: { type: Number },
    company_address: { type: String },
    company_phone: { type: Number },
    job_fields: { type: Array }
});

employer_schema.plugin(unique_validator);


module.exports = mongoose.model('Employer', employer_schema);