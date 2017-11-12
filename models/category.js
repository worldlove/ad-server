const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
	type: String,
	required: true,
	unique: true,
  },
  level: {
	type: Number,
  },
  children: []
});

const CategoryModel = mongoose.model("category", CategorySchema, "category");

module.exports = CategoryModel;
