
var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    let curName = req.query.curName
    let classId = parseInt(req.query.classId)
    getTeacherCourseList(teaId, classId, curName, res)
});

async function getTeacherCourseList(teaId, classId, curName, res){
    let course = await request('/course/student/getTeacherCourseList',{teaId, classId, curName})
    let courseStudentList =  await request('/course/student/getTeacherCourseList1',{curName, classId})

    res.render('courseManageDetail',{
        course:course.data,
        courseStudentList:courseStudentList.data
    })
}
module.exports = router;
