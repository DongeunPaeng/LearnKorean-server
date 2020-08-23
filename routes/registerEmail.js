const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.post("/", (req, res, next) => {
  const {
    body: { email }
  } = req;
  const sql = `insert into email (email, date, unsubscribe) values (?, now(), 0)`;
  let values = [email];
  connection.query(sql, [values], (err, data, fields) => {
    if(err) throw err;
    res.json({
      status: 200,
      message: "New email registred."
    });
  });
});

module.exports = router;
