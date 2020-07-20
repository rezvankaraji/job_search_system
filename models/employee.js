const mongoose = require('mongoose');
const unique_validator = require('mongoose-unique-validator');

const employee_schema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String} ,
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, default: 'other' },
    cv_path: { type: String },
    skills: { type: Array }
});

employee_schema.plugin(unique_validator);

module.exports = mongoose.model('Employee', employee_schema);