const express = require('express');
const router  = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


// router.get('/profile', (req, res, next) => {
//     User.findById({})
//     .then((user)=>{
//       res.render("/user/profile",{profLoop:user})
//     })
//     .catch((error)=>{
//       res.render("error",error)
//     })
//   });
  
router.get('/profile', (req, res, next) => {
    User.findById(req.session.currentUser._id)
    // console.log(req.session.currentUser._id)
    .then((user)=>{
      res.render("user/profile",{profLoop:user})
    })
    .catch((error)=>{
      res.render("error",error)
    })
  });
  
module.exports = router;