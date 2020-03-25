const express = require('express');
const router = express.Router();
const User = require("../models/User")
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.get('/edit-profile', (req, res, next) => {
  User.findById(req.session.currentUser)
  .then((user)=>{
    res.render('user/edit-profile',{userHbs: user})
  })
});

router.post('/edit-profile', (req, res, next) =>{
  const { username, password , email ,firstName,lastName } = req.body;
  function getInstruments(){
    let arr = [];
    for (const key in req.body) {
      if(req.body[key]=== "on") arr.push(key)
    }
      return arr;
    }
    let instrumentsArr = getInstruments();
  User.findByIdAndUpdate(req.session.currentUser, {
    instruments:instrumentsArr
  })
})



module.exports = router;
