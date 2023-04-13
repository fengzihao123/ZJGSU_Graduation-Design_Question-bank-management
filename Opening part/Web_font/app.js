var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var mainRouter = require('./routes/main');
// todo 考试管理
var examExplainRouter = require('./routes/examExplain');
var examQueryRouter = require('./routes/examQuery');
var AddExamRouter = require('./routes/AddExam');
// todo 题库管理
var questionExplainRouter = require('./routes/questionExplain');
var questionQueryRouter = require('./routes/questionQuery');
var AddQuestionRouter = require('./routes/AddQuestion');
var AddQuestionAutoRouter = require('./routes/AddQuestionAuto');
// todo 成绩查询
var gradeCountRouter = require('./routes/gradeCount');
var gradeQueryRouter = require('./routes/gradeQuery');
// todo 学生管理
var studentManageRouter = require('./routes/studentManage');
var AddStudentRouter = require('./routes/AddStudent');
// todo 课程管理
var courseManageRouter = require('./routes/courseManage');
var courseExplainRouter = require('./routes/courseExplain');
// todo 上传
var changeIndexRouter = require('./routes/changeIndex');
var selectQuestionRouter = require('./routes/selectQuestion');
var delRouter = require('./routes/del');
var updateRouter = require('./routes/update');
var newQuestionRouter = require('./routes/newQuestion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', indexRouter);
app.use('/admin/main', mainRouter);
app.use('/admin/welcome', welcomeRouter);
// todo 考试管理
app.use('/admin/examExplain', examExplainRouter);
app.use('/admin/examQuery', examQueryRouter);
app.use('/admin/AddExam', AddExamRouter);
// todo 题库管理
app.use('/admin/questionExplain', questionExplainRouter);
app.use('/admin/questionQuery', questionQueryRouter);
app.use('/admin/AddQuestion', AddQuestionRouter);
app.use('/admin/AddQuestionAuto', AddQuestionAutoRouter);
// todo 成绩查询
app.use('/admin/gradeCount', gradeCountRouter);
app.use('/admin/gradeQuery', gradeQueryRouter);
// todo 学生管理
app.use('/admin/studentManage', studentManageRouter);
app.use('/admin/AddStudent', AddStudentRouter);
// todo 课程管理
app.use('/admin/courseExplain', courseExplainRouter);
app.use('/admin/courseManage', courseManageRouter);

//上传
app.use('/changeIndex', changeIndexRouter);
app.use('/selectQuestion', selectQuestionRouter);
app.use('/del', delRouter);
app.use('/update', updateRouter);
app.use('/newQuestion', newQuestionRouter);

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

module.exports = app;
