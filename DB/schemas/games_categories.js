const mongoose = require("mongoose");

const gamesCategoriesSchema = new mongoose.Schema({
  gameId: { type: mongoose.SchemaTypes.String },
  categoryId: { type: mongoose.SchemaTypes.String },
});

module.exports = mongoose.model("gameCategories", gamesCategoriesSchema);
