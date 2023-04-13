var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
var LocalStorage = require('node-localstorage').LocalStorage
const {storage} = require("debug");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/main', function(req, res, next) {
  let postData = req.body
  var teaId = postData.teaId
  var teaPwd = postData.teaPwd
  getTeacherLogin(teaId, teaPwd, res)
});

async function getTeacherLogin(teaId, teaPwd, res){
  let result = await request('/teacher/user/login',{teaId:teaId,teaPwd:teaPwd})
  localStorage = new LocalStorage('./scratch');
  if(result.data.length > 0){
    localStorage.setItem('teaInfo',JSON.stringify(result.data))
    console.log('登录成功')
    res.render("main", {
      teaInfo:result.data
    })
  }else {
    console.log('登录失败')
  }
}
module.exports = router;
