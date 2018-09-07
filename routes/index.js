var express = require("express");
var router = express.Router();
const Test = require('../models/Test');
const Quiz = require('../models/Quiz');

/* GET home page. */
router.get("/", function(req, res, next) {
  Test.find().populate('questionList').exec((err,tests) => {
    res.json({ tests : tests});
  })
});

module.exports = router;
