const express = require("express");
const {LocalStorage} = require("node-localstorage");
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let postData = req.body
    let className = postData.className
    let curName = postData.curName
    let startTime = postData.startTime
    let examType = postData.examType
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    newExam(teaId, className, curName, startTime, examType, res)
});
async function newExam(teaId, className, curName, startTime, examType, res){
    let classList = await request('/student/user/class',{className})
    let classId = classList.data[0].classId
    await upload('/exam/student/newExam',{classId, teaId, className, curName, startTime, schoolTerm:'2022-2023 第二学期', examType, teacherStatus:0})
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