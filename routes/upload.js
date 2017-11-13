const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = express.Router();

// 本机测试
const SERVER = "http://localhost:3000";
// 教室服务器地址
// const SERVER = "http://192.168.1.210:3000";
// 生产环境
// const SERVER = "/";

const uploadMid = multer({dest: "public/images"})

upload.post("/", uploadMid.single("file"), function(req, res, next) {
    console.log("File :",req.file);
    // 为了兼容windows
    const filePath = req.file.path.replace(/\\/g, "/");
    const start = filePath.indexOf("/");
    // 生成前端可以访问到的路径；
    const subpath = filePath.substr(start);
    // res.send(subpath);
    const resPath = SERVER + subpath
    res.send(resPath);
});

upload.post("/ckeditor", uploadMid.single("file"), function(req, res, next) {
    const funcNum = req.query.CKEditorFuncNum;
    console.log("File :",req.file);
    // 为了兼容windows
    const filePath = req.file.path.replace(/\\/g, "/");
    const start = filePath.indexOf("/");
    // 生成前端可以访问到的路径；
    const subpath = filePath.substr(start);
    const resPath = SERVER + subpath
    res.send(`<script>window.parent.CKEDITOR.tools.callFunction(${funcNum}, '${resPath}')</script>`);
});

module.exports = upload;
