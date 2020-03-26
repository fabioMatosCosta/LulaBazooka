const express = require('express');
const router = express.Router();
const Band = require("../../models/Band");

// protect to check if the user who's logged in, is an/the amdin of the band

router.get("/add-member/:userId/:bandId",(req,res)=> {
    Band
    .findByIdAndUpdate(req.params.bandId, {
        $push: { members: req.params.userId }
    })
    .populate("members")
    .then((band)=>{
        res.render('band/band-profile', {bandHbs: band});
    })

    // find the band with the id and push the userId in the members property (findbyidandupdate)
})

module.exports = router;