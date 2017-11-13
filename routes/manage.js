const express = require("express");
const {CategoryModel, ProductModel} = require("../models");

const category = express.Router();

category.get("/", function(req, res, next) {
  CategoryModel
    .find()
    .then((docs) => {
      return res.json(docs);
    })
    .catch((err) => {
      return res.josn({OK: false, message: "服务器错误"})
    });
});

category.get("/:level", function(req, res, next) {
  const level = req.params.level;
  if (["1", "2"].indexOf(level) < 0 ) {
    return res.json({OK: false, message: "请求参数有误"});
  }
  CategoryModel
    .find({level: level})
    .then((docs) => {
      return res.json(docs);
    })
    .catch((err) => {
      return res.josn({OK: false, message: "服务器错误"})
    });

});

category.post("/", function(req, res, next) {
  const form = req.body;
  if (form.level === 2 && form.children.length > 0) {
    return res.status(400).json({error: "请求参数有误"});
  }
  const newCat = new CategoryModel(form);
  newCat.save((err, doc, num) => {
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

    res.json({OK: true});
  });
})


category.put("/", function(req, res, next) {
  const form = req.body;
  if (form.level === 2 && form.children.length > 0 || !!form._id) {
    return res.status(400).json({error: "请求参数有误"});
  }
  CategoryModel
    .findByIdAndUpdate(form._id, {$set: form})
    .then((doc, err, num)=>{
      console.log("OK", doc, err, num);
      res.json({OK: true})
    })
    .catch((err) => {
      if (err.message.indexOf("duplicate key error") >= 0) {
        message = "分类名称已经存在";
      } else if (err.ValidationError) {
        message = err.ValidationError
      }
      return res.json({OK: false, message: message});
    })
})

category.delete("/:id", function(req, res, next) {
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


const product = express.Router();

product.get("/", function(req, res, next) {
  const query = req.query;
  ProductModel
    .find(query)
    .select()
    .then((docs) => {
      return res.json(docs);
    })

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
        message = "分类名称已经存在";
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

exports.category = category;
exports.product = product;
