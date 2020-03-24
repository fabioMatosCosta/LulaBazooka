const express = require('express');
const router = express.Router();
const Band = require("../models/Band")


router.get('/edit-profile', (req, res, next) => {
  res.render('user/edit-profile')
});



module.exports = router;
