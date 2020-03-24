const express = require('express');
const router = express.Router();
const Band = require("../models/Band");


router.get('/band-profile/', (req, res) => {
  Band
  .findById()
  .then((band)=>{
    res.render('band/band-profile', {bandHbs: band});
  })
});

module.exports = router;