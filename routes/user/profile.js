const express = require('express');
const router  = express.Router();
const User = require("../../models/User");
const Band = require("../../models/Band");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

router.get('/profile', (req, res, next) => {
    User
      .findById(req.session.currentUser._id)
      .populate("bands")
      .populate("adminOf")
      .then((user)=>{
        res.render("user/profile",{profLoop:user})
      })
      .catch((error)=>{
        res.render("error",error)
      })
  });

module.exports = router;