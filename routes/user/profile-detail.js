const express = require('express');
const router  = express.Router();
const User = require("../../models/User");
const Band = require("../../models/Band")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.get('/profile/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then((user)=>{
        res.render("user/profile-detail",{profLoop:user})
    })
    .catch((error)=>{
        res.render("error",error)
    })
});


module.exports = router;