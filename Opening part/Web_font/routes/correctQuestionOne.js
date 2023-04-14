var express = require('express');
const {request} = require("../public/javascripts/request");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let classId = parseInt(localStorage.getItem('classId'))
    getStudentList(classId, res, req)

});
async function getStudentList(classId, res, req){
    let result = await request('/student/user/login',{classId})
    var pageNum = req.query.page;

    console.log(pageNum)
    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = result.data.length;
    pager.pageSize = 2;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = result.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('correctQuestion', {
        studentList:dataList,
        pager:pager
    })
}


module.exports = router;