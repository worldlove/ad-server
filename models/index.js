const mongoose = require("mongoose");
const UserModel = require("./user");
// const ArticalModel = require("./artical");
// const CommentModel = require("./comment");
const hmac = require("../utils/hash");

const url = "mongodb://localhost:27017/blog";

mongoose.Promise = global.Promise;

mongoose.connect(url, {
	useMongoClient: true
});

// 检查数据库 user 表是不是为空，如果为空，插入测试数据
UserModel.count()
.then((num) => {
	if (num === 0) {
		const admin = new UserModel({
			username: "admin",
			password: hmac("admin"),
		});
		const user1 = new UserModel({
			username: "user1",
			password: hmac("user1"),
		});
		admin.save();
		user1.save();
	}
})
.catch((err) => {
	throw(err);
});

exports.UserModel = UserModel;
// exports.ArticalModel = ArticalModel;
// exports.CommentModel = CommentModel;