const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		match: [/[a-zA-Z][0-9a-zA-Z_-]{3,20}/, "用户名必须是字母开头，可包含字母、数字、-、_，长度为4~20位"],
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		match: [/^1[3-8][0-9]{9}$/,"必须是正确的手机号码"]
	},
	email: {
		type: String,
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	avatar: String,
});

const UserModel = mongoose.model("user", UserSchema, "user");

module.exports = UserModel;