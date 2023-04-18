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
var makeQuestionRouter = require('./routes/makeQuestion');
var makeQuestionTwoRouter = require('./routes/makeQuestionTwo');
var makeQuestionThreeRouter = require('./routes/makeQuestionThree');
var makeQuestionDetailRouter = require('./routes/makeQuestionDetail');
var correctQuestionRouter = require('./routes/correctQuestion');
var correctQuestionOneRouter = require('./routes/correctQuestionOne');
var correctQuestionDetailRouter = require('./routes/correctQuestionDetail');
var correctQuestionDetailOneRouter = require('./routes/correctQuestionDetailOne');
var makeQuestionAutoRouter = require('./routes/makeQuestionAuto');
// todo 题库管理
var questionExplainRouter = require('./routes/questionExplain');
var questionQueryRouter = require('./routes/questionQuery');
var AddQuestionRouter = require('./routes/AddQuestion');
var AddQuestionAutoRouter = require('./routes/AddQuestionAuto');
// todo 成绩查询
var gradeCountRouter = require('./routes/gradeCount');
var gradeQueryRouter = require('./routes/gradeQuery');
var gradeQueryStudentRouter = require('./routes/gradeQueryStudent');
var gradeQueryStudentOneRouter = require('./routes/gradeQueryStudentOne');
var gradeQueryDetailRouter = require('./routes/gradeQueryDetail');
var gradeCountDetailRouter = require('./routes/gradeCountDetail');
// todo 学生管理
var studentManageRouter = require('./routes/studentManage');
var AddStudentRouter = require('./routes/AddStudent');
// todo 课程管理
var courseManageRouter = require('./routes/courseManage');
var courseExplainRouter = require('./routes/courseExplain');
var courseManageDetailRouter = require('./routes/courseManageDetail');
var courseStudentManageRouter = require('./routes/courseStudentManage');
var courseStudentManageOneRouter = require('./routes/courseStudentManageOne');
// todo 上传
var changeIndexRouter = require('./routes/changeIndex');
var selectQuestionRouter = require('./routes/selectQuestion');
var selectQuestion1Router = require('./routes/selectQuestion1');
var selectQuestion2Router = require('./routes/selectQuestion2');
var delRouter = require('./routes/del');
var updateRouter = require('./routes/update');
var newQuestionRouter = require('./routes/newQuestion');
var newExamOneRouter = require('./routes/newExamOne');
var insertExamQuestionRouter = require('./routes/insertExamQuestion');
var deleteExamQuestionRouter = require('./routes/deleteExamQuestion');
var updateExamRouter = require('./routes/updateExam');
var answerPointUpdateRouter = require('./routes/answerPointUpdate');
var insertGradeRouter = require('./routes/insertGrade');
var deleteCourseStudentRouter = require('./routes/deleteCourseStudent');
var addCourseStudentRouter = require('./routes/addCourseStudent');
var automaticallyRouter = require('./routes/automatically');
var repeatabilityRouter = require('./routes/repeatability');
var postQuestionRouter = require('./routes/postQuestion');
var deleteRepeatRouter = require('./routes/deleteRepeat');
var mobanPostRouter = require('./routes/mobanPost');
var readFileRouter = require('./routes/readFile');
var addFileRouter = require('./routes/addFile');

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
app.use('/makeQuestion', makeQuestionRouter);
app.use('/makeQuestionTwo', makeQuestionTwoRouter);
app.use('/makeQuestionThree', makeQuestionThreeRouter);
app.use('/makeQuestionDetail', makeQuestionDetailRouter);
app.use('/correctQuestion', correctQuestionRouter);
app.use('/correctQuestionOne', correctQuestionOneRouter);
app.use('/correctQuestionDetail', correctQuestionDetailRouter);
app.use('/correctQuestionDetailOne', correctQuestionDetailOneRouter);
app.use('/makeQuestionAuto', makeQuestionAutoRouter);
// todo 题库管理
app.use('/admin/questionExplain', questionExplainRouter);
app.use('/admin/questionQuery', questionQueryRouter);
app.use('/admin/AddQuestion', AddQuestionRouter);
app.use('/admin/AddQuestionAuto', AddQuestionAutoRouter);
// todo 成绩查询
app.use('/admin/gradeCount', gradeCountRouter);
app.use('/admin/gradeQuery', gradeQueryRouter);
app.use('/gradeQueryStudent', gradeQueryStudentRouter);
app.use('/gradeQueryStudentOne', gradeQueryStudentOneRouter);
app.use('/gradeQueryDetail', gradeQueryDetailRouter);
app.use('/gradeCountDetail', gradeCountDetailRouter);
// todo 学生管理
app.use('/admin/studentManage', studentManageRouter);
app.use('/admin/AddStudent', AddStudentRouter);
// todo 课程管理
app.use('/admin/courseExplain', courseExplainRouter);
app.use('/admin/courseManage', courseManageRouter);
app.use('/courseManageDetail', courseManageDetailRouter);
app.use('/courseStudentManage', courseStudentManageRouter);
app.use('/courseStudentManageOne', courseStudentManageOneRouter);
//上传
app.use('/changeIndex', changeIndexRouter);
app.use('/selectQuestion', selectQuestionRouter);
app.use('/selectQuestion1', selectQuestion1Router);
app.use('/selectQuestion2', selectQuestion2Router);
app.use('/del', delRouter);
app.use('/update', updateRouter);
app.use('/newQuestion', newQuestionRouter);
app.use('/newExamOne', newExamOneRouter);
app.use('/insertExamQuestion', insertExamQuestionRouter);
app.use('/deleteExamQuestion', deleteExamQuestionRouter);
app.use('/updateExam', updateExamRouter);
app.use('/answerPointUpdate', answerPointUpdateRouter);
app.use('/insertGrade', insertGradeRouter);
app.use('/deleteCourseStudent', deleteCourseStudentRouter);
app.use('/addCourseStudent', addCourseStudentRouter);
app.use('/automatically', automaticallyRouter);
app.use('/repeatability', repeatabilityRouter);
app.use('/postQuestion', postQuestionRouter);
app.use('/deleteRepeat', deleteRepeatRouter);
app.use('/mobanPost', mobanPostRouter);
app.use('/readFile', readFileRouter);
app.use('/addFile', addFileRouter);

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
