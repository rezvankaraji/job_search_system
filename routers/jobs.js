const express = require('express');
const multer = require('multer');
const job = require("../controllers/job")
const filter = require("../controllers/job_filter")
const search = require("../controllers/job_search")

const check_auth = require('../middleware/check_auth')

const router = express.Router();

//process image
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const is_valid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid mime type");
        if(is_valid){
            error = null;
        }
        callback(error, "images");
    },
    
    filename: (req, file, callback) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('_')
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '_' + Date.now() + "." + extension);
    }
});

router.post("/add", check_auth, multer({storage: storage}).single("image"), job.create);

router.patch("/edit", check_auth, job.edit);

router.post("/show/all", job.show);    //general show jobs

router.post("/show/my-jobs", check_auth, job.show_employer);     //show jobs to each employer

router.post("/search", search.on_title);    //no idea!

router.post("/filter", filter.on_salary);    

module.exports = router;