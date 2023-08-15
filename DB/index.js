const mongoose = require("mongoose");

const mongoUrl = "mongodb://0.0.0.0:27017/users";

async function dbConnect() {
  try {
    let isConnected = await mongoose.connect(mongoUrl);
    console.log("Mongoose ☑");
  } catch (error) {
    console.log(error);
  }
}
dbConnect();
