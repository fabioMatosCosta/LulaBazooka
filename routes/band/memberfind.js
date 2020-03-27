const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const Band = require("../../models/Band");

router.get("/find-member/:bandId",(req,res)=>{
    User
        .find({"bands": {$nin: [mongoose.Types.ObjectId(`${req.params.bandId}`)]}})
        .then((user)=>{
            res.render("band/memberfind", {userHbs: user, bandId: req.params.bandId})
        })
        .catch((err)=>{
            res.render("error", err)
        })
})


module.exports = router;