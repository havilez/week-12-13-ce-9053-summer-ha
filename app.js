var express = require('express');
  path = require('path'),
 favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  recursive = require('recursive-readdir'),
  debug = require('debug')('app');

var routes = require('./routes/index');
var users = require('./routes/users');
var things = require("./routes/things");
var session = require("./routes/session");







if (require.main === module) {

  require("./config/db").connect(function (err, conn) {
    if (err)
      console.log(err);
    else
      console.log("connected");
  });
}

app = express();
app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  recursive('public/javascripts', ['app.js'], function (err, files) {
    var scripts = files.map(function(file){
      return file.replace("public", '');
    })
    res.locals.scripts = scripts;
    next();
  // Files is an array of filename 
  });
})


app.use('/', routes);
app.use('/users', users);
app.use('/api/things', things);
app.use('/api/session', session);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





if (require.main === module) {
  app.set('port', process.env.PORT || 3030);
  var server = app.listen(app.get('port'), function() {
    // the callback is added as a listener for the server's 'listen' event
    // see: http://nodejs.org/api/net.html#net_server_listen_path_callback

    // server is an http.Server, which extends a net.Server
    // http://nodejs.org/api/http.html#http_class_http_server
    // http://nodejs.org/api/net.html#net_class_net_server
    // http://nodejs.org/api/net.html#net_server_address
    debug('server started on port %s', server.address().port);

    // provide access to server via exported app for querying and adding listeners
    app.set('server', server);
  });
}


module.exports = app;