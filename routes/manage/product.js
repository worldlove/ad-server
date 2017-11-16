const express = require("express");
const {ProductModel} = require("../../models");

const product = express.Router();

product.get("/", function(req, res, next) {
  const query = req.query;
  ProductModel
    .find(query)
    .select()
    .then((docs) => {
      res.json ({
        OK: true,
        docs: docs
      });
    });
});
product.get("/:id", function(req, res, next) {
  const id = req.params.id;
  ProductModel
    .findById(id)
    .select()
    .then((doc) => {
      res.json ({
        OK: true,
        doc: doc
      });
    });
});

product.post("/", function(req, res, next) {
  const form = req.body;
  const product = new ProductModel(form);
  product.save(function(err, doc, num) {
    if (err) {
      let message;
      console.log(err);
      if (err.message.indexOf("duplicate key error") >= 0) {
        message = "分类名称已经存在";
      } else if (err.ValidationError) {
        message = err.ValidationError
      }
      return res.json({OK: false, message: message});
    }
    return res.json({OK: true})
  })
})

product.put("/", function(req, res, next) {
  const form = req.body;
  ProductModel
    .findByIdAndUpdate(form._id, {$set: form})
    .then((doc, err, num)=>{
      console.log("OK", doc, err, num);
      res.json({OK: true})
    })
    .catch((err) => {
      if (err.message.indexOf("duplicate key error") >= 0) {
        message = "商品名称已经存在";
      } else if (err.ValidationError) {
        message = err.ValidationError
      }
      return res.json({OK: false, message: message});
    })
})


product.delete("/:id", function(req, res, next) {
  const id = req.params.id;
  CategoryModel
    .remove({_id: id})
    .then((doc) => {
      console.log("OK,", doc);
      return res.json({OK: true});
    })
    .catch((err) => {
      console.log("Err: ", err);
      return res.json({OK: false, message: "服务器错误"});
    })
})

module.exports = product;
