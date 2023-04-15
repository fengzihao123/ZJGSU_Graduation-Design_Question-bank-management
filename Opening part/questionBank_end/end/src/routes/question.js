const { successModel, errorModel } = require("../model/responseModel");
const { getQuestionCollect,
        getQuestionError,
        cancleCollect,
        Collect,
        cancleError,
        Error,
        AddCollect,
        getQuestion,
        deleteQuestion,
        updateQuestion,
        newQuestion,
        getQuestionDetail,
        newError
    } = require('../controllers/question')


//处理题库相关的路由
const handleQuestionRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //题库收藏查询
    if(method === 'GET' && req.path === '/question/collect/getCollection'){ 
        const stuId = req.query.stuId || '';
        const questionCollectDataPromise = getQuestionCollect(stuId);
        return questionCollectDataPromise.then(questionCollectData => {
            return new successModel(questionCollectData)
        })
    }

    //题库错误查询
    if(method === 'GET' && req.path === '/question/errorQuestion/getError'){ 
        const stuId = req.query.stuId || '';
        const questionErrorDataPromise = getQuestionError(stuId);
        return questionErrorDataPromise.then(questionErrorData => {
            return new successModel(questionErrorData)
        })
    }

    //题库查询
    if(method === 'GET' && req.path === '/question/question/getQuestion'){ 
        const curName = req.query.curName || '';
        const queType = req.query.queType || '';
        const chaName = req.query.chaName || '';
        const difficulty = req.query.difficulty || '';
        const stem = req.query.stem || '';
        const questionDataPromise = getQuestion(curName, queType, chaName, difficulty, stem);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //题目详情查询
    if(method === 'GET' && req.path === '/question/question/getQuestionDetail'){ 
        const queId = req.query.queId || '';
        const questionDataPromise = getQuestionDetail(queId);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //取消收藏
    if(method === 'POST' && req.path === '/question/collect/deleteCollection'){
        const stuId = req.query.stuId || '';
        const queId = req.query.queId || '';
        const questionData = req.body;
        const questionDataPromise = cancleCollect(stuId, queId, questionData);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //取消错题
    if(method === 'POST' && req.path === '/question/errorQuestion/deleteError'){
        const stuId = req.query.stuId || '';
        const queId = req.query.queId || '';
        const questionData = req.body;
        const questionDataPromise = cancleError(stuId, queId, questionData);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //收藏
    if(method === 'POST' && req.path === '/question/collect/collect'){
        const stuId = req.query.stuId || '';
        const queId = req.query.queId || '';
        const questionData = req.body;
        const questionDataPromise = Collect(stuId, queId, questionData);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //新增收藏
    if(method === 'POST' && req.path === '/question/collect/newCollect'){
        const questionData = req.body;
        const questionDataPromise = AddCollect(questionData);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //错题
    if(method === 'POST' && req.path === '/question/errorQuestion/error'){
        const stuId = req.query.stuId || '';
        const queId = req.query.queId || '';
        const questionData = req.body;
        const questionDataPromise = Error(stuId, queId, questionData);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //新增错题
    if(method === 'POST' && req.path === '/question/errorQuestion/newError'){
        const questionData = req.body;
        const questionDataPromise = newError(questionData);
        return questionDataPromise.then(questionData => {
            return new successModel(questionData)
        })
    }

    //题库删除
    if(method === 'POST' && req.path === '/question/delete/question'){
        const queId = req.query.queId || '';
        const questionData = req.body;

        const questionDataPromise = deleteQuestion(queId, questionData);
        return questionDataPromise.then(questionData => {
            if(questionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }

    //题库修改
    if(method === 'POST' && req.path === '/question/update/question'){
        const queId = req.query.queId || '';
        const questionData = req.body;
        const questionDataPromise = updateQuestion(queId, questionData);
        return questionDataPromise.then(questionData => {
            if(questionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }

    //题库新增
    if(method === 'POST' && req.path === '/question/insert/question'){
        const questionData = req.body;
        const questionDataPromise = newQuestion(questionData);
        return questionDataPromise.then(questionData => {
            if(questionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }

}

module.exports = handleQuestionRoute;