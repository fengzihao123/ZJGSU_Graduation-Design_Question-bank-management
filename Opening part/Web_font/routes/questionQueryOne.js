var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage
const {request} = require('../public/javascripts/request')

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let curName = localStorage.getItem('curName')
    getQuestionList(res, req, curName);
});
async function getQuestionList(res, req, curName){
    let chapterList = await  request('/course/student/getChapter',{curName})
    let result = await request('/question/question/getQuestion',{curName})
    var pageNum = req.query.page;

    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = result.data.length;
    pager.pageSize = 6;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))
    console.log(result)

    var dataList = result.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('questionQuery', {
        questionList:dataList,
        chapterList:chapterList.data,
        pager:pager,
        curName:'',
        queType:'',
        chaName:'',
        difficulty:'',
        stem:'',
    });

}
module.exports = router;