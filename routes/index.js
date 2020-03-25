const express = require('express');
const router  = express.Router();
const Band = require("../models/Band")

router.get('/', (req, res, next) => {
  Band.find()
  .populate("admin")
  .then((band)=>{
    res.render('index');
  })
  .catch((error) =>{
    console.log(error)
  })
});



module.exports = router;
