const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../DB/schemas/user.js");
const { comparePass } = require("../Utils/helper");

passport.serializeUser((user, done) => {
  console.log("Serialized User:", user);
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const deserializedUser = await User.findById(id);
    if (!deserializedUser) {
      throw new Error("User Not found");
    } else {
      console.log(deserializedUser);
      done(null, deserializedUser);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(`Email is ${email}`);
      console.log(`Password is : ${password}`);
      try {
        if (!email || !password) {
          throw new Error("Missing Credentials");
        }
        const filteredUser = await User.findOne({ email });
        if (!filteredUser) {
          throw new Error("User not found in DB");
        }
        const isValid = comparePass(password, filteredUser.password);
        if (isValid) {
          console.log("Authenticate Successfully", filteredUser);
          done(null, filteredUser);
        } else {
          console.log("Invalid Authenticate");
          done(null, null);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
