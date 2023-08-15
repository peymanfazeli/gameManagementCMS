const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.String },
  gameId: { type: mongoose.SchemaTypes.String },
  text: { type: mongoose.SchemaTypes.String },
  // big_image: { type: mongoose.SchemaTypes.String },
  // small_image: { type: mongoose.SchemaTypes.String },
});

module.exports = mongoose.model("Comments", commentSchema);
