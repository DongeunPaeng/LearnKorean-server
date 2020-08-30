const express = require("express");
const router = express.Router();

/* GET unsubscribe page. */
router.get("/", function(req, res, next) {
  const {
    query: { email }
  } = req;
  console.log(email);
});

module.exports = router;
