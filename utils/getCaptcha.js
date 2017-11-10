const http = require("http");
const ip = "192.168.1.118";
const port = 3000;
const path = "/";

const getCcap = function(cb) {
	http.get({
		host: ip,
		port: port,
		path: path,
	}, function(res) {
		let resData = "";
		res.setEncoding("utf-8");
		res.on("data", function(chunk) {
			resData += chunk;
		});
		res.on("end", function() {
			const jsObj = JSON.parse(resData);
			console.log("Obj:", jsObj);
			cb(jsObj);
		});
	});
}

// getCcap();

module.exports = getCcap;