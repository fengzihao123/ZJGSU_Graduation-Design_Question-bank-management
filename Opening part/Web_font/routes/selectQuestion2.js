var express = require('express');
const {post} = require("axios");
const {request} = require("../public/javascripts/request");
const {LocalStorage} = require("node-localstorage");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/', function(req, res, next) {
    let postData = req.body;
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    getQuestionExamList(teaId, classId, examId, res, req, postData)

});
async function getQuestionExamList(teaId, classId, examId, res, req, postData){
    let curName = postData.curName || '';
    let queType = postData.queType || '';
    let chaName = postData.chaName || '';
    let difficulty = postData.difficulty || '';
    let stem = postData.searchContent || '';
    let result1 = await request('/question/question/getQuestion',{curName, queType, chaName, difficulty, stem})
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
    pager.pageSize = 6;
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