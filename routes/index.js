const express = require('express');
const router = express.Router();
const { UserModel } = require("../models");
const hmac = require("../utils/hash");
//const getCcap = require("../utils/getCaptcha");
const getCcap = require("../utils/ccap");
const apis = require("./api.json");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {apis});
})
// 注册 登录
router.post('/signup', function(req, res, next) {
  const form = req.body;
  if (req.session.captcha !== form.captcha.toUpperCase()) {
	return res.json({OK: false, "message": "注册失败 验证码错误 captcha: "+form.captcha});
  }
  const user = new UserModel({
	username: form.username,
	password: hmac(form.password),
	phone: form.phone,
	email: form.email,
  });
  user.save((err, doc, num) => {
	if (err) {
	  console.log("Err: ", err);
	  let message = err.message;
	  if (err.message.indexOf("duplicate key error") >= 0) {
		message = "用户名已经存在";
	  } else if (err.ValidationError) {
		message = err.ValidationError
	  }
	  return res.json({OK: false, message: message});
	}
	req.session.username = doc.username;
	req.session.userId = doc._id;
	res.json({ OK: true, user: {
	  _id: doc._id,
	  username: doc.username,
	}});
  });
});
router.post('/login', function(req, res, next) {
  const form = req.body;
  console.log("Post :", form);
  UserModel.findOne({username: form.username})
		   .select({__v: 0})
		   .then((doc) => {
			 if (!doc) {
			   console.log("Emputy Doc");

			   return res.json({"OK": false, "message": "登录失败 用户名不存在 User: " + form.username});
			 }
			 console.log(doc);

			 if (req.session.captcha !== form.captcha.toUpperCase()) {
			   return res.json({OK: false, "message": "登录失败 验证码错误 captcha: "+form.captcha});
			 }
			 if (doc.password === hmac(form.password)) {
			   req.session.userId = doc._id;
			   req.session.username = doc.username;
			   res.json({"OK": true,"user": {
				 _id: doc._id,
				 username: doc.username,
				 createAt: doc.createAt
			   }});
			 } else {
			   console.log(doc.password);
			   console.log(hmac(form.password));
			   return res.json({"OK": false, "message": "登录失败 密码错误 User: " + form.username});
			 }
		   })
		   .catch((err) => {
			 console.log("Error :", err);
			 next(err);
		   });
});

router.get("/logout", function(req, res, next) {
  if (req.session.username) {
	req.session.destroy();
  }
  return res.json({OK: true});	
});

module.exports = router;
