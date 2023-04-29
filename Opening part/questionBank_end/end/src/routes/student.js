const { successModel, errorModel } = require("../model/responseModel");
const { getStudentLoginResult,
        getClassInfo, 
        getStudentDetail,
        creatNewChallenge,
        getChallenge
        
    } = require('../controllers/student')


//处理学生相关的路由
const handleStudentRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //学生登录
    if(method === 'GET' && req.path === '/student/user/login'){ 
        const stuId = req.query.stuId || '';
        const stuPwd = req.query.stuPwd || '';
        const classId = req.query.classId || '';
        const studentLoginDataPromise = getStudentLoginResult(stuId, stuPwd, classId);
        return studentLoginDataPromise.then(studentLoginData => {
            return new successModel(studentLoginData)
        })
    }

    //学生班级查询
    if(method === 'GET' && req.path === '/student/user/class'){ 
        const classId = req.query.classId || '';
        const className = req.query.className || '';
        const studentClassDataPromise = getClassInfo(classId, className);
        return studentClassDataPromise.then(studentClassData => {
            return new successModel(studentClassData)
        })
    }

    //学生信息查询
    if(method === 'GET' && req.path === '/student/user/userInfo'){
        const stuId = req.query.stuId || '';
        const studentDetailDataPromise = getStudentDetail(stuId);
        return studentDetailDataPromise.then(studentDetailData => {
            return new successModel(studentDetailData)
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

        const updateTeacherDataPromise = updateTeacher(teaId, teacherData);
        return updateTeacherDataPromise.then(updateTeacherData => {
            if(updateTeacherData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }
    
    //插入十秒挑战
    if(method === 'POST' && req.path === '/challenge/socre/newScore'){
        const challengeData = req.body;
        const newChallengeDataPromise = creatNewChallenge(challengeData);
        return newChallengeDataPromise.then(challengeData => {
            return new successModel(challengeData)
        })
    }

    //查询十秒挑战
    if(method === 'GET' && req.path === '/challenge/socre/getScore'){

        const stuId = req.query.stuId || '';
        const curName = req.query.curName || '';
        const newChallengeDataPromise = getChallenge(stuId, curName);
        return newChallengeDataPromise.then(challengeData => {
            return new successModel(challengeData)
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

module.exports = handleStudentRoute;