const express = require("express");
const {UserModel, ProductModel} = require("../models");

const cart = express.Router();


cart.get("/", function(req, res, next) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("auth failure, 验证失败，需要登录");
  }
  UserModel.findById(userId).then((doc) => {
    const carts = doc.shoppingCart;
    const getPro = carts.map((pro,i) => {
      return ProductModel.findById(pro.pid).then((doc) => {
        return doc;
      })
    })
    Promise.all(getPro).then((results) => {
      const resData = [];
      for (let i =0; i< results.length; i++) {
        resData.push({
          _id: carts[i]._id,
          product: results[i],
          num: carts[i].num
        });
      }
      setTimeout(() => {
      res.json({
        OK: true,
        docs: resData
      })
      }, 1000);
    })
  }).catch((err) => {
    res.json({
      OK: false,
      message: err.toString()
    })
  })
});

cart.post("/", function(req, res, next) {
  const form = req.body;
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("auth failure, 验证失败，需要登录");
  }
  UserModel.findById(userId).then((user) => {
    if (!user.shoppingCart) {
      user.shoppingCart = [];
    }
    for (let cart of form) {
      const findIndex = user.shoppingCart.findIndex((sc) => (sc.pid.toString() === cart.pid));
      if (findIndex > -1) {
        user.shoppingCart[findIndex].num += cart.num;
        user.shoppingCart.time = new Date();
      } else {
        user.shoppingCart.unshift(cart);
      }
    }
    user.save((err, doc, num) => {
      if (err) {
        console.log("err: ", err);
        return res.json({
          type: false,
          message: "数据库错误"
        })
      }
      console.log("doc", doc)
      res.json({OK: true, count: doc.shoppingCart.length});
    })
  })
})

cart.delete("/:id", function(req, res, next) {
  const scid = req.params.id;
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("auth failure, 验证失败，需要登录");
  }
  UserModel.findById(userId).then((user) => {
    console.log(user.shoppingCart);
    if (user.shoppingCart.id(scid)) {
      user.shoppingCart.id(scid).remove();
    } else {
      return res.json({
        OK: false,
        message: "购物车中不存在该商品"
      })
    }
    user.save((err, doc, num) => {
      if (err) {
        console.log("err: ", err);
        return res.json({
          type: false,
          message: "数据库错误"
        })
      }
      console.log("doc", doc)
      res.json({OK: true});
    })
  })
})

module.exports = cart;
