
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
    localStorage = new LocalStorage('./scratch');
    var filePath = localStorage.getItem('filePath')
    console.log(filePath)
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
