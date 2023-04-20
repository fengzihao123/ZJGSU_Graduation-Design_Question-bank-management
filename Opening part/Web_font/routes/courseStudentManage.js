
var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let curName = req.query.curName
    let classId = parseInt(req.query.classId)
    localStorage.setItem('curName',curName)
    localStorage.setItem('classId',classId)
    getStudentCourseList(classId, curName, res, req)
});

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
