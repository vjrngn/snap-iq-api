const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post("/login", function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.json({ error: err });
    }

    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({
        message: "Invalid credentials"
      });
    }
    const claim = { id: user.id, email: user.email };
    const token = jwt.sign({ user: claim }, process.env.JWT_SECRET);
    return res.json({ token });
  });
});

module.exports = router;
