var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var signin = require('./routes/signin');
var reroute = require('./routes/rerouting');
var instance_block = require('./routes/instances');
var expresssession=require('express-session');

var app = express();
var http = require('http');

// view engine setup
app.set('port',process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.session({ secret: 'cmpe295', cookie: { maxAge: 600000 }}))

/*
app.use(cookieSession({
    name: 'session',
    keys: ['CMPE295'],
    // Cookie Options 
    maxAge:2* 60 * 1000 //2 minutes
}));
*/

app.use(expresssession({
    cookieName: 'session',
    secret: 'session_virtual_lab_295B',
    duration: 1*60*1000,
    activeDuration: 1*60*1000
}));

app.use('/', index);
app.use('/users', users);



app.post('/signup',function(req,res){
  console.log("signup app.js");
  signup.checksignup(req,res);
});

app.post('/signin',function(req,res){
    //session management based on cookies.
 // session1 = req.session;
  console.log("signin app.js");

  signin.checksignin(req,res);
});

app.get('/create_instance',function(req,res){
  console.log("inside create_instance");
  reroute.pagetwo(req,res);

});


app.post('/instance',function(req,res){
    ses = req.session;
  console.log("inside /instance");
    if(ses.user_id)
    {
        instance_block.createInstance(req,res);
    }
    else
    {
        console.log("logging out");
        res.redirect('/');
    }

});


app.get('/logout',function(req,res){
    req.session = null;
    res.redirect('/');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


http.createServer(app).listen(app.get('port'),function(){
console.log('server listening at port'+ app.get('port'));
});


module.exports = app;
