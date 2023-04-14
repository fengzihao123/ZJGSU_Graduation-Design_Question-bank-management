var express = require('express');
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
const {LocalStorage} = require("node-localstorage");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    let examId = parseInt(localStorage.getItem('examId'))
    let postData = req.body
    let duration = postData.duration
    let totalPoint    = postData.totalPoint
    let danxuan       = postData.danxuan
    let DanXScore    = postData.DanXScore
    let duoxuan    = postData.duoxuan
    let DuoXScore    = postData.DuoXScore
    let tiankong    = postData.tiankong
    let TKScore    = postData.DuoXScore
    let jisuan    = postData.jisuan
    let JSScore    = postData.JSScore
    let wenda = postData.wenda
    let WDScore     = postData.WDScore
    let biancheng = postData.biancheng
    let BCScore     = postData.BCScore
    console.log(duration, totalPoint, danxuan, DanXScore, duoxuan, DuoXScore, tiankong, TKScore, jisuan, JSScore, wenda, WDScore, biancheng, BCScore)
    getExamList(teaId, examId, duration, totalPoint, danxuan, DanXScore, duoxuan, DuoXScore, tiankong, TKScore, jisuan, JSScore, wenda, WDScore, biancheng, BCScore, res)
});

async function getExamList(teaId, examId, duration, totalPoint, danxuan, DanXScore, duoxuan, DuoXScore, tiankong, TKScore, jisuan, JSScore, wenda, WDScore, biancheng, BCScore, res){
    await upload('/exam/student/updateExam?examId=' + examId,{duration, totalPoint, status:1, teacherStatus:1, danxuan, DanXScore, duoxuan, DuoXScore, tiankong, TKScore, jisuan, JSScore, wenda, WDScore, biancheng, BCScore})
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