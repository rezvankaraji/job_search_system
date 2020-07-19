const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbPath = "mongodb+srv://rezvan:TFjzLXEIccQvr2TA@jss.wnv76.mongodb.net/<dbname>?retryWrites=true&w=majority";

const app = express();

mongoose.connect(dbPath)
    .then(() => {
        console.log('connected to database!')
    })
    .catch(() => {
        console.log('failed to connect to database!')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content_Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    next();
})

// Routes


// Start Listening To The Server
app.listen(process.env.PORT || 8084);

module.exports = app
