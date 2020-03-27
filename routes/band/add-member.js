const express = require('express');
const router = express.Router();
const Band = require("../../models/Band");
const User = require("../../models/User");
// protect to check if the user who's logged in, is an/the amdin of the band

router.get("/add-member/:userId/:bandId",(req,res)=> {
    Band
    .findByIdAndUpdate(req.params.bandId, {
        $push: { members: req.params.userId }
    },{'new': true})
    .populate("members")
    .then((band)=>{
        User.findByIdAndUpdate(req.params.userId, {
            $push: { bands: req.params.bandId }
        })
        .populate("bands")
        .then(()=>{
            res.redirect(`/band-profile/${req.params.bandId}`);
        })
    })
    .catch((err)=>{
        console.log("Add member error:", err)
    })
})

module.exports = router;