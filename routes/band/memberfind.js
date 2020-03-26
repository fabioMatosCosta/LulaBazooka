const express = require('express');
const router = express.Router();
const User = require("../../models/User")

router.get("/find-member/:bandId",(req,res)=>{
User.find()
    .then((user)=>{
        res.render("band/memberfind", {userHbs: user, bandId: req.params.bandId})
    })
})


module.exports = router;