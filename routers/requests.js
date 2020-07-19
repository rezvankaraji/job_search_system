const express = require('express');
const router = express.Router();
const request = require("./controllers/request")

router.post("/add", request.create);

module.exports = router;
