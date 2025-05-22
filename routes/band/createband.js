const express = require('express');
const router = express.Router();
const Band = require("../../models/Band");
const User = require("../../models/User");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const mongoose = require("mongoose");

router.get('/create-band', (req, res, next) => {
    res.render('band/create-band');
});

router.post("/create-band", (req,res,next) =>{
  let bandName = req.body.bandName;
  function getGenres(){
    let arr = [];
    for (const key in req.body) {
      if(req.body[key]=== "on") arr.push(key)
    }
    return arr;
  }
  let genresArr = getGenres();
  Band
  .findOne({
    bandName
  })
  .then((band)=>{
    if(band) next("Band Name Already Exists")
    else {
        Band.create({
          bandName: bandName,
          genres: genresArr,
          info: req.body.info,
          admin: req.session.currentUser._id,
          members : [mongoose.Types.ObjectId(req.session.currentUser._id)]
        })
        .then((band)=> {
          return User
            .findByIdAndUpdate(band.admin, {
              $push: { bands: mongoose.Types.ObjectId(band._id) },
              $push: { adminOf: mongoose.Types.ObjectId(band._id) }
            })
          .then((user)=> {
            res.redirect(`/band-profile/${band._id}`);
          })
        })
      }  
    })
  .catch((err)=>{
    console.log("Error creating band:", err) 
  })  
})

module.exports = router;