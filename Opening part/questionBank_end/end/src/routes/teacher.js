const { successModel } = require("../model/responseModel");
const {getTeacherLoginResult, getTeacherDetail} = require('../controllers/teacher')

//处理教师相关的路由
const handleTeacherRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //教师登录
    if(method === 'GET' && req.path === '/teacher/user/login'){
        const teaId = req.query.teaId || '';
        const teaPwd = req.query.teaPwd || '';
        const teacherLoginData = getTeacherLoginResult(teaId, teaPwd);
        return new successModel(teacherLoginData)
    }

    //教师信息查询
    if(method === 'GET' && req.path === '/teacher/user/userInfo'){
        const teaId = req.query.teaId || '';
        const teacherDetailData = getTeacherDetail(teaId);
        return new successModel(teacherDetailData)
    }
}

module.exports = handleTeacherRoute;