var express = require('express');
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
var LocalStorage = require('node-localstorage').LocalStorage
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let examId = parseInt(req.query.examId)
    getExamList(teaInfo[0].teaId, examId, res)
    console.log(examId)
});

async function getExamList(teaId, examId, res){
    await upload('/exam/student/deleteExam?examId=' + examId)
    let result0 = await request('/exam/student/getExamListTeacher',{teaId:teaId, teacherStatus:0})
    let result1 = await request('/exam/student/getExamListTeacher',{teaId:teaId, teacherStatus:1})
    let result2 = await request('/exam/student/getExamListTeacher',{teaId:teaId, teacherStatus:2})
    res.render('examQuery', {
        examList0:result0.data,
        examList1:result1.data,
        examList2:result2.data
    })
}

module.exports = router;