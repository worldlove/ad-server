const mongoose = require("mongoose");

const StatusRecordSchema = mongoose.Schema({
  fromStatus: {
    type: Number,
    required: true,
  },
  toStatus: {
    type: Number,
    required: true,
  },
  operator: {
    name: String,
    id: mongoose.Schema.Types.ObjectId,
    useType: {
      type: String,
      // 顾客， 普通员工， 管理者（经理）， 系统管理员（超级管理员）
      enum: ["consumer", "staff", "managor", "super"]
    },
  },
  supplymentary: String,
  images: [],
})

const ProductListSchema = mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  }
})

const OrderSchema = mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  owner: {
    type: String, //订单的所有者
    required: true
  },
  payType: {
    type: String,
    enum: ["支付宝","微信","银联","货到付款"]
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    // 订单的状态信息
    // 0：已经完成，1：提交未付款，2：提交已付款， 3：正在出库，4：正在打包， 5： 已发货，6：已签收， 7:订单取消
    // -1：申请退货， -2：等待退货， -3：退货中，-4：收到退货待退款，-5：退货完成
    type: Number,
    default: 1
  },
  productList: {
    type: [ProductListSchema],
    required: true
  },
  record: [StatusRecordSchema]
})


const OrderModel = mongoose.model("order", OrderSchema, "order");

module.exports = OrderModel;
