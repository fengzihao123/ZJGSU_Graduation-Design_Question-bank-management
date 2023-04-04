const { successModel } = require("../model/responseModel");
const {getTeacherLoginResult} = require('../controllers/teacher')

//处理教师相关的路由
const handleTeacherRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    

    if(method === 'GET' && req.path === '/teacher/user/login'){
        const teaId = req.query.teaId || '';
        const teaPwd = req.query.teaPwd || '';
        const teacherLoginData = getTeacherLoginResult(teaId, teaPwd);
        return new successModel(teacherLoginData)
    }
}

module.exports = handleTeacherRoute;