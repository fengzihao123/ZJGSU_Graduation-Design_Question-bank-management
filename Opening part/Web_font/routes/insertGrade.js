var express = require('express');
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
const {LocalStorage} = require("node-localstorage");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let stuId = localStorage.getItem('stuId')
    insertGrade(examId, stuId, res)
});

async function insertGrade(examId, stuId, res){
    let result_dan = await request('/exam/answer/getAnswer',{examId, stuId, queType:'单选'})
    let result_duo = await request('/exam/answer/getAnswer',{examId, stuId, queType:'多选'})
    let result_tian = await request('/exam/answer/getAnswer',{examId, stuId, queType:'填空'})
    let result_ji = await request('/exam/answer/getAnswer',{examId, stuId, queType:'计算'})
    let result_wen = await request('/exam/answer/getAnswer',{examId, stuId, queType:'问答'})
    let result_bian = await request('/exam/answer/getAnswer',{examId, stuId, queType:'编程'})
    //todo 遍历数组，将point总和 -- 单选
    var danxuan = 0;
    for(var i = 0; i < result_dan.data.length; i++){
        danxuan += result_dan.data[i].point
        if(result_dan.data[i].point == 0){
            // 错题上传  获取错误题目信息
            let errorQuestion = await request('/question/question/getQuestionDetail',{queId:result_dan.data[i].queId})
            await upload('/question/errorQuestion/newError',{
                queId:errorQuestion.data[0].queId,
                stuId,
                queType:errorQuestion.data[0].queType,
                stem:errorQuestion.data[0].stem,
                choiceA:errorQuestion.data[0].choiceA,
                choiceB:errorQuestion.data[0].choiceB,
                choiceC:errorQuestion.data[0].choiceC,
                choiceD:errorQuestion.data[0].choiceD,
                difficulty:errorQuestion.data[0].difficulty,
                chaName:errorQuestion.data[0].chaName,
                analysis:errorQuestion.data[0].analysis,
                answer:errorQuestion.data[0].answer,
                myAnswer:result_dan.data[i].myAnswer
            })
            let questionCount = await request('/exam/student/getExamQuestion',{examId,queId:result_dan.data[i].queId})
            let errorCount = questionCount.data[0].errorCount
            errorCount++
            await upload('/exam/student/updateExamQuestionCount?id=' + questionCount.data[0].id,{errorCount})
        }
    }

    //todo 遍历数组，将point总和 -- 多选
    var duoxuan = 0;
    for(var i = 0; i < result_duo.data.length; i++){
        duoxuan += result_duo.data[i].point
        if(result_duo.data[i].point == 0){
            // 错题上传  获取错误题目信息
            let errorQuestion = await request('/question/question/getQuestionDetail',{queId:result_duo.data[i].queId})
            await upload('/question/errorQuestion/newError',{
                queId:errorQuestion.data[0].queId,
                stuId,
                queType:errorQuestion.data[0].queType,
                stem:errorQuestion.data[0].stem,
                choiceA:errorQuestion.data[0].choiceA,
                choiceB:errorQuestion.data[0].choiceB,
                choiceC:errorQuestion.data[0].choiceC,
                choiceD:errorQuestion.data[0].choiceD,
                difficulty:errorQuestion.data[0].difficulty,
                chaName:errorQuestion.data[0].chaName,
                analysis:errorQuestion.data[0].analysis,
                answer:errorQuestion.data[0].answer,
                myAnswer:result_duo.data[i].myAnswer
            })
            let questionCount = await request('/exam/student/getExamQuestion',{examId,queId:result_duo.data[i].queId})
            let errorCount = questionCount.data[0].errorCount
            errorCount++
            await upload('/exam/student/updateExamQuestionCount?id=' + questionCount.data[0].id,{errorCount})
        }
    }

    //todo 遍历数组，将point总和 -- 填空
    var tiankong = 0;
    for(var i = 0; i < result_tian.data.length; i++){
        tiankong += result_tian.data[i].point
        if(result_tian.data[i].point == 0){
            // 错题上传  获取错误题目信息
            let errorQuestion = await request('/question/question/getQuestionDetail',{queId:result_tian.data[i].queId})
            await upload('/question/errorQuestion/newError',{
                queId:errorQuestion.data[0].queId,
                stuId,
                queType:errorQuestion.data[0].queType,
                stem:errorQuestion.data[0].stem,
                choiceA:errorQuestion.data[0].choiceA,
                choiceB:errorQuestion.data[0].choiceB,
                choiceC:errorQuestion.data[0].choiceC,
                choiceD:errorQuestion.data[0].choiceD,
                difficulty:errorQuestion.data[0].difficulty,
                chaName:errorQuestion.data[0].chaName,
                analysis:errorQuestion.data[0].analysis,
                answer:errorQuestion.data[0].answer,
                myAnswer:result_tian.data[i].myAnswer
            })
            let questionCount = await request('/exam/student/getExamQuestion',{examId,queId:result_tian.data[i].queId})
            let errorCount = questionCount.data[0].errorCount
            errorCount++
            await upload('/exam/student/updateExamQuestionCount?id=' + questionCount.data[0].id,{errorCount})
        }
    }

    //todo 遍历数组，将point总和 -- 计算
    var jisuan = 0;
    for(var i = 0; i < result_ji.data.length; i++){
        jisuan += result_ji.data[i].point
        if(result_ji.data[i].point == 0){
            let questionCount = await request('/exam/student/getExamQuestion',{examId,queId:result_ji.data[i].queId})
            let errorCount = questionCount.data[0].errorCount
            errorCount++
            await upload('/exam/student/updateExamQuestionCount?id=' + questionCount.data[0].id,{errorCount})
        }
    }

    //todo 遍历数组，将point总和 -- 问答
    var wenda = 0;
    for(var i = 0; i < result_wen.data.length; i++){
        wenda += result_wen.data[i].point
        if(result_wen.data[i].point == 0){
            let questionCount = await request('/exam/student/getExamQuestion',{examId,queId:result_wen.data[i].queId})
            let errorCount = questionCount.data[0].errorCount
            errorCount++
            await upload('/exam/student/updateExamQuestionCount?id=' + questionCount.data[0].id,{errorCount})
        }
    }

    //todo 遍历数组，将point总和 -- 编程
    var biancheng = 0;
    for(var i = 0; i < result_bian.data.length; i++){
        biancheng += result_bian.data[i].point
        if(result_bian.data[i].point == 0){
            let questionCount = await request('/exam/student/getExamQuestion',{examId,queId:result_bian.data[i].queId})
            let errorCount = questionCount.data[0].errorCount
            errorCount++
            await upload('/exam/student/updateExamQuestionCount?id=' + questionCount.data[0].id,{errorCount})
        }
    }

    //todo 成绩上传
    var score = 0;
    score = danxuan + duoxuan + tiankong + jisuan + wenda + biancheng
    let examList = await request('/exam/student/examDetail',{examId})
    await upload('/grade/student/newGrade',{
        examId,
        stuId,
        curName:examList.data[0].curName,
        danxuan,
        duoxuan,
        tiankong,
        jisuan,
        wenda,
        biancheng,
        score
    })

    // todo 跳转
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    let result0 = await request('/exam/student/getExamListTeacher',{teaId:teaId, teacherStatus:0})
    let result1 = await request('/exam/student/getExamListTeacher',{teaId:teaId, teacherStatus:1})
    let result2 = await request('/exam/student/getExamListTeacher',{teaId:teaId, teacherStatus:2})
    res.render('examQuery', {
        examList0:result0.data,
        examList1:result1.data,
        examList2:result2.data
    })
}
module.exports = router;