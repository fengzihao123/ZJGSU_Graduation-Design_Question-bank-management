
var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
const {upload} = require('../public/javascripts/upload')
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let curName = localStorage.getItem('curName')
    let classId = parseInt(localStorage.getItem('classId'))
    let id = parseInt(req.query.id)
    deleteStudent(id)
    getStudentCourseList(classId, curName, res, req)
});

//todo 删除
async function deleteStudent(id){
    await upload('/course/student/deleteCourseStudent?id=' + id)
}

async function getStudentCourseList(classId, curName, res, req){
    let courseStudentList =  await request('/course/student/getTeacherCourseList1',{curName, classId})
    var pageNum = req.query.page;

    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = courseStudentList.data.length;
    pager.pageSize = 10;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = courseStudentList.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('courseStudentManage',{
        courseStudentList:dataList,
        pager:pager
    })
}
module.exports = router;
