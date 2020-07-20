const express = require('express');
const request = require("../controllers/request");

const check_auth = require('../middleware/check_auth')

const router = express.Router();

router.post("/add", check_auth, request.create);

module.exports = router;
