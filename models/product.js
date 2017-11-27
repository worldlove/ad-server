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
  // 行业分类， 比如汽车等
  industryCat: {
    type: String,
    required: true
  },
  // 不同的行业有不同的详情信息
  detail: Object,
  storage: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tag: {
    type: [],
    required: false,
  },
  images: {
    type: [],
    required: true,
    min: 1,
  },
  image: {
    type: String,
  },
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
// 汽车详情
/* {
 *   topSpeed: {
 *     type: Number,
 *     required: true,
 *   },
 *   oilWear: {
 *     type: Number,
 *     required: true,
 *   },
 *   power: {
 *     type: Number,
 *     required: true,
 *   },
 *   zeroTo100: {
 *     type: Numver,
 *     required: true
 *   },
 *   exteriorColor: [String],
 *   customColor: [String],
 *   interiorColor: [String]
 * }*/

const ProductModel = mongoose.model("product", ProductSchema, "product");

module.exports = ProductModel;
