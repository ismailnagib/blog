require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose')

var app = express();

var articlesRouter = require('./routes/articles')
var usersRouter = require('./routes/users')
var commentsRouter = require('./routes/comments')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.STATUS === 'test') {
    mongoose.connect(`mongodb://localhost:27017/blog-server-test`, { useNewUrlParser: true });
} else {
    mongoose.connect(`mongodb://blog-db-mlab-user:${process.env.MLAB_PASSWORD}@ds111913.mlab.com:11913/blog-db`, { useNewUrlParser: true });
}

app.use('/articles', articlesRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
