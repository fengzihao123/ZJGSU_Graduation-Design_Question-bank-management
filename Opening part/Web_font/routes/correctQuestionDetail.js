var express = require('express');
const {request} = require("../public/javascripts/request");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let stuId = req.query.stuId
    localStorage.setItem('stuId', stuId)
    let examId = parseInt(localStorage.getItem('examId'))
    answerList(examId, stuId, res)
});
async function answerList(examId, stuId, res){
    let examList = await request('/exam/student/examDetail',{examId})
    let stuInfo = await request('/student/user/login',{stuId})
    let result_dan = await request('/exam/answer/getAnswer',{examId, stuId, queType:'单选'})
    let result_duo = await request('/exam/answer/getAnswer',{examId, stuId, queType:'多选'})
    let result_tian = await request('/exam/answer/getAnswer',{examId, stuId, queType:'填空'})
    let result_ji = await request('/exam/answer/getAnswer',{examId, stuId, queType:'计算'})
    let result_wen = await request('/exam/answer/getAnswer',{examId, stuId, queType:'问答'})
    let result_bian = await request('/exam/answer/getAnswer',{examId, stuId, queType:'编程'})
    res.render('correctQuestionDetail', {
        danList:result_dan.data,
        duoList:result_duo.data,
        tianList:result_tian.data,
        jiList:result_ji.data,
        wenList:result_wen.data,
        bianList:result_bian.data,
        stuInfo:stuInfo.data,
        examList:examList.data,
        index:0,
        questionList:[{
            stem:'Internet中发送邮件协议是( )',
            queType:'单选',
            myAnswer:'B'
        }],
        examDetail:[{
            DanXScore:2
        }]
    })
}


module.exports = router;