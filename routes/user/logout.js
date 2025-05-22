const express = require('express');
const router  = express.Router();
const session = require("express-session");
const MongoStore = require("connect-mongo");

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect("/")
});

module.exports = router;
