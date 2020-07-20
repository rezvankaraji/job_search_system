const express = require('express');
const multer = require('multer'); 
const user = require("../controllers/user");

const check_auth = require('../middleware/check_auth');

const router = express.Router();

const MIME_TYPE_MAP = {
    'pdf/pdf': 'pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const is_valid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid mime type");
        if(is_valid){
            error = null;
        }
        callback(error, "pdf");
    },
    
    filename: (req, file, callback) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('_')
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '_' + Date.now() + "." + extension);
    }
});


router.post("/signup", user.signup);

router.post("/signin/:role", user.signin);

router.post("/edit-profile", multer({storage: storage}).single("pdf"), check_auth, user.edit_profile);

module.exports = router;