const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/signup', (req, res, next) => {
  const { username, password } = req.body;
    res.render('user/signup');
  });
  
  router.post("/signup",(req, res, next) => {
    res.render('user/signup');
    User.findOne({"username":username})
    .then((user)=>{
      if()
    })
  });


  module.exports = router ;