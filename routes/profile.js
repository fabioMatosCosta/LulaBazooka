const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/profile', (req, res, next) => {
    res.render('user/profile');
  });
  
  module.exports = router;