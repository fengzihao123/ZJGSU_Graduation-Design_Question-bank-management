
var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
const {upload} = require('../public/javascripts/upload')
var LocalStorage = require('node-localstorage').LocalStorage
const {storage} = require("debug");
const path = require("path")
const fs = require("fs")
/* GET home page. */
router.get('/', function(req, res, next) {
    // localStorage = new LocalStorage('./scratch');
    // var filePath = localStorage.getItem('filePath')
    // console.log(filePath)
    // let file = path.join(__dirname,'../'+filePath);
    // console.log(file)
    // fs.readFile(file,'utf8',function (err,data){
    //     if(err){
    //         console.error(err)
    //     }
    //     var result = JSON.parse(data);
    //     for(var i = 0; i < result.length; i++){
    //         newQuestion(result[i])
    //     }
    // })

    localStorage = new LocalStorage('./scratch');
    var filePath = localStorage.getItem('filePath')
    let reg = /\..+/
    let fileType = filePath.match(reg)[0]
    if (fileType == '.txt'){
        let file = path.join(__dirname,'../'+filePath);
        console.log(file)
        fs.readFile(file,'utf8',function (err,data){
            if(err){
                console.error(err)
            }
            var reg_slice=/\d+\..+/
            let questionList = data.split('分割线')
            let question = {};
            for(var i = 0; i < questionList.length; i++){
                //todo 题干
                var reg_stem=/\d+\..+/;
                let result_stem = questionList[i].match(reg_stem)
                //题干后面的题目
                var reg_stem1 = /[^d+\.]*$/
                let stem_before = result_stem[0].match(reg_stem1)
                let stem = stem_before[0]
                question.stem = stem
                //todo 课程名
                var reg_curName = /课程名:.+/
                let result_curName = questionList[i].match(reg_curName)
                var reg_curName1 = /[^课程名:]*$/
                let curName_before = result_curName[0].match(reg_curName1)
                let curName = curName_before[0]
                question.curName = curName
                //todo choiceA
                var reg_choiceA = /A、.+/
                let result_choiceA = questionList[i].match(reg_choiceA)
                var reg_choiceA1 = /[^A、]*$/
                let choiceA_before = result_choiceA[0].match(reg_choiceA1)
                let choiceA = choiceA_before[0]
                question.choiceA = choiceA || '';
                //todo choiceB
                var reg_choiceB = /B、.+/
                let result_choiceB = questionList[i].match(reg_choiceB)
                var reg_choiceB1 = /[^B、]*$/
                let choiceB_before = result_choiceB[0].match(reg_choiceB1)
                let choiceB = choiceB_before[0]
                question.choiceB = choiceB || '';
                //todo choiceC
                var reg_choiceC = /C、.+/
                let result_choiceC = questionList[i].match(reg_choiceC)
                var reg_choiceC1 = /[^C、]*$/
                let choiceC_before = result_choiceC[0].match(reg_choiceC1)
                let choiceC = choiceC_before[0]
                question.choiceC = choiceC || '';
                //todo choiceD
                var reg_choiceD = /D、.+/
                let result_choiceD = questionList[i].match(reg_choiceD)
                var reg_choiceD1 = /[^A、]*$/
                let choiceD_before = result_choiceD[0].match(reg_choiceD1)
                let choiceD = choiceD_before[0]
                question.choiceD = choiceD || '';
                //todo 章节
                var reg_chaName = /章节:.+/
                let result_chaName = questionList[i].match(reg_chaName)
                var reg_chaName1 = /[^章节:]*$/
                let chaName_before = result_chaName[0].match(reg_chaName1)
                let chaName = chaName_before[0]
                question.chaName = chaName
                //todo 题型
                var reg_queType = /题型:.+/
                let result_queType = questionList[i].match(reg_queType)
                var reg_queType1 = /[^题型:]*$/
                let queType_before = result_queType[0].match(reg_queType1)
                let queType = queType_before[0]
                question.queType = queType

                //todo 难度
                var reg_difficulty = /难度:.+/
                let result_difficulty = questionList[i].match(reg_difficulty)
                var reg_difficulty1 = /[^难度:]*$/
                let difficulty_before = result_difficulty[0].match(reg_difficulty1)
                let difficulty = parseInt(difficulty_before[0])
                question.difficulty = difficulty

                //todo  答案
                var reg_answer = /答案:.+/
                let result_answer = questionList[i].match(reg_answer)
                var reg_answer1 = /[^答案:]*$/
                let answer_before = result_answer[0].match(reg_answer1)
                let answer = answer_before[0]
                question.answer = answer

                //todo  解析
                var reg_analysis = /解析:.+/
                let result_analysis = questionList[i].match(reg_analysis)
                var reg_analysis1 = /[^解析:]*$/
                let analysis_before = result_analysis[0].match(reg_analysis1)
                let analysis = analysis_before[0]
                question.analysis = analysis
                newQuestion(question)
            }
        })
    }
    if(fileType == '.json'){
        let file = path.join(__dirname,'../'+filePath);
        console.log(file)
        fs.readFile(file,'utf8',function (err,data){
            if(err){
                console.error(err)
            }
            var result = JSON.parse(data);
            for(var i = 0; i < result.length; i++){
                newQuestion(result[i])
            }
        })
    }


});
async function newQuestion(question){
    await upload('/question/insert/question',{
        curName:question.curName,
        stem:question.stem,
        choiceA:question.choiceA || '',
        choiceB:question.choiceB || '',
        choiceC:question.choiceC || '',
        choiceD:question.choiceD || '',
        chaName:question.chaName,
        queType:question.queType,
        difficulty:question.difficulty,
        answer:question.answer,
        analysis:question.analysis
    })
}
module.exports = router;
