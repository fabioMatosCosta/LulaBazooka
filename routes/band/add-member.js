const express = require('express');
const router = express.Router();
const Band = require("../../models/Band");

// protect to check if the user who's logged in, is an/the amdin of the band

router.get("/add-member/:userId/:bandId",(req,res)=> {
    Band
    .findByIdAndUpdate(req.params.bandId, {
        $push: { members: req.params.userId }
    },{'new': true})
    .populate("members")
    .then((band)=>{
        // res.render('band/band-profile', {bandHbs: band});
        res.redirect(`/band-profile/${req.params.bandId}`);
    })
    .catch((err)=>{
        console.log("Add member error:", err)
    })
    // find the band with the id and push the userId in the members property (findbyidandupdate)
})

module.exports = router;