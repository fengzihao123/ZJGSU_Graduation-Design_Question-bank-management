var express = require('express');
const {post} = require("axios");
const {request} = require("../public/javascripts/request");
var LocalStorage = require('node-localstorage').LocalStorage
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let curName = localStorage.getItem('curName')
    //todo 再将搜索内容读出来
    let search = JSON.parse(localStorage.getItem('searchContent'))
    getQuestion(res, req, search, curName)
});
async function getQuestion(res, req, search, curName){
    let chapterList = await  request('/course/student/getChapter',{curName})
    let result = await request('/question/question/getQuestion',{curName:search.curName||'', queType:search.queType||'', chaName:search.chaName||'', difficulty:parseInt(search.difficulty)||'', stem:search.stem||''})

    var pageNum = req.query.page;

    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数

    pager.maxNum = result.data.length;
    pager.pageSize = 6;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = result.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )

    res.render('searchQuestion', {
        questionList:dataList,
        chapterList:chapterList.data,
        pager:pager,
        curName:search.curName||'',
        queType:search.queType||'',
        chaName:search.chaName||'',
        difficulty:search.difficulty||'',
        stem:search.stem||''
    });
}


module.exports = router;