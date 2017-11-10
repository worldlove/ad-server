const crypto = require("crypto");
const secret = "120283qlalksdjglajglajhlka09385058ljdlj";

// const hash = crypto.createHash("sha256");

// hash.update("a12345678");
// hash.update(secret);
// console.log("hash", hash.digest("hex"));

// const hmac = crypto.createHmac("sha256", secret);
// hmac.update("a12345678");
// console.log("hmac", hmac.digest("hex"));

const hmac = function(str) {
	const hmac1 = crypto.createHmac("sha256", secret);
	hmac1.update(str);
	return hmac1.digest("hex");
}


module.exports = hmac;