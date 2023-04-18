var express = require('express');
const {LocalStorage} = require("node-localstorage");
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))

    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    getQuestionExamList(teaId, classId, examId, res, req)
});



async function difficultyQuestion(diffNum, curName, queType, examId, classId){
    //todo 查询到满足条件的对应数量的题目
    let result = await request('/question/question/getQuestionAutoDiff',{diffNum, curName, queType})
    console.log(result.data)
    //todo 上传题目
    for(var i = 0; i < result.data.length; i++){
        await upload('/exam/student/newExamQuestion',{
            classId,
            examId,
            curName,
            queId:result.data[i].queId,
            queType:queType,
            stem:result.data[i].stem,
            choiceA:result.data[i].choiceA,
            choiceB:result.data[i].choiceB,
            choiceC:result.data[i].choiceC,
            choiceD:result.data[i].choiceD,
            answer:result.data[i].answer,
        })
    }
}
async function getQuestionExamList(teaId, classId, examId, res, req){
    let result1 = await request('/exam/student/getExamQuestion',{classId, examId})
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
    QuestionNum.bianCheng = resultBian.data.length

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
    res.render('makeQuestionDetail', {
        questionList:dataList,
        pager:pager,
        examDetail:result2.data,
        questionNum:QuestionNum,
        classId:classId,
        examId:examId
    });
}
module.exports = router;