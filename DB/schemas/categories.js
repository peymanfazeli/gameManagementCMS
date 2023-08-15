const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: mongoose.SchemaTypes.String },
});
module.exports = mongoose.model("Category", categorySchema);
