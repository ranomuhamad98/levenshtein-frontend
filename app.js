require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const session = require('express-session');
const {Datastore} = require('@google-cloud/datastore');
const {DatastoreStore} = require('@google-cloud/connect-datastore');
const cors = require('cors');

//var Initialization = require("./initialization")


const port = process.env.APPLICATION_PORT;
console.log(port)


var ejs = require('ejs'); 
ejs.open = '{{'; 
ejs.close = '}}';


var app = express();
app.use(cors())

//Consider all request as application/json
app.use(express.json({type: '*/*'}));
// parse application/json
app.use(bodyParser.json())


app.use(session({
  store: new DatastoreStore({
    dataset: new Datastore(),
    kind: 'express-sessions',
  }),
  secret: 'levenshtein-frontend',saveUninitialized: true,resave: false}));



//Dynamic routing based on configuration
const fs = require('fs');
let rawdata = fs.readFileSync('route-config.json');
let routers = JSON.parse(rawdata);
routers.forEach(function (route){
  var r = require(route.router);
  app.use(route.path,  r)
})

console.log(__dirname)

// set the view engine to ejs
app.set("view options", {layout: false});  
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');
app.set('views', __dirname + "/public/pages");


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port)



//Initialization.initializeDatabase();

console.log("Levenshtein Frontend server on  port : " + port)

module.exports = app;
