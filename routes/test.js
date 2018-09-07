var express = require("express");
var router = express.Router();
const Solution = require('../models/Solution');
const Test = require('../models/Test');
const User = require('../models/User');

router.post("/:id", function (req, res, next) {
    Test.findById(req.params.id, (err, test) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            Solution.create({ test: test, user: user, points: req.body.points}, (err, solution) => {
                res.json({ message : 'Submitted Successfully'});
            });
        })
    });
});

module.exports = router;