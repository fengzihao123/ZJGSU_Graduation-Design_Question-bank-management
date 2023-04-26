var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
var LocalStorage = require('node-localstorage').LocalStorage
const {storage} = require("debug");
const fs = require("fs");
const path = require("path");
/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))
    let teaInfo = JSON.parse(localStorage.getItem('teaInfo'))
    let teaId = teaInfo[0].teaId
    exportDOCX(examId, classId, teaId)

});

    async function exportDOCX(examId, classId, teaId){
        let resultDan = await request('/exam/student/getExamQuestion',{classId, examId, queType:'单选'})
        let resultDuo = await request('/exam/student/getExamQuestion',{classId, examId, queType:'多选'})
        let resultTian = await request('/exam/student/getExamQuestion',{classId, examId, queType:'填空'})
        let resultJi = await request('/exam/student/getExamQuestion',{classId, examId, queType:'计算'})
        let resultWen = await request('/exam/student/getExamQuestion',{classId, examId, queType:'问答'})
        let resultBian = await request('/exam/student/getExamQuestion',{classId, examId, queType:'编程'})
        let examDetail = await request('/exam/student/getExamListTeacher',{teaId, examId})
        let isDan = false;
        let isDuo = false;
        let isTian = false;
        let isJi = false;
        let isWen = false;
        let isBian = false;
        if (resultDan.data.length > 0){
            isDan = true
        }
        if (resultDuo.data.length > 0){
            isDuo = true
        }
        if(resultTian.data.length > 0){
            isTian = true
        }
        if(resultJi.data.length > 0){
            isJi = true
        }
        if(resultWen.data.length > 0){
            isWen = true
        }
        if(resultBian.data.length > 0){
            isBian = true
        }
        const fs = require("fs");
        const path = require("path");
        const content = fs.readFileSync(
            path.resolve(__dirname, "../public/example/input.docx"),
            "binary"
        );
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render({
            curName: examDetail.data[0].curName,
            examType:examDetail.data[0].examType,
            danList:resultDan.data,
            duoList:resultDuo.data,
            tianList:resultTian.data,
            jiList:resultJi.data,
            wenList:resultWen.data,
            bianList:resultBian.data,
            isDan:isDan,
            isDuo:isDuo,
            isTian:isTian,
            isJi:isJi,
            isWen:isWen,
            isBian:isBian
        });
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        fs.writeFileSync(path.resolve(__dirname, "../public/example/output.docx"), buf);
    }

module.exports = router;
