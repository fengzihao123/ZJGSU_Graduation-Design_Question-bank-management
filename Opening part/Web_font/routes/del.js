var express = require('express');
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
const {LocalStorage} = require("node-localstorage");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let queId = req.query.queId
    console.log(queId)
    deleteQuestion(queId)
    getQuestionList(res, req)
});
async function deleteQuestion(queId){
    await upload('/question/delete/question?queId=' + queId,{isDelete:1})
}

async function getQuestionList(res, req){
    let result = await request('/question/question/getQuestion')

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