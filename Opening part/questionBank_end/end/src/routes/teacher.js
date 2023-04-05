const { successModel, errorModel } = require("../model/responseModel");
const { getTeacherLoginResult, 
        getTeacherDetail,
        creatNewTeacher, 
        updateTeacher,
        deleteTeacher
    } = require('../controllers/teacher')


//处理教师相关的路由
const handleTeacherRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //教师登录
    if(method === 'GET' && req.path === '/teacher/user/login'){ 
        const teaId = req.query.teaId || '';
        const teaPwd = req.query.teaPwd || '';
        const teacherLoginDataPromise = getTeacherLoginResult(teaId, teaPwd);
        return teacherLoginDataPromise.then(teacherLoginData => {
            return new successModel(teacherLoginData)
        })
    }

    //教师信息查询
    if(method === 'GET' && req.path === '/teacher/user/userInfo'){
        const teaId = req.query.teaId || '';
        const teacherDetailDataPromise = getTeacherDetail(teaId);
        return teacherDetailDataPromise.then(teacherDetailData => {
            return new successModel(teacherDetailData)
        })
    }

    //新增教师
    if(method === 'POST' && req.path === '/teacher/user/newUserInfo'){
        const teacherData = req.body;
        const newTeacherDataPromise = creatNewTeacher(teacherData);
        return newTeacherDataPromise.then(newTeacherData => {
            return new successModel(newTeacherData)
        })
    }

    //教师信息更新
    if(method === 'POST' && req.path === '/teacher/user/userInfoUpdate'){
        const teaId = req.query.teaId || '';
        const teacherData = req.body;
        const updateTeacherData = updateTeacher(teaId, teacherData);
        if(updateTeacherData){
            return new successModel('更新成功')
        }else{
            return new errorModel('更新失败')
        }
    }

    //删除教师
    if(method === 'POST' && req.path === '/teacher/user/deleteUserInfo'){
        const teaId = req.query.teaId || '';
        const deleteTeacherData = deleteTeacher(teaId)
        if(deleteTeacherData){
            return new successModel('删除成功')
        }else{
            return new errorModel('删除失败')
        }
    }

}

module.exports = handleTeacherRoute;