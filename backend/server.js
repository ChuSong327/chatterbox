const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

//Use middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(bodyParser.json());

//Import routers
const usersRouter = require("./routes/users");
const roomsRouter = require("./routes/rooms");
const messagesRouter = require("./routes/messages");

//routes
app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/messages", messagesRouter);

//CORS
app.use((req,res, next) => {
  res.header("Access-Control-Allow-Origin", "http://chattersquare.herokuapp.com/");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
