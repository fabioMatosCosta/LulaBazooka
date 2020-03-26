const express = require('express');
const router  = express.Router();
const User = require("../../models/User")
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.get('/profile', (req, res, next) => {
    User
      .findById(req.session.currentUser._id)
      // .populate("bands")
      .then((user)=>{
        res.render("user/profile",{profLoop:user})
      })
      .catch((error)=>{
        res.render("error",error)
      })
  });

module.exports = router;