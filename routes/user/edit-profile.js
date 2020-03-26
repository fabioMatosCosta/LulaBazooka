const express = require('express');
const router = express.Router();
const User = require("../../models/User")
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.get('/edit-profile/', (req, res, next) => {
  User.findById(req.session.currentUser._id)
  .then((user)=>{
    res.render('user/edit-profile',{userHbs: user})
  })
});

router.post('/edit-profile/', (req, res, next) =>{
  function getInstruments(){
    let arr = [];
    for (const key in req.body) {
      if(req.body[key]=== "on") arr.push(key)
    }
      return arr;
    }
    let instrumentsArr = getInstruments();
  User.findByIdAndUpdate(req.session.currentUser._id, {
    instruments: instrumentsArr
  })
  .then((user)=>{
    res.redirect("/profile")
  })
})



module.exports = router;
