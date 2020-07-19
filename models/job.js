const mongoose = require('mongoose');

const job_schema = mongoose.Schema({
    employer_id: {type: String, required: true },
    title: { type: String, required: true },
    image_path: { type: String },
    expiration_date: { type: Date },
    job_fields: { type: Array },
    work_hour: { type: Number },
    salary: { type: Number }
});

module.exports = mongoose.model('Job', job_schema);