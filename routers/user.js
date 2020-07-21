const express = require('express');
const user = require("../controllers/user");

const check_auth = require('../middleware/check_auth');
const add_cv = require('../middleware/add_pdf');

const router = express.Router();

router.post("/signup/:role", user.signup);

router.post("/signin/:role", user.signin);

router.patch("/edit-profile", add_cv, check_auth, user.edit_profile);

module.exports = router;