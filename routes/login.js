const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/login', (req, res, next) => {
    res.render('user/login');
  });
  
  router.post("/login",(req, res, next) => {
    const {username, password} = req.body;
    User.findOne({
      username
    })
    .then((user)=>{
      if(!user) res.send("Invalid Credentials")
      else {
        bcrypt.compare(password,user.password, function(err,correctPassword){
          if(err) next("hash compare error");
          else if(!correctPassword) res.send("invalid credentials")
          else {
            req.session.currentUser = user;
            res.redirect("profile")
          }
        })
      }
    })
    .catch((err)=> {
      res.send("Error, not logged in.")
  })
});


  module.exports = router;