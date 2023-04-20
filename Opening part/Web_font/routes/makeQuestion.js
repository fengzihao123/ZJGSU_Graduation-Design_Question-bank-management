var express = require('express');
const {request} = require("../public/javascripts/request");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage

/* GET home page. */
router.get('/', function(req, res, next) {
    let examId = parseInt(req.query.examId)
    let classId = parseInt(req.query.classId)
    let curName = req.query.curName
    localStorage = new LocalStorage('./scratch');
    localStorage.setItem('examId',examId)
    localStorage.setItem('classId',classId)
    localStorage.setItem('curName',curName)
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    getQuestionExamList(teaId, classId, examId, res, req, curName)
});

async function getQuestionExamList(teaId, classId, examId, res, req, curName){
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
    pager.pageSize = 5;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = result1.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('makeQuestion', {
        questionList:dataList,
        pager:pager,
        examDetail:result2.data,
        questionNum:QuestionNum,
        classId:classId,
        examId:examId,
        curName:curName,
        queType:'',
        chaName:'',
        difficulty:'',
        stem:''
    });
}

router.post('/examQuery', function(req, res, next) {
    res.render('examQuery');
});


module.exports = router;