const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const mongoStore = require("connect-mongo");
const passport = require("passport");
require("../Strategies/local");

// routers
const cdnRoute = require("../Routs/cdnRouter");
const profileRoute = require("../Routs/profileRouter");
const gameRoute = require("../Routs/gameRouter");
const authRoute = require("../Routs/authRouter");
const homeRoute = require("../Routs/homeRouter");
const adminRoute = require("../Routs/adminRouter");
const ctgRoute = require("../Routs/ctgRouter");
const commentRoute = require("../Routs/commentRouter");

require("../DB");

const User = require("../DB/schemas/user");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5500",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.url} `);
  next();
});

app.use(async (request, response, next) => {
  const regex = /(?<=(s:)).*(?=\.)/;
  let cookie = request.cookies.Token;
  if (cookie) {
    let token = cookie.match(regex)[0];
    const userProfile = await User.findOne({ token });
    request.user = userProfile;
    // next;
  }
  next();
});

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/profile", profileRoute);
app.use("/home", homeRoute);
app.use("/assets", cdnRoute);
app.use("/categories", ctgRoute);
app.use("/games", gameRoute);
app.use("/comment", commentRoute);

app.listen(PORT, () => console.log("Express Server☑"));
