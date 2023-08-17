const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  title: { type: mongoose.SchemaTypes.String },
  abstract: { type: mongoose.SchemaTypes.String },
  info: { type: mongoose.SchemaTypes.String },
  categories: { type: mongoose.SchemaTypes.String },
  rate: { type: mongoose.SchemaTypes.Number },
  comments: { type: mongoose.SchemaTypes.String },
  large_image: { type: mongoose.SchemaTypes.String },
  small_image: { type: mongoose.SchemaTypes.String },
});
module.exports = mongoose.model("Games", gamesSchema);
