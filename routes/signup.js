const express = require('express');
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ "username": username })
    .then((user) => {
      if (user !== null) {
        next("The username already exists!");
      }
      else {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) next("Hashing error", err)
          else {
            User.create({
              username: username,
              password: hash
            })
              .then((user) => {
                res.redirect("/login")
              })
              .catch((error) => {
                res.send("Error user not created", error)
              })
          }
        })
      }
    })
});


module.exports = router;