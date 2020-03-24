const express = require('express');
const router = express.Router();
const Band = require("../models/Band")
const session  = require("express-session");
const MongoStore = require("connect-mongo")(session);

    router.get('/create-band', (req, res, next) => {
    res.render('band/create-band');
});

router.post("/create-band", (req,res,next) =>{
    const  bandName = req.body.bandName;
    function getGenres(){
    let arr = [];
    for (const key in req.body) {
      if(req.body[key]=== "on") arr.push(key)
    }
      return arr;
    }
    let genresArr = getGenres();
    Band.findOne({
      bandName
    })
    .then((band)=>{
      if(band) res.send("Band Name Already Exists")
      else {
          Band.create({
            bandName: bandName,
            genres: genresArr,
            info: req.body.info,
            admin: req.session.currentUser._id
          })
            res.redirect(`/band-profile/`)
          }
        })
    .catch((err)=>{
      console.log("Error creating band:", err)
    })  
})


module.exports = router;
