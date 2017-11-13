const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: "件"
  },
  storage: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  images: [],
  info: {
    type: String,
    required: true,
  },
  status: Boolean,
  createAt: {
    type: Date,
    default: Date.now,
  }
})


const ProductModel = mongoose.model("product", ProductSchema, "product");

module.exports = ProductModel;
