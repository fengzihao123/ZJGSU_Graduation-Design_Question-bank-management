var express = require('express');
const {request} = require("../public/javascripts/request");
const {LocalStorage} = require("node-localstorage");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    getExamList(teaId, res)
});

//todo 考试列表获取
async function getExamList(teaId, res){
    let result = await request('/exam/student/getExamListTeacher',{teaId})
    res.render('gradeQuery', {
        examList:result.data
    })
}

module.exports = router;