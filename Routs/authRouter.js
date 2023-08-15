const { Router } = require("express");
const session = require("express-session");
const nodemailer = require("nodemailer");
const mongoStore = require("connect-mongo");
const passport = require("passport");
// jwt dependencies
const jwt = require("jsonwebtoken");
const fs = require("fs");

const {
  hashPassword,
  comparePass,
  validateEmail,
  validatePassword,
  randomCodeGenerator,
} = require("../Utils/helper");

const User = require("../DB/schemas/user");
const authRouter = Router();

authRouter.get("/", (request, response) => {
  response.send("POST your email and password");
});

// user signup
authRouter.post("/register", async (request, response) => {
  const { userName, email, avatar, token } = request.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    response.status(400).send({ msg: `User Already Exists... ${email}` });
  } else {
    let userPassword = validatePassword(request.body.password);
    let userEmail = validateEmail(email);
    const code = randomCodeGenerator();

    if (!userEmail) {
      response.status(401).send("Invalid Email");
    } else if (!userPassword) {
      response.status(401).send("Invalid Password");
    } else {
      const password = hashPassword(request.body.password);
      await User.create({
        userName,
        avatar,
        email,
        password,
        code,
        token,
        ctg: "",
        role: "user",
      });
      const html = `
      <h1>سلام</h1>
      <p>   به سایت خوش اومدی این کد رو وارد کن تا حسابت فعال شه:  ${code}</p>
      `;
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "veda.kessler@ethereal.email",
          pass: "xWmffnecVJymCaTTg6",
        },
      });
      const msg = await transporter.sendMail({
        from: "AmirKabir Game Studio",
        to: `${email}`,
        subject: "Verification Code",
        Text: "this is a test mail",
        html: html,
      });
      let info = await transporter.sendMail(msg);
      console.log("Message is sent: ", info.messageId);
      response.send(201);
    }
  }
});
// authRouter.use(
//   session({
//     secret: "hello",
//     key: "Token",
//     cookie: { maxAge: 60000, httpOnly: false, secure: false },
//     store: mongoStore.create({
//       mongoUrl: "mongodb://0.0.0.0:27017/users",
//     }),
//   })
// ); ok in most cases
let captchaGeneratedCode;
authRouter.get("/login", (request, response, next) => {
  captchaGeneratedCode = randomCodeGenerator();
  response.json({ captcha: captchaGeneratedCode });
});

authRouter.use(
  session({
    secret: "hello",
    key: "Token",
    cookie: {
      maxAge: 60000,
      httpOnly: false,
      secure: false,
    },
    store: mongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/users",
    }),
  })
);
authRouter.post("/emailVerification", async (request, response) => {
  const { code } = request.body;
  const userInDb = await User.findOne({ code });
  if (!userInDb) {
    return response.send(401);
  } else {
    console.log("user:", userInDb);
    await User.updateOne({ code: userInDb.code }, { code: "verified" });
    await User.updateOne(
      { token: userInDb.token },
      { token: request.session.id }
    );

    return response.json({ user: userInDb });
  }
});

// produce captcha and show to user

authRouter.post("/login", async (request, response, next) => {
  const { email, password, rememberMe, userCaptcha, role } = request.body;

  if (!email || !password || !userCaptcha) {
    return response.status(400).send({ msg: "Missing Credentials" });
  }
  if (Number(userCaptcha) !== captchaGeneratedCode) {
    return response.sendStatus(498);
  }
  const adminPass =
    "$2a$12$JjgqUdQaaTpf5EkN8ZLo2.bQpPRJm86iWGGFWLHlyIFlZ6iGcRIJ.";
  if (email === "admin@admin.com" && comparePass(password, adminPass)) {
    return response.sendStatus(301);
  }

  const filteredUser = await User.findOne({ email });
  if (!filteredUser) {
    return response.status(401).send({ msg: "User not found in DB" });
  } else if (filteredUser) {
    const isValid = comparePass(password, filteredUser.password);
    if (isValid) {
      if (filteredUser.code === "verified") {
        if (rememberMe) {
          request.session.cookie.maxAge = 86400000;
        }
        console.log("request sessions in login/authRouter: ", request.session);
        await User.updateOne(
          { token: filteredUser.token },
          { token: request.session.id }
        );
        let users = await User.find();
        return response.json({ user: users });
      } else {
        return response.sendStatus(403);
      }
    } else {
      return response.sendStatus(401);
    }
  }
});
authRouter.get("/logout", async (request, response) => {
  console.log("session ID in logging out:", request.session);
  request.session.destroy((err) => {
    if (err) {
      console.log("error in clearing cookie", err);
    } else {
      response.clearCookie("Token");
      response.end();
    }
  });
});

module.exports = authRouter;
