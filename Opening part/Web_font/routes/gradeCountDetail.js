var express = require('express');
const {request} = require("../public/javascripts/request");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.get('/', function(req, res, next) {
    let examId = parseInt(req.query.examId)
    console.log(examId)
    getGradeList(examId, res)

});
async function getGradeList(examId, res){
        let gradeList = await request('/grade/student/getGradeTeacher',{examId})
        let questionList = await  request('/exam/student/getExamQuestionTOP',{examId})
    var countData = []
    var value0_59 = 0;
    var value60_69 = 0;
    var value70_79 = 0;
    var value80_89 = 0;
    var value90_100 = 0;
    for(var i = 0; i < gradeList.data.length; i++){
        console.log(gradeList.data[i].score)
        if(gradeList.data[i].score < 60){
            value0_59++
        }else if(60 <= gradeList.data[i].score && gradeList.data[i].score < 70){
            value60_69++
        }else if(70 <= gradeList.data[i].score && gradeList.data[i].score < 80){
            value70_79++
        }else if(80 <= gradeList.data[i].score && gradeList.data[i].score < 90){
            value80_89++
        }else if(90 <= gradeList.data[i].score && gradeList.data[i].score <= 100){
            value90_100++
        }
        countData = [
            {value: value0_59, name:'0-59'},
            {value: value60_69, name:'60-69'},
            {value: value70_79, name:'70-79'},
            {value: value80_89, name:'80-89'},
            {value: value90_100, name:'90-100'},
        ]
    }
    console.log(countData)
    res.render('gradeCountDetail',{
        countData:countData,
        questionList:questionList.data,
    })
}


module.exports = router;