const {LocalStorage} = require("node-localstorage");
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
const express = require("express");
var router = express.Router();
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))
    let teaId = teaInfo[0].teaId
    let queId =   parseInt(req.query.queId)
    let stem =    req.query.stem
    let choiceA = req.query.choiceA
    let choiceB = req.query.choiceB
    let choiceC = req.query.choiceC
    let choiceD = req.query.choiceD
    let queType = req.query.queType
    let answer =  req.query.answer
    let curName =  req.query.curName
    getQuestionExamList(teaId, classId, examId, curName, queId, stem, choiceA, choiceB, choiceC, choiceD, queType, answer, res, req)
});


async function getQuestionExamList(teaId, classId, examId, curName, queId, stem, choiceA, choiceB, choiceC, choiceD, queType, answer, res, req){
    await upload('/exam/student/newExamQuestion',{classId, examId, curName, queId, queType, stem, choiceA, choiceB, choiceC, choiceD, answer})
    let result1 = await request('/question/question/getQuestion')
    let result2 = await request('/exam/student/getExamListTeacher',{teaId, examId})
    let resultDan = await request('/exam/student/getExamQuestion',{classId:result2.data[0].classId, examId, queType:'单选'})
    let resultDuo = await request('/exam/student/getExamQuestion',{classId:result2.data[0].classId, examId, queType:'多选'})
    let resultTian = await request('/exam/student/getExamQuestion',{classId:result2.data[0].classId, examId, queType:'填空'})
    let resultJi = await request('/exam/student/getExamQuestion',{classId:result2.data[0].classId, examId, queType:'计算'})
    let resultWen = await request('/exam/student/getExamQuestion',{classId:result2.data[0].classId, examId, queType:'问答'})
    let resultBian = await request('/exam/student/getExamQuestion',{classId:result2.data[0].classId, examId, queType:'编程'})
    var QuestionNum = {};
    QuestionNum.danXuan = resultDan.data.length
    QuestionNum.duoXuan = resultDuo.data.length
    QuestionNum.tianKong = resultTian.data.length
    QuestionNum.jiSuan = resultJi.data.length
    QuestionNum.wenDa = resultWen.data.length
    QuestionNum.biangCheng = resultBian.data.length

    var pageNum = req.query.page;

    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = result1.data.length;
    pager.pageSize = 2;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = result1.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('makeQuestion', {
        questionList:dataList,
        pager:pager,
        examDetail:result2.data,
        questionNum:QuestionNum
    });
}

router.post('/examQuery', function(req, res, next) {
    res.render('examQuery');
});


module.exports = router;