var express = require('express');
const {LocalStorage} = require("node-localstorage");
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    let postData = req.body
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))
    let curName = localStorage.getItem('curName');
    let totalDifficulty = postData.totalDifficulty || '';
    let chaName = postData.chaName || '';
    let moban = postData.moban || '';

    let danxuan = parseInt(postData.danxuan) || '';
    let duoxuan = parseInt(postData.duoxuan) || '';
    let tiankong = parseInt(postData.tiankong) || '';
    let jisuan = parseInt(postData.jisuan) || '';
    let wenda = parseInt(postData.wenda) || '';
    let biancheng = parseInt(postData.biancheng) || '';
    // todo 简单难度  难度<=3的题目占90% ，难度>=4的题目占10%
    if(totalDifficulty == '简单'){
        // todo 单选题
        if(danxuan){
            var diffNum_dan = parseInt(danxuan * 0.1)
            var simpleNum_dan = danxuan - diffNum_dan
            var queType = '单选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_dan, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_dan, curName, queType, examId, classId)
        }
        if(duoxuan){
            var diffNum_duo = parseInt(duoxuan * 0.1)
            var simpleNum_duo = duoxuan - diffNum_duo
            var queType = '多选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_duo, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_duo, curName, queType, examId, classId)
        }
        if(tiankong){
            var diffNum_tian = parseInt(tiankong * 0.1)
            var simpleNum_tian = tiankong - diffNum_tian
            var queType = '填空'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_tian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_tian, curName, queType, examId, classId)
        }
        if(jisuan){
            var diffNum_ji = parseInt(jisuan * 0.1)
            var simpleNum_ji = jisuan - diffNum_ji
            var queType = '计算'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_ji, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_ji, curName, queType, examId, classId)
        }
        if(wenda){
            var diffNum_wen = parseInt(wenda * 0.1)
            var simpleNum_wen = wenda - diffNum_wen
            var queType = '问答'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_wen, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_wen, curName, queType, examId, classId)
        }
        if(biancheng){
            var diffNum_bian = parseInt(biancheng * 0.1)
            var simpleNum_bian = biancheng - diffNum_bian
            var queType = '编程'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_bian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_bian, curName, queType, examId, classId)
        }
    }

    // todo 中等难度  难度<=3的题目占70% ，难度>=4的题目占30%
    if(totalDifficulty == '中等'){
        // todo 单选题
        if(danxuan){
            var diffNum_dan = parseInt(danxuan * 0.3)
            var simpleNum_dan = danxuan - diffNum_dan
            var queType = '单选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_dan, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_dan, curName, queType, examId, classId)
        }
        if(duoxuan){
            var diffNum_duo = parseInt(duoxuan * 0.3)
            var simpleNum_duo = duoxuan - diffNum_duo
            var queType = '多选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_duo, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_duo, curName, queType, examId, classId)
        }
        if(tiankong){
            var diffNum_tian = parseInt(tiankong * 0.3)
            var simpleNum_tian = tiankong - diffNum_tian
            var queType = '填空'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_tian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_tian, curName, queType, examId, classId)
        }
        if(jisuan){
            var diffNum_ji = parseInt(jisuan * 0.3)
            var simpleNum_ji = jisuan - diffNum_ji
            var queType = '计算'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_ji, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_ji, curName, queType, examId, classId)
        }
        if(wenda){
            var diffNum_wen = parseInt(wenda * 0.3)
            var simpleNum_wen = wenda - diffNum_wen
            var queType = '问答'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_wen, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_wen, curName, queType, examId, classId)
        }
        if(biancheng){
            var diffNum_bian = parseInt(biancheng * 0.3)
            var simpleNum_bian = biancheng - diffNum_bian
            var queType = '编程'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_bian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_bian, curName, queType, examId, classId)
        }
    }
    // todo 中等难度  难度<=3的题目占50% ，难度>=4的题目占50%
    if(totalDifficulty == '困难'){
        // todo 单选题
        if(danxuan){
            var diffNum_dan = parseInt(danxuan * 0.5)
            var simpleNum_dan = danxuan - diffNum_dan
            var queType = '单选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_dan, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_dan, curName, queType, examId, classId)
        }
        if(duoxuan){
            var diffNum_duo = parseInt(duoxuan * 0.5)
            var simpleNum_duo = duoxuan - diffNum_duo
            var queType = '多选'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_duo, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_duo, curName, queType, examId, classId)
        }
        if(tiankong){
            var diffNum_tian = parseInt(tiankong * 0.5)
            var simpleNum_tian = tiankong - diffNum_tian
            var queType = '填空'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_tian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_tian, curName, queType, examId, classId)
        }
        if(jisuan){
            var diffNum_ji = parseInt(jisuan * 0.5)
            var simpleNum_ji = jisuan - diffNum_ji
            var queType = '计算'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_ji, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_ji, curName, queType, examId, classId)
        }
        if(wenda){
            var diffNum_wen = parseInt(wenda * 0.5)
            var simpleNum_wen = wenda - diffNum_wen
            var queType = '问答'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_wen, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_wen, curName, queType, examId, classId)
        }
        if(biancheng){
            var diffNum_bian = parseInt(biancheng * 0.5)
            var simpleNum_bian = biancheng - diffNum_bian
            var queType = '编程'
            // todo 在题库中查询对应科目，难度与数量的题目
            difficultyQuestion(diffNum_bian, curName, queType, examId, classId)
            //simpleQuestion(simpleNum_bian, curName, queType, examId, classId)
        }
    }
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