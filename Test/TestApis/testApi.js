// // const express = require("express");
// // const cookieParser = require("cookie-parser");

// // // jwt
// // const fs = require("fs");
// // const jwt = require("jsonwebtoken");

// // const app = express();

// // app.use(cookieParser());
// // app.get("/", (req, res) => {
// //   res.send("Hello 🍪");
// // });
// // // jwt signing
// // // PAYLOAD
// // var payload = {
// //   data1: "Data 1",
// //   data2: "Data 2",
// //   data3: "Data 3",
// //   data4: "Data 4",
// // };
// // // PRIVATE & PUBLIC KEY
// // const privateKey = fs.readFileSync(__dirname + "/private.key", "utf8");
// // const publicKey = fs.readFileSync(__dirname + "/public.key", "utf8");
// // // SIGINING OPTION
// // var signOption = {
// //   expiresIn: "1m",
// //   algorithm: "RS256",
// // };
// // var token = jwt.sign(payload, privateKey, signOption);
// // console.log(`TOKEN: ${token}`);
// // // jwt verification
// // const verifyOption = {
// //   expiresIn: "1m",
// //   algorithm: ["RS256"],
// // };
// // const legit = jwt.verify(token, publicKey, verifyOption);
// // console.log("Verification result: ", legit);
// // // app.get("/cookieset", (request, response) => {
// // //   response.cookie("cookie is set", "true", { maxAge: 60000 });
// // //   response.send("cookie");
// // // });
// // // app.get("/cookieget", (request, response) => {
// // //   // response.send(request.cookies);
// // //   response.send(request.cookies);
// // // });
// // app.listen(5000, () => {
// //   console.log(`Test Server ☑`);
// // });
// // const express = require("express");
// // const session = require("express-session");
// // const cookieParser = require("cookie-parser");

// // const app = express();

// // app.use(express.json());
// // app.use(express.urlencoded());

// // app.use(cookieParser());
// // app.use(
// //   session({
// //     secret: "secret",
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //       sameSite: "none",
// //       httpOnly: true,
// //       secure: false,
// //     },
// //   })
// // );
// // app.use((req, res, next) => {
// //   console.log(`${req.method} : ${req.url} `);
// //   next();
// // });
// // app.get("/", (req, res) => {
// //   res.cookie("token", true, { maxAge: 10000 });
// //   res.send(req.cookies);
// // });

// // app.listen(3000, (request, response) => {
// //   console.log("test server ☑");
// // });
// const express = require("express");
// const session = require("express-session");
// // const nodemailer = require("nodemailer");

// const app = express();
// const port = 3000;

// app.use(session({ secret: "hello", cookie: { maxAge: 60000 } }));
// // app.get("/", (req, res) => {
// //   if (req.session.views) {
// //     req.session.views++;
// //     res.send(req.session.views);
// //   } else {
// //     req.session.views = 1;
// //     res.send("welcome");
// //   }
// // });
// // app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
// // app.get("/", (req, res) => {
// //   console.log(req.session.views);
// //   if (req.session.views) {
// //     req.session.views++;
// //     res.setHeader("Content-Type", "text/html");
// //     res.write("<p>views: " + req.session.views + "</p>");
// //     res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
// //     res.end();
// //   } else {
// //     req.session.view = 1;
// //     res.send("welcome");
// //     console.log(req.session.views);
// //   }
// // });
// // app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// // Access the session as req.session
// let a;
// app.get("/", (req, res, next) => {
//   if (req.session.views) {
//     req.session.views = true;
//     a++;
//     // res.setHeader("Content-Type", "text/html");
//     res.write("<p>views: " + a + "</p>");
//     // res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
//     res.end();
//   } else {
//     a = 1;
//     req.session.views = true;
//     console.log("session id in logout:", req.sessionID);
//     res.end("welcome to the session demo. refresh!");
//   }
// });
// app.get("/logout", (req, res) => {
//   console.log("session id in logout:", req.sessionID);
//   req.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.clearCookie("connect.sid"), res.send("deleted");
//     }
//   });
// });
// app.use(express.json());
// // app.post("/", async (req, res) => {
// //   const { email } = req.body;
// //   let transporter = nodemailer.createTransport({
// //     host: "smtp.ethereal.email",
// //     port: 587,
// //     secure: false,
// //     auth: {
// //       user: "avis.hilll33@ethereal.email",
// //       pass: "7NecTvY2sKhmGwdQMX",
// //     },
// //   });
// //   console.log(email);
// //   const msg = await transporter.sendMail({
// //     from: "AmirKabir Game Studio",
// //     to: `${email}`,
// //     subject: "Test Email",
// //     Text: "this is a a test mail",
// //     html: html,
// //   });
// //   let info = await transporter.sendMail(msg);
// //   console.log("Message is sent: ", info.messageId);
// //   res.send("Message sent");
// // });

// app.listen(port, () => console.log("Mail Server☑ on ", port));
const express = require("express");
const app = express();
const port = 3000;

// app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/upload", (req, res) => {
  // handle image upload here
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
