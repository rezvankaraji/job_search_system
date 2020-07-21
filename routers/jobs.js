const express = require('express');
const job = require("../controllers/job")
const filter = require("../controllers/job_filter")
//const search = require("../controllers/job_search")

const check_auth = require('../middleware/check_auth')
const add_image = require('../middleware/add_image');

const router = express.Router();

router.post("/add", check_auth, add_image, job.create);

router.patch("/edit", check_auth, job.edit);

router.get("/show/all", job.show);    //general show jobs

router.get("/show/my-jobs", check_auth, job.show_employer);     //show jobs to each employer

//router.post("/search", search.on_title);

router.post("/filter", filter.on_salary);    

module.exports = router;