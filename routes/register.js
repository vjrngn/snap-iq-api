const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmation = req.body.confirmation;

  if (password.trim() === "") {
    return res.json({ message: "Password field cannot be empty" });
  }

  if (password !== confirmation) {
    return res.json({ message: "Password does not match confirmation" });
  } else {
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
  }
});

module.exports = router;
