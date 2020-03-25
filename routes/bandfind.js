const express = require('express');
const router = express.Router();
const Band = require("../models/Band")

router.get("/find-band",(req,res)=>{
Band.find({})
    .then((band)=>{
        res.render("band/bandfind", {bandHbs: band})
    })
})


module.exports = router;