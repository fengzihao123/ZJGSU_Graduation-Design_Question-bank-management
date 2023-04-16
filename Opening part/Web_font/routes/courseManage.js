var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    getTeacherCourseList(teaId, res)
});

async function getTeacherCourseList(teaId, res){
    let result = await request('/course/student/getTeacherCourseList',{teaId})
    res.render('courseManage',{
        courseList:result.data
    })
}
module.exports = router;
