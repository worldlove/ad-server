const express = require("express");
const getCcap = require("../utils/ccap");

const captcha = express.Router();

captcha.get("/", function(req, res, next) {
	const callback = req.query.callback;
	const cap = getCcap();
	console.log("Captcha: ", cap.text);
	req.session.captcha = cap.text.toUpperCase();
	//res.send(cap.buffer);
	// res.send(`function test(captcha) {
	// 	console.log(captcha)
	// }; 
	// test('${cap.buffer}')`);
	const capJson = JSON.stringify(cap);
	if (callback) {
		res.send(`${callback}('${capJson}')`);
	} else {
		res.send({captcha: cap.buffer});
	}
});

module.exports = captcha;
