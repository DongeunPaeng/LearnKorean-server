const express = require("express");
const axios = require("axios");
const mysql = require("mysql");
const router = express.Router();
const dotenv = require("dotenv");
const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-northeast-2" });

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

let retrievedPost = "";

router.get("/", (req, res, next) => {
  const sql = `select * from post order by date desc`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    retrievedPost = data[0];
    res.status(200).send(data[0].post);

    connection.end(err => console.log(err));

    const sender = "Test<service@learnkorean.cc>";
    const recipient = "dylan.paeng@deering.co";
    const subject = "test";
    const body_html = `
  <html>
  <head>
  </head>
  <body>
  <p style="white-space: pre-line">
  ${retrievedPost.post}
  </p>
  </body>
  </html>
  `;

    const charset = "UTF-8";
    const ses = new AWS.SES();

    const params = {
      Source: sender,
      Destination: {
        ToAddresses: [recipient]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: charset
        },
        Body: {
          Html: {
            Data: body_html,
            Charset: charset
          }
        }
      }
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log(err.message);
      }
    });
  });
});

router.post("/", (req, res, next) => {
  const {
    body: { post }
  } = req;

  // register Post
  const sql = `insert into post (post, date) values (?, now())`;
  connection.query(sql, post, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New post registred."
    });
  });
  connection.end(err => console.log(err.stack));
});

module.exports = router;
