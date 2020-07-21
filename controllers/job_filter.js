const job_model = require("../models/job");
const binary_search_tree = require("./bst");

module.exports = {
    on_salary: function(req, res){

        let bst = new binary_search_tree;

        job_model.find()
            .then(documents => {
                documents.forEach( document => {
                    bst.insert(document, document.salary);
                });
            })
            .then(result => {
                let filtered_jobs = bst.get_nodes_in(req.body.min, req.body.max);
                res.status(200).json({
                    message: "jobs fetched and filtered successfully",
                    jobs: filtered_jobs
                });
            })
            .catch( error => {
                res.status(500).json({
                    message: "fetching jobs failed!"
                });
            });
    }
};