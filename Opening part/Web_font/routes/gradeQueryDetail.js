var express = require('express');
const {request} = require("../public/javascripts/request");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let stuId = req.query.stuId
    let examId = parseInt(localStorage.getItem('examId'))
    getGradeList(stuId, examId, res)

});
async function getGradeList(stuId, examId, res){
    let result = await request('/grade/student/getGrade',{stuId, examId})
    let scoreList = []
    let queTypeList = []
    if(result.data[0].danxuan !== 0){
        scoreList.push(result.data[0].danxuan)
        queTypeList.push('单选题')
    }
    if(result.data[0].duoxuan !== 0){
        scoreList.push(result.data[0].duoxuan)
        queTypeList.push('多选题')
    }
    if(result.data[0].tiankong !== 0){
        scoreList.push(result.data[0].tiankong)
        queTypeList.push('填空题')
    }
    if(result.data[0].jisuan !== 0){
        scoreList.push(result.data[0].jisuan)
        queTypeList.push('计算题')
    }
    if(result.data[0].wenda !== 0){
        scoreList.push(result.data[0].wenda)
        queTypeList.push('问答题')
    }
    if(result.data[0].biancheng !== 0){
        scoreList.push(result.data[0].biancheng)
        queTypeList.push('编程题')
    }
    console.log(scoreList,queTypeList)
    res.render('gradeQueryDetail',{
        scoreList:scoreList,
        queTypeList:queTypeList
    })
}


module.exports = router;