var express = require('express');
const {LocalStorage} = require("node-localstorage");
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
const {isProxy} = require("vue");
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    let postData = req.body
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))

    let curName = localStorage.getItem('curName');

    let danxuan = parseInt(postData.danxuan) || 0;
    let duoxuan = parseInt(postData.duoxuan) || 0;
    let tiankong = parseInt(postData.tiankong) || 0;
    let jisuan = parseInt(postData.jisuan) || 0;
    let wenda = parseInt(postData.wenda) || 0;
    let biancheng = parseInt(postData.biancheng) || 0;

    //todo 重复数
    var totalNum = danxuan + duoxuan + tiankong + jisuan + wenda + biancheng;
    countRepeat(curName, examId, totalNum, classId, res, danxuan, duoxuan, tiankong, jisuan, wenda, biancheng)



});



async function countRepeat(curName, examId, totalNum, classId, res, danxuan, duoxuan, tiankong, jisuan, wenda, biancheng){
    var repeatNum = 0;
    //todo 查询到满足条件的对应数量的题目
    let nowList = await request('/exam/student/getExamQuestion',{examId})
    //todo 查询历年同科目同题型的题目，进行重复度对比
    let pastList = await request('/exam/student/getExamQuestionExcept',{examId, curName})
    for(var i = 0; i < nowList.data.length; i++){
        for(var j = 0; j < pastList.data.length; j++){
            if(nowList.data[i].queId == pastList.data[j].queId){
                repeatNum++
                break
            }
        }
    }
    var repeatPercent = parseFloat(repeatNum) / parseFloat(totalNum)

    res.render('makeQuestionAuto',{
        examId:examId,
        classId:classId,
        danxuan:danxuan,
        duoxuan:duoxuan,
        tiankong:tiankong,
        jisuan:jisuan,
        wenda:wenda,
        biancheng:biancheng,
        repeatPercent:repeatPercent
    })
}



module.exports = router;