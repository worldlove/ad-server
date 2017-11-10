const ccap = require("ccap");

const captcha = ccap();

const getCcap = function() {
	const cap = captcha.get();
	return {
		text: cap[0],
		buffer: cap[1].toString("base64")
	}
}

module.exports = getCcap;