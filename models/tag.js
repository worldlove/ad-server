const mongoose = require("mongoose");

const subTag = mongoose.Schema({
  name: String,
  children: [String],
})

// 标签作为页面主要导航条显示内容
const TagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // 依据优先级进行分组排序
  priority: {
    type: Number,
    required: true,
  },
  // 该标签下面包含有哪些分类(必须是一级分类), 长度不可大于5
  children: {
    type: [subTag],
    required: true
  }
});

const TagModel = mongoose.model("tag", TagSchema, "tag");

module.exports = TagModel;
