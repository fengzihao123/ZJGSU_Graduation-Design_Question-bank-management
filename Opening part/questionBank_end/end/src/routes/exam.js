const { successModel, errorModel } = require("../model/responseModel");
const { getExamList,
        getExamDetail,
        getExamQuestion,
        postAnswer,
        updateAnswer,
        getExamAnswer,
        getExamListTeacher
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

    //教师考试列表查询
    if(method === 'GET' && req.path === '/exam/student/getExamListTeacher'){
        const teaId = req.query.teaId || '';
        const teacherStatus = req.query.teacherStatus || '';
        const examListDataPromise = getExamListTeacher(teaId, teacherStatus);
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

    //考试题目查询
    if(method === 'GET' && req.path === '/exam/student/getExamQuestion'){
        const classId = req.query.classId || '';
        const examId = req.query.examId || '';
        const examQuestionDataPromise = getExamQuestion(classId, examId);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //学生答案上传
    if(method === 'POST' && req.path === '/exam/answer/postAnswer'){
        const examQuestionData = req.body;
        const examQuestionDataPromise = postAnswer(examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //考试答案查询
    if(method === 'GET' && req.path === '/exam/answer/getAnswer'){
        const examId = req.query.examId || '';
        const stuId = req.query.stuId || '';
        const examAnswerDataPromise = getExamAnswer(examId, stuId);
        return examAnswerDataPromise.then(examAnswerData => {
            return new successModel(examAnswerData)
        })
    }

    //学生答案更新
    if(method === 'POST' && req.path === '/exam/answer/updateAnswer'){
        const id = req.query.id || '';
        const examQuestionData = req.body;

        const examQuestionDataPromise = updateAnswer(id, examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
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