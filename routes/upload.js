const express = require("express");
const multer = require("multer");
const upload = express.Router();

const uploadMid = multer({dest: "public/images"})

upload.post("/", uploadMid.single("upload"), function(req, res, next) {
    const funcNum = req.query.CKEditorFuncNum;
    console.log("File :",req.file);
    // 为了兼容windows
    const filePath = req.file.path.replace(/\\/g, "/");
    const start = filePath.indexOf("/");
    // 生成前端可以访问到的路径；
    const path = filePath.substr(start);
    res.send(path);
});

upload.post("/ckeditor", uploadMid.single("upload"), function(req, res, next) {
    const funcNum = req.query.CKEditorFuncNum;
    console.log("File :",req.file);
    // 为了兼容windows
    const filePath = req.file.path.replace(/\\/g, "/");
    const start = filePath.indexOf("/");
    // 生成前端可以访问到的路径；
    const path = filePath.substr(start);
    res.send(`<script>window.parent.CKEDITOR.tools.callFunction(${funcNum}, '${path}')</script>`);
});

module.exports = upload;
