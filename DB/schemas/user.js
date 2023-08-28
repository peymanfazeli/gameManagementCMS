const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: mongoose.SchemaTypes.String },
  avatar: {
    type: mongoose.SchemaTypes.String,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  code: {
    type: mongoose.SchemaTypes.String,
  },
  token: {
    type: mongoose.SchemaTypes.String,
  },
  role: {
    type: mongoose.SchemaTypes.String,
  },
  ctg: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  minesweeper: [
    {
      level: { type: mongoose.SchemaTypes.String },
      winCondition: { type: mongoose.SchemaTypes.String },
      clickNumber: { type: Number },
      timer: { type: Number },
      cup: { type: Number },
    },
  ],
  score: { type: mongoose.SchemaTypes.String },
});
module.exports = mongoose.model("Users", UserSchema);
