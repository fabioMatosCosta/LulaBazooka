const express = require('express');
const router  = express.Router();
const Band = require("../models/Band")

router.get('/', (req, res, next) => {
    res.render('index');
});



module.exports = router;