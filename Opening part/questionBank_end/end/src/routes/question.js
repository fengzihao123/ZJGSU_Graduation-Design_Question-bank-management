const { successModel, errorModel } = require("../model/responseModel");
const { getQuestionCollect,
        getQuestionError,
        cancleCollect,
        Collect,
        cancleError,
        Error,
        AddCollect
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

    //教师信息更新
    if(method === 'POST' && req.path === '/teacher/user/userInfoUpdate'){
        const teaId = req.query.teaId || '';
        const teacherData = req.body;

        const updateTeacherDataPromise = updateTeacher(teaId, teacherData);
        return updateTeacherDataPromise.then(updateTeacherData => {
            if(updateTeacherData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }

    //删除教师
    if(method === 'POST' && req.path === '/teacher/user/deleteUserInfo'){
        const teaId = req.query.teaId || '';
        const deleteTeacherDataPromise = deleteTeacher(teaId)
        return deleteTeacherDataPromise.then(deleteTeacherData =>{
            if(deleteTeacherData){
                return new successModel('删除成功')
            }else{
                return new errorModel('删除失败')
            }
        })
    }

}

module.exports = handleQuestionRoute;