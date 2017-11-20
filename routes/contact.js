const express = require("express");

const {UserModel} = require("../models");

const contact = express.Router();

contact.all("/*", function(req, res, next) {
  if (req.method === "OPTIONS") {
    return res.send("ok")
  }
  if (!req.session.userId) {
    /* const id = "5a04093df5bccc25355abc11"
     * req.session.userId = id*/
    return res.status(401).send("auth failure, 验证失败，需要登录");
  }
  next();
})

contact.get("/", function(req, res, next) {
  UserModel.findById(req.session.userId).then((doc) => {
    res.json({
      OK: true,
      docs: doc.address,
    })
  }).catch((err) => {
    res.json({
      OK: false,
      message: err.toString()
    })
  })
});

contact.post("/", function(req, res, next) {
  UserModel.findById(req.session.userId).then((doc) => {
    const form = req.body;
    if (form.default) {
      if (doc.address.length > 0) {
        doc.address[0].default = false;
      }
      doc.address.unshift(form);
    } else {
      if (doc.address.length> 0) {
        const defaultAddress = doc.address.shift();
        doc.address.unshift(form);
        doc.address.unshift(defaultAddress);
      } else {
        form.default = true;
        doc.address.unshift(form);
      }
    }
    doc.save((err, doc, num) => {
      if (err) {
        return res.json({
          OK: false,
          message: err.toString()
        })
      }
      res.json({
        OK: true,
        docs: doc.address
      })
    })
  }).catch((err) => {
    res.json({
      OK: false,
      message: err.toString()
    })
  });
})

contact.put("/", function(req, res, next) {
  UserModel.findById(req.session.userId).then((doc) => {
    const form = req.body;
    const id = form.id;
    const address = doc.address.id(id);
    address.contact = form.contact;
    address.default = form.default;
    address.address = form.address;
    address.phone = form.phone;
    doc.address.id(id).remove();
    if (address.default) {
      doc.address[0].default = false;
      doc.address.unshift(address);
    } else {
      const defaultAddress = doc.address.shift();
      defaultAddress.default = true;
      doc.address.unshift(address);
      doc.address.unshift(defaultAddress);
    }
    doc.save((err, doc, num) => {
      if (err) {
        return res.json({
          OK: false,
          message: err.toString()
        })
      }
      res.json({
        OK: true,
        docs: doc.address
      })
    })
  }).catch((err) => {
    res.json({
      OK: false,
      message: err.toString()
    })
  })
})

contact.delete("/:id", function(req, res, next) {
  UserModel.findById(req.session.userId).then((doc) => {
    const id = req.params.id;
    doc.address.id(id).remove();
    if (doc.address.length > 0) {
      doc.address[0].default = true
    }
    doc.save((err, doc, num) => {
      if (err) {
        return res.json({
          OK: false,
          message: err.toString()
        })
      }
      res.json({
        OK: true,
        docs: doc.address
      })
    });
  }).catch((err) => {
    res.json({
      OK: false,
      message: err.toString()
    })
  })
})


contact.get("/:id", function(req, res, next) {
  UserModel.findById(req.session.userId).then((doc) => {
    const id = req.params.id;
    doc.address[0].default = false;
    const address = doc.address.id(id);
    doc.address.id(id).remove();
    address.default = true;
    doc.address.unshift(address);
    doc.save((err, doc, num) => {
      if (err) {
        return res.json({
          OK: false,
          message: err.toString()
        })
      }
      res.json({
        OK: true,
        docs: doc.address
      })
    });

  }).catch((err) => {
    res.json({
      OK: false,
      message: err.toString()
    })
  })
});

module.exports = contact;
