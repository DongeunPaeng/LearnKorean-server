const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/* GET unsubscribe page. */
router.get("/", function(req, res, next) {
  const {
    query: { email }
  } = req;
  const sql = `update email set subscribe = 0, pro = 0 where email=${email}`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Opted out from the subscribers list."
    })
  })
  console.log(email, " has been opted out");
  res.redirect("https://learnkorean.cc/bye");
});

module.exports = router;
