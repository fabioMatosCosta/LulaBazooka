const express = require('express');
const router  = express.Router();
const User = require("../models/User")


router.get('/edit-profile/:id', (req, res, next) => {
    User.findById(req.params.id)
  res.render('user/edit-profile');
});



module.exports = router;
