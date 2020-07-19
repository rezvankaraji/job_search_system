const mongoose = require('mongoose');

const employee_schema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String} ,
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, default: 'other' },
    cv: { },
    skills: { type: Array }
});

module.exports = mongoose.model('Employee', employee_schema);