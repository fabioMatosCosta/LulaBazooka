const express = require('express');
const router = express.Router();
const Band = require("../../models/Band");


router.get('/band-detail/:id', (req, res) => {
    Band
    .findById(req.params.id)
    .populate("admin")
    .then((band)=>{
        res.render('band/band-detail', {bandHbs: band});
    })
});


module.exports = router;