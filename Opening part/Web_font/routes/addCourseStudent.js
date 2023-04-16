var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
const {upload} = require('../public/javascripts/upload')
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.post('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let postData = req.body
    let stuId = postData.stuId
    let curName = postData.curName
    let stuName = postData.stuName
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    let classId = parseInt(localStorage.getItem('classId'))
    updateStudentCourse(teaId, curName, classId, stuId, stuName, classId)
    getStudentCourseList(classId, curName, res, req)
});

//todo 删除
async function updateStudentCourse(teaId, curName, classId, stuId, stuName){
    let courseList = await request('/course/student/getTeacherCourseList',{teaId, curName, classId})
    // todo 更新
    await upload('/course/student/newCourseStudent',{stuId, curName, teaId, stuName, classId, curImage:courseList.data[0].curImage, term:'2022-2023 第二学期'})
}

async function getStudentCourseList(classId, curName, res, req){
    let courseStudentList =  await request('/course/student/getTeacherCourseList1',{curName, classId})
    var pageNum = req.query.page;

    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = courseStudentList.data.length;
    pager.pageSize = 2;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = courseStudentList.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('courseStudentManage',{
        courseStudentList:dataList,
        pager:pager
    })
}
module.exports = router;
