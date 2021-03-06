const express = require("express");
const axios = require("axios");
const mysql = require("mysql");
const router = express.Router();
const dotenv = require("dotenv");
const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-northeast-2" });

dotenv.config();

let connection;

const handleDisconnect = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect(err => {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", err => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

handleDisconnect();

let retrievedPost = "";

router.get("/", (req, res, next) => {
  const sql = `select * from post order by date desc`;
  connection.query(sql, (err, data, fields) => {
    if (err) throw err;
    retrievedPost = data[0];
    res.status(200).send(data[0].post);

    const sender = "Test<service@learnkorean.cc>";
    const recipient = "dylan.paeng@deering.co";
    const subject = "test";
  const body_html = `
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0;" />
        <meta name="format-detection" content="telephone=no" />

        <style>
          body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            width: 100% !important;
            height: 100% !important;
          }
          body,
          table,
          td,
          div,
          p,
          a {
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            line-height: 100%;
          }
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse !important;
            border-spacing: 0;
          }
          img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          #outlook a {
            padding: 0;
          }
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }

          @media all and (min-width: 560px) {
            .container {
              border-radius: 8px;
              -webkit-border-radius: 8px;
              -moz-border-radius: 8px;
              -khtml-border-radius: 8px;
            }
          }

          a,
          a:hover {
            color: #127db3;
          }
          .footer a,
          .footer a:hover {
            color: #999999;
          }
        </style>

        <title>한글 공부가 이제 시작됩니다!</title>
      </head>

      <body
        topmargin="0"
        rightmargin="0"
        bottommargin="0"
        leftmargin="0"
        marginwidth="0"
        marginheight="0"
        width="100%"
        style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      background-color: #F0F0F0;
      color: #000000;"
        bgcolor="#F0F0F0"
        text="#000000"
      >
        <table
          width="100%"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;"
          class="background"
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
              bgcolor="#F0F0F0"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="560"
                style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;"
                class="wrapper"
              >
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 20px;
          padding-bottom: 20px;"
                  >
                    <div
                      style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
          color: #F0F0F0;"
                      class="preheader"
                    >
                      한루에 한 번씩, 한글 실력 향상! 아름다운 우리말, 한글을
                      배워보세요.
                    </div>

                    <!-- LOGO -->
                    <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
                    <a
                      target="_blank"
                      style="text-decoration: none;"
                      href="https://learnkorean.cc"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 -300 2000 2000"
                        >
                          <path
                            id="logo-black"
                            fill="black"
                            stroke="none"
                            strokeWidth="1"
                            d="M 0.00,161.84
               C 0.00,161.84 0.00,323.69 0.00,323.69
                 0.00,323.69 232.47,323.69 232.47,323.69
                 232.47,323.69 464.94,323.69 464.94,323.69
                 464.94,323.69 464.94,668.62 464.94,668.62
                 464.94,668.62 464.94,1013.56 464.94,1013.56
                 464.94,1013.56 232.47,1013.56 232.47,1013.56
                 232.47,1013.56 0.00,1013.56 0.00,1013.56
                 0.00,1013.56 0.00,1174.78 0.00,1174.78
                 0.00,1174.78 0.00,1336.00 0.00,1336.00
                 0.00,1336.00 1028.00,1336.00 1028.00,1336.00
                 1028.00,1336.00 2056.00,1336.00 2056.00,1336.00
                 2056.00,1336.00 2056.00,1174.78 2056.00,1174.78
                 2056.00,1174.78 2056.00,1013.56 2056.00,1013.56
                 2056.00,1013.56 1823.53,1013.56 1823.53,1013.56
                 1823.53,1013.56 1591.06,1013.56 1591.06,1013.56
                 1591.06,1013.56 1591.06,668.62 1591.06,668.62
                 1591.06,668.62 1591.06,323.69 1591.06,323.69
                 1591.06,323.69 1823.53,323.69 1823.53,323.69
                 1823.53,323.69 2056.00,323.69 2056.00,323.69
                 2056.00,323.69 2056.00,161.84 2056.00,161.84
                 2056.00,161.84 2056.00,0.00 2056.00,0.00
                 2056.00,0.00 1028.00,0.00 1028.00,0.00
                 1028.00,0.00 0.00,0.00 0.00,0.00
                 0.00,0.00 0.00,161.84 0.00,161.84 Z
               M 1267.35,668.62
               C 1267.35,668.62 1267.35,1013.56 1267.35,1013.56
                 1267.35,1013.56 1028.00,1013.56 1028.00,1013.56
                 1028.00,1013.56 788.65,1013.56 788.65,1013.56
                 788.65,1013.56 788.65,668.62 788.65,668.62
                 788.65,668.62 788.65,323.69 788.65,323.69
                 788.65,323.69 1028.00,323.69 1028.00,323.69
                 1028.00,323.69 1267.35,323.69 1267.35,323.69
                 1267.35,323.69 1267.35,668.62 1267.35,668.62 Z"
                          />
                        </svg>
                        <p
                          style="width: 100px; color: black; font-size: 20px; font-weight: 700;"
                        >
                          한글 공부
                        </p>
                      </div>
                    </a>
                  </td>
                </tr>

                <!-- End of WRAPPER -->
              </table>

              <!-- WRAPPER / CONTEINER -->
              <!-- Set conteiner background color -->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                bgcolor="#FFFFFF"
                width="560"
                style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;"
                class="container"
              >
                <!-- HEADER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 20px; font-weight: bold; line-height: 130%;
          padding-top: 25px;
          color: #000000;
          font-family: sans-serif;"
                    class="header"
                  >
                    하루에 한 번씩, 한글 실력 향상!
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
          padding-top: 5px;
          color: #000000;
          font-family: sans-serif;"
                    class="subheader"
                  >
                    <span style="color: #007AFF">팽동은</span>님,
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
          padding-top: 5px;
          color: #000000;
          font-family: sans-serif;"
                    class="subheader"
                  >
                    아름다운 우리말, 한글을 배워보세요.
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
          padding-top: 20px;"
                    class="hero"
                  >
                    <img
                      border="0"
                      vspace="0"
                      hspace="0"
                      src="https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=560&q=0"
                      alt="Please enable images to view this content"
                      title="Hero Image"
                      width="560"
                      style="
          width: 100%;
          max-width: 560px;
          color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 15px; font-weight: 400; line-height: 100%;
          padding-top: 25px;
          color: #000000;
          font-family: sans-serif;"
                    class="paragraph"
                  >
                    조금 더 어려운 글을 읽어보고 싶으신가요?
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 15px; font-weight: 400; line-height: 100%;
          padding-top: 25px;
          color: #000000;
          font-family: sans-serif;"
                    class="paragraph"
                  >
                    단어나 표현에 대한 설명이 필요하신가요?
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 15px; font-weight: 400; line-height: 100%;
          padding-top: 25px;
          color: #000000;
          font-family: sans-serif;"
                    class="paragraph"
                  >
                    한 달에 1달러($1/month)로 PRO를 시작해보세요!
                  </td>
                </tr>

                <!-- BUTTON -->
                <!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;
          padding-bottom: 5px;"
                    class="button"
                  >
                    <a href="https://learnkorean.cc/premium" target="_blank">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"
                      >
                        <tr>
                          <td
                            align="center"
                            valign="middle"
                            style="padding: 12px 24px; margin: 0; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                            bgcolor="#007AFF"
                          >
                            <a
                              target="_blank"
                              style="color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
                              href="https://learnkorean.cc/premium"
                              >PRO 시작하기
                            </a>
                          </td>
                        </tr>
                      </table></a
                    >
                  </td>
                </tr>

                <!-- LINE -->
                <!-- Set line color -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;"
                    class="line"
                  >
                    <hr
                      color="#E0E0E0"
                      align="center"
                      width="100%"
                      size="1"
                      noshade
                      style="margin: 0; padding: 0;"
                    />
                  </td>
                </tr>

                <!-- LIST -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%;"
                    class="list-item"
                  >
                    <table
                      align="center"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      style="width: inherit; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;"
                    >
                      <!-- LIST ITEM -->
                      <tr>
                        <!-- LIST ITEM IMAGE -->
                        <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                        <td
                          align="left"
                          valign="top"
                          style="border-collapse: collapse; border-spacing: 0;
              padding-top: 30px;
              padding-right: 20px;"
                        >
                          <img
                            src="https://assets.materialup.com/uploads/a9d0c27a-e40f-46da-87f3-6c2e1b39c01d/fsfs.png"
                            height="50"
                          />
                        </td>

                        <!-- LIST ITEM TEXT -->
                        <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                        <td
                          align="left"
                          valign="top"
                          style="font-size: 15px; font-weight: 400; line-height: 160%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
              padding-top: 25px; word-break: keep-all;
              color: #000000;
              font-family: sans-serif;"
                          class="paragraph"
                        >
                          <b style="color: #333333;">오늘의 글귀: 첫 번째</b><br />
                          남을 부러워 하지 마시길.<br />
                          그 많은 단점에도 불구하고<br />
                          나는 나.<br />
                          <br />
                          시류에 휩쓸리지 마시길.<br />
                          당대는 흐르고 본질은 남는 것.<br />
                          <br />
                          박웅현 - 여덟단어
                        </td>
                      </tr>

                      <!-- LIST ITEM -->
                      <tr>
                        <!-- LIST ITEM IMAGE -->
                        <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                        <td
                          align="left"
                          valign="top"
                          style="border-collapse: collapse; border-spacing: 0;
              padding-top: 30px;
              padding-right: 20px;"
                        >
                          <img
                            src="https://assets.materialup.com/uploads/a9d0c27a-e40f-46da-87f3-6c2e1b39c01d/fsfs.png"
                            height="50"
                          />
                        </td>

                        <!-- LIST ITEM TEXT -->
                        <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                        <td
                          align="left"
                          valign="top"
                          style="font-size: 15px; font-weight: 400; line-height: 160%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
              padding-top: 25px; word-break: keep-all;
              color: #000000;
              font-family: sans-serif;"
                          class="paragraph"
                        >

                          <b style="color: #333333;">오늘의 글귀: 두 번째</b><br /><p style="white-space: pre-line">${retrievedPost.post}</p>
                          <br />
                          <br />
                          프레드릭 배크만 - 오베라는 남자
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- LINE -->
                <!-- Set line color -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;"
                    class="line"
                  >
                    <hr
                      color="#E0E0E0"
                      align="center"
                      width="100%"
                      size="1"
                      noshade
                      style="margin: 0; padding: 0;"
                    />
                  </td>
                </tr>

                <!-- PARAGRAPH -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 14px; font-weight: 400; line-height: 160%;
          padding-top: 20px;
          padding-bottom: 25px;
          color: #000000;
          font-family: sans-serif;"
                    class="paragraph"
                  >
                    의견이 있으신가요?
                    <a
                      href="mailto:service@learnkorean.cc"
                      target="_blank"
                      style="color: #127DB3; font-family: sans-serif; font-size: 14px; font-weight: 400; line-height: 160%;"
                      >service@learnkorean.cc</a
                    >
                  </td>
                </tr>

                <!-- End of WRAPPER -->
              </table>

              <!-- WRAPPER -->
              <!-- Set wrapper width (twice) -->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="560"
                style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;"
                class="wrapper"
              >
                <!-- SOCIAL NETWORKS -->
                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;"
                    class="social-icons"
                  >
                    <table
                      width="256"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      align="center"
                      style="border-collapse: collapse; border-spacing: 0; padding: 0;"
                    >
                      <tr>
                        <!-- ICON 1 -->
                        <td
                          align="center"
                          valign="middle"
                          style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"
                        >
                          <a
                            target="_blank"
                            href="https://learnkorean.cc"
                            style="text-decoration: none;"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
              color: #000000;"
                              alt="F"
                              title="Facebook"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/facebook.png"
                          /></a>
                        </td>

                        <!-- ICON 2 -->
                        <td
                          align="center"
                          valign="middle"
                          style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"
                        >
                          <a
                            target="_blank"
                            href="https://learnkorean.cc"
                            style="text-decoration: none;"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
              color: #000000;"
                              alt="T"
                              title="Twitter"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/twitter.png"
                          /></a>
                        </td>

                        <!-- ICON 3 -->
                        <td
                          align="center"
                          valign="middle"
                          style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"
                        >
                          <a
                            target="_blank"
                            href="https://learnkorean.cc"
                            style="text-decoration: none;"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
              color: #000000;"
                              alt="G"
                              title="Google Plus"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/googleplus.png"
                          /></a>
                        </td>

                        <!-- ICON 4 -->
                        <td
                          align="center"
                          valign="middle"
                          style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"
                        >
                          <a
                            target="_blank"
                            href="https://learnkorean.cc"
                            style="text-decoration: none;"
                            ><img
                              border="0"
                              vspace="0"
                              hspace="0"
                              style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
              color: #000000;"
                              alt="I"
                              title="Instagram"
                              width="44"
                              height="44"
                              src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/instagram.png"
                          /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- FOOTER -->
                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                <tr>
                  <td
                    align="center"
                    valign="top"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
          padding-top: 20px;
          padding-bottom: 20px;
          color: #999999;
          font-family: sans-serif; word-break: keep-all;"
                    class="footer"
                  >
                    이 이메일은 '한글 공부'의 글귀 발송 서비스에 동의한 가입자에게만
                    발송되는 이메일입니다. 해지를 원하시면
                    <a
                      href="https://learnkorean.cc/api/unsubscribe?email=dylan.paeng@gmail.com"
                      target="_blank"
                      style="color: black; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;"
                      >구독 해지</a
                    >를 눌러 즉시 구독을 해지해주세요.
                    <p>&#0169; 2020 LearnKorean. All rights reserved.</p>
                  </td>
                </tr>
                <!-- End of WRAPPER -->
              </table>

              <!-- End of SECTION / BACKGROUND -->
            </td>
          </tr>
        </table>
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
});

module.exports = router;
