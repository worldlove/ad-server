const tag = require("./tag.js");
const product = require("./product.js");
const category = require("./category.js");

const express = require("express");

const manage = express.Router();

manage.use("/product", product)
manage.use("/category", category)
manage.use("/tag", tag)

module.exports =  manage;
