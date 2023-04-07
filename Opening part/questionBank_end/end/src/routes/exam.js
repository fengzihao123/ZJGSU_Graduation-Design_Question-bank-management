const { successModel, errorModel } = require("../model/responseModel");
const { getExamList,
        getExamDetail,
    } = require('../controllers/exam')


//处理考试相关的路由
const handleExamRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //考试列表
    if(method === 'GET' && req.path === '/exam/student/getExamList'){
        const classId = req.query.classId || '';
        const schoolTerm = req.query.schoolTerm || '';
        const curId = req.query.curId || '';
        const examListDataPromise = getExamList(classId, curId, schoolTerm);
        return examListDataPromise.then(examListData => {
            return new successModel(examListData)
        })
    }

    //考试详情查询
    if(method === 'GET' && req.path === '/exam/student/examDetail'){
        const examId = req.query.examId || '';
        const examDetailDataPromise = getExamDetail(examId);
        return examDetailDataPromise.then(examDetailData => {
            return new successModel(examDetailData)
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

module.exports = handleExamRoute;