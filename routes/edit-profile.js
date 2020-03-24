const express = require('express');
const router = express.Router();
const Band = require("../models/Band")


router.get('/edit-profile/:id', (req, res, next) => {
  Band.findById(req.params.id)
  res.render('user/edit-profile');
});



module.exports = router;
