var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')

/* GET home page. */
router.get('/', function(req, res, next) {
    getQuestionList(res);
});
async function getQuestionList(res){
    let result = await request('/question/question/getQuestion')
    res.render('questionQuery', {
        questionList:result.data
    });
}
module.exports = router;