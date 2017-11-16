const express = require("express");
const {TagModel, CategoryModel} = require("../../models");

const tag = express.Router();

tag.get("/", function(req, res, next) {
  TagModel
    .find()
    .then((docs) => {
      return res.json({
        OK: true,
        docs: docs,
      });
    })
    .catch((err) => {
      return res.josn({OK: false, message: "服务器错误"})
    });
});

tag.post("/", function(req, res, next) {
  const form = req.body;
  console.log("form", form.children)
  console.log(Object.prototype.toString.call(form.children));
  const cats = [];
  for (let cat in form.children) {
    cats.push(CategoryModel.findOne({name: cat}).select({name: 1, chiltren: 1}));
  }
  Promise.all(cats).then((results) => {
    form.children = results;
    const newCat = new TagModel(form);
    newCat.save((err, doc, num) => {
      if (err) {
        let message;
        console.log(err);
        if (err.message.indexOf("duplicate key error") >= 0) {
          message = "标签名称已经存在";
        } else if (err.message) {
          message = err.message
        } else {
          message = "未知错误"
        }
        return res.json({OK: false, message: message});
      }

      res.json({OK: true});
    });
  })
})


tag.put("/", function(req, res, next) {
  const form = req.body;
  TagModel
    .findByIdAndUpdate(form._id, {$set: form})
    .then((doc, err, num)=>{
      console.log("OK", doc, err, num);
      res.json({OK: true})
    })
    .catch((err) => {
      if (err.message.indexOf("duplicate key error") >= 0) {
        message = "标签名称已经存在";
      } else if (err.ValidationError) {
        message = err.ValidationError
      }
      return res.json({OK: false, message: message});
    })
})

tag.delete("/:id", function(req, res, next) {
  const id = req.params.id;
  TagModel
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

module.exports = tag;
