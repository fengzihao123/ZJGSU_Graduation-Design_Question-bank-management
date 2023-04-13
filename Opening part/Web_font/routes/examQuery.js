var express = require('express');
const {request} = require("../public/javascripts/request");
var LocalStorage = require('node-localstorage').LocalStorage
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    getExamList(teaInfo[0].teaId, res)
});

async function getExamList(teaId, res){
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
