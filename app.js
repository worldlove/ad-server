const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const nunjucks = require("nunjucks");

// session
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index');
const captcha = require("./routes/captcha");
const manage = require("./routes/manage/index");
const upload = require("./routes/upload");
const shoppingCart = require('./routes/shoppingCart');
const contact = require("./routes/contact");


app.use(session({
  store: new MongoStore({
	mongooseConnection: mongoose.connection
  }),
  name: "Carp",
  secret: "123345ljgaotu09354u0",
  cookie: {maxAge: 60*60*1000},

  // 如果为true， 则每次请求都更行cookie的过期时间;
  rolling: true,

  // 如果为true, 则默认每次请求都强制保存session;
  resave: true,

  // true 表示 所有连接只要没有session对象，都自动生成一个；
  // false 表示 不会自动生成，只有调用req.session进行操作时才会生成；
  saveUninitialized: false,
}))

// view engine setup
nunjucks.configure("views", {
  autoescape: true,
  express: app,
})
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));

// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// if (app.get("env") === "development") {
//   app.use(function(req, res, next) {
//     if (process.env.SERVER) {
// 	  res.append("Access-Control-Allow-Origin", "http://localhost:3001");
//     } else {
// 	  res.append("Access-Control-Allow-Origin", "http://localhost:3000");
//     } 
// 	res.append("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
// 	res.append("Access-Control-Allow-Credentials", true);
// 	res.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// 	next();
//   });
// }

app.use('/', index);
app.use("/captcha", captcha);
app.use("/manage", manage);
app.use("/upload", upload);
app.use("/shoppingcart", shoppingCart);
app.use("/contact", contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  if (app.get("env") === "development") {
	next(err)
  } else {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
  }
});

module.exports = app;
