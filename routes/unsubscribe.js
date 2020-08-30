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
  const sql = `update email set subscribe = 0, pro = 0 where email=?`;
  connection.query(sql, email, (err, data, fields) => {
    if (err) throw err;
    res.redirect("/bye");
  })
  console.log(email, " has been opted out");
});

module.exports = router;
