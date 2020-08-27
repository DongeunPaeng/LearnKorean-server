const express = require("express");
const mysql = require("mysql");
const AWS = require("aws-sdk");
const router = express.Router();

AWS.config.update({ region: "ap-northeast-2" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get("/", (req, res, next) => {
  res.send("Here it lives!");
});

router.post("/", (req, res, next) => {
  const {
    body: { email }
  } = req;
  const sql = `insert into email (email, date, subscribe) values (?, now(), 1)`;
  let values = [email];
  connection.query(sql, [values], (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New email registred."
    });
  });
  // send eamil via AWS SES
  const sender = "Learn Korean<service@learnkorean.cc>";
  const recipient = email;
  const subject = "한글 공부에서 글귀가 도착하였습니다.";
  const body_html = `<html>
<head></head>
<body>
  <h1>한글 공부에 가입하신 것을 환영합니다!</h1>
  <p>한글 공부에서 보내주는 짧은 글들을 읽고 실력을 키워보세요.</p>
</body>
</html>`;
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

module.exports = router;
