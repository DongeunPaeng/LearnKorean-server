const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send('hello index.js');
});

module.exports = router;
