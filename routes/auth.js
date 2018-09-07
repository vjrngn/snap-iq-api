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

router.post("/register", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmation = req.body.confirmation;
  if (password && password.trim() === "") {
    return res.json({ message: "Password field cannot be empty" });
  }

  if (password && confirmation && password !== confirmation) {
    return res.json({ message: "Password does not match confirmation" });
  } else if(password){
    User.create(
      {
        email: email,
        password: bcrypt.hashSync(password, 10)
      },
      function(error, user) {
        if (error) {
          res.json({
            message: "Error. Please check your username or password"
          });
        }
        res.json({ success : true });
      }
    );
  }else {
    res.json({ message : "Something went wrong. Please try again"})
  }
});

module.exports = router;
