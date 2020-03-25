const express = require('express');
const router = express.Router();
const Band = require("../models/Band")

router.get("/find-band",(req,res)=>{
    Band.find()
        .populate("admin")
        .then((band)=>{
            res.render("band/bandfind", {bandHbs: band})
    })
    .catch((err)=>{
        console.log("Error", err);
    })
})


module.exports = router;