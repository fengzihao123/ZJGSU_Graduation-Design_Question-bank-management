const { successModel, errorModel } = require("../model/responseModel");
const { 
    getGrade, 
    creatNewGrade,
    getGradeTeacher
    } = require('../controllers/grade')


//处理成绩相关的路由
const handleGradeRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //成绩查询
    if(method === 'GET' && req.path === '/grade/student/getGrade'){ 
        const stuId = req.query.stuId || '';
        const examId = req.query.examId || '';
        const curName = req.query.curName || '';
        const gradeDataPromise = getGrade(stuId, examId, curName);
        return gradeDataPromise.then(gradeData => {
            return new successModel(gradeData)
        })
    }

     //成绩查询教师
     if(method === 'GET' && req.path === '/grade/student/getGradeTeacher'){ 
        const examId = req.query.examId || '';
        const gradeDataPromise = getGradeTeacher(examId);
        return gradeDataPromise.then(gradeData => {
            return new successModel(gradeData)
        })
    }

     //新增成绩
     if(method === 'POST' && req.path === '/grade/student/newGrade'){
        const gradeData = req.body;
        const gradeDataPromise = creatNewGrade(gradeData);
        return gradeDataPromise.then(gradeData => {
            return new successModel(gradeData)
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

module.exports = handleGradeRoute;