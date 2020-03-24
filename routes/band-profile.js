const express = require('express');
const router = express.Router();
const Band = require("../models/Band")


router.get('/band-profile', (req, res) => {
  res.render('band/band-profile');
});



module.exports = router;