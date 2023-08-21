const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.String },
  userName: { type: mongoose.SchemaTypes.String },
  userAvatar: { type: mongoose.SchemaTypes.String },
  gameId: { type: mongoose.SchemaTypes.String },
  gameName: { type: mongoose.SchemaTypes.String },
  rate: { type: Number },
  date: { type: Date },
  text: { type: mongoose.SchemaTypes.String },
});

module.exports = mongoose.model("Comments", commentSchema);
