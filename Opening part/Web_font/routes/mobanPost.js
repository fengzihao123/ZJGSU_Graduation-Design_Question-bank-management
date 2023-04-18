var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
var LocalStorage = require('node-localstorage').LocalStorage
const {storage} = require("debug");
const {upload} = require("../public/javascripts/upload");
/* GET home page. */


router.post('/', function(req, res, next) {
    let postData = req.body
    let moName = postData.moban
    localStorage = new LocalStorage('./scratch');
    let curName = localStorage.getItem('curName')
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))
    postQuestionByMoban(moName, curName, examId, classId)
});

async function postQuestionByMoban(moName, curName, examId, classId){
    let result = await request('/exam/moban/getMoban',{moName, curName})
    let danxuan = result.data[0].danxuan || ''
    let duoxuan = result.data[0].duoxuan || ''
    let tiankong = result.data[0].tiankong || ''
    let wenda = result.data[0].wenda || ''
    let jisuan = result.data[0].jisuan || ''
    let biancheng = result.data[0].biancheng || ''
    let examDifficulty = result.data[0].examDifficulty || '';
    let examSimple = 1 - examDifficulty

        // todo 单选题
        if(danxuan){
            var diffNum_dan = parseInt(danxuan * examSimple)
            var simpleNum_dan = danxuan - diffNum_dan
            var queType = '单选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_dan, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_dan, curName, queType, examId, classId)
        }
        if(duoxuan){
            var diffNum_duo = parseInt(duoxuan * examSimple)
            var simpleNum_duo = duoxuan - diffNum_duo
            var queType = '多选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_duo, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_duo, curName, queType, examId, classId)
        }
        if(tiankong){
            var diffNum_tian = parseInt(tiankong * examSimple)
            var simpleNum_tian = tiankong - diffNum_tian
            var queType = '填空'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_tian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_tian, curName, queType, examId, classId)
        }
        if(jisuan){
            var diffNum_ji = parseInt(jisuan * examSimple)
            var simpleNum_ji = jisuan - diffNum_ji
            var queType = '计算'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_ji, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_ji, curName, queType, examId, classId)
        }
        if(wenda){
            var diffNum_wen = parseInt(wenda * examSimple)
            var simpleNum_wen = wenda - diffNum_wen
            var queType = '问答'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_wen, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_wen, curName, queType, examId, classId)
        }
        if(biancheng){
            var diffNum_bian = parseInt(biancheng * examSimple)
            var simpleNum_bian = biancheng - diffNum_bian
            var queType = '编程'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_bian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_bian, curName, queType, examId, classId)
        }
}

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

async function simpleQuestion(simpleNum, curName, queType, examId, classId){
    //todo 查询到满足条件的对应数量的题目
    let result = await request('/question/question/getQuestionAutoDiff',{simpleNum, curName, queType})
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
module.exports = router;
