const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/login', (req, res, next) => {
    res.render('user/login');
  });
  
  router.post("/login",(req, res, next) => {
    res.render('user/login');
  });


  module.exports = router;