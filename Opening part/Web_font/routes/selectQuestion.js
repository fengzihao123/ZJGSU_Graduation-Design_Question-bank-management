var express = require('express');
const {post} = require("axios");
const {request} = require("../public/javascripts/request");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/', function(req, res, next) {
    let postData = req.body;

    getQuestion(res, postData, req)
});
async function getQuestion(res, postData, req){
    let curName = postData.curName || '';
    let queType = postData.queType || '';
    let chaName = postData.chaName || '';
    let difficulty = postData.difficulty || '';
    let stem = postData.searchContent || '';
    let result = await request('/question/question/getQuestion',{curName, queType, chaName, difficulty, stem})

    var pageNum = req.query.page;

    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = result.data.length;
    pager.pageSize = 2;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = result.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )

    res.render('questionQuery', {
        questionList:dataList,
        pager:pager
    });
}


module.exports = router;