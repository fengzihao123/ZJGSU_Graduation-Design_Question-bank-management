var express = require('express');
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/', function(req, res, next) {
    let postData = req.body
    let queId = postData.queId
    let curName    = postData.curName
    let stem       = postData.stem
    let choiceA    = postData.choiceA
    let choiceB    = postData.choiceB
    let choiceC    = postData.choiceC
    let choiceD    = postData.choiceD
    let chaName    = postData.chaName
    let queType    = postData.queType
    let difficulty = postData.difficulty
    let answer     = postData.answer
    updateQuestion(queId, curName, stem, choiceA, choiceB, choiceC, choiceD, chaName, queType, difficulty, answer)
    getQuestionList(res, req)
});

async function updateQuestion(queId, curName, stem, choiceA, choiceB, choiceC, choiceD, chaName, queType, difficulty, answer){
    await upload('/question/update/question?queId=' + queId,{curName, stem, choiceA, choiceB, choiceC, choiceD, chaName, queType, difficulty, answer})
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