const { successModel, errorModel } = require("../model/responseModel");
const { getExamList,
        getExamDetail,
        getExamQuestion,
        postAnswer,
        updateAnswer,
        getExamAnswer,
        getExamListTeacher,
        newExam,
        newExamQuestion,
        deleteExamQuestion,
        updateExam,
        updateAnswerPoint,
        updateExamQuestion,
        getExamQuestionTOP,
        getExamQuestionRepeat,
        postRepeat,
        getRepeat,
        updateRepeat,
        getExamQuestionExcept,
        deleteRpeat,
        getMoban,
        deleteExam
    } = require('../controllers/exam')


//处理考试相关的路由
const handleExamRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //考试列表
    if(method === 'GET' && req.path === '/exam/student/getExamList'){
        const classId = req.query.classId || '';
        const schoolTerm = req.query.schoolTerm || '';
        const curName = req.query.curName || '';
        const examListDataPromise = getExamList(classId, curName, schoolTerm);
        return examListDataPromise.then(examListData => {
            return new successModel(examListData)
        })
    }

    //教师考试列表查询
    if(method === 'GET' && req.path === '/exam/student/getExamListTeacher'){
        const teaId = req.query.teaId || '';
        const examId = req.query.examId || '';
        const teacherStatus = req.query.teacherStatus || '';
        const examListDataPromise = getExamListTeacher(teaId, examId, teacherStatus);
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
        const queType = req.query.queType || '';
        const queId = req.query.queId || '';
        const examQuestionDataPromise = getExamQuestion(classId, examId, queType, queId);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //考试题目查询-除了exmaId！=
    if(method === 'GET' && req.path === '/exam/student/getExamQuestionExcept'){
        const examId = req.query.examId || '';
        const curName = req.query.curName || '';
        const examQuestionDataPromise = getExamQuestionExcept(examId, curName);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //考试题目查询--重复度
    if(method === 'GET' && req.path === '/exam/student/getRepeat'){
        const examId = req.query.examId || '';

        const examQuestionDataPromise = getRepeat(examId);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //重复度--新建
    if(method === 'POST' && req.path === '/exam/answer/postRepeat'){
        const examQuestionData = req.body;
        const examQuestionDataPromise = postRepeat(examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //查询--重复度
    if(method === 'GET' && req.path === '/exam/student/getExamQuestionRepeat'){
        const curName = req.query.curName || '';
        const queType = req.query.queType || '';

        const examQuestionDataPromise = getExamQuestionRepeat(queType, curName);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

     //更新重复度
     if(method === 'POST' && req.path === '/exam/student/updateRepeat'){
        const examId = req.query.examId || '';
        const examQuestionData = req.body;
        const examQuestionDataPromise = updateRepeat(examId, examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
    }

    //考试题目错题最多5个
    if(method === 'GET' && req.path === '/exam/student/getExamQuestionTOP'){
        const examId = req.query.examId || '';
        const examQuestionDataPromise = getExamQuestionTOP(examId);
        return examQuestionDataPromise.then(examQuestionData => {
            return new successModel(examQuestionData)
        })
    }

    //新增考试题目
    if(method === 'POST' && req.path === '/exam/student/newExamQuestion'){
        const examQuestionData = req.body;
        const examQuestionDataPromise = newExamQuestion(examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
    }

     //更新考试题目错误数
     if(method === 'POST' && req.path === '/exam/student/updateExamQuestionCount'){
        const id = req.query.id || '';
        const examQuestionData = req.body;
        const examQuestionDataPromise = updateExamQuestion(id, examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
    }

    //删除考试题目
    if(method === 'POST' && req.path === '/exam/student/deleteExamQuestion'){
        const id = req.query.id || '';
        const examQuestionDataPromise = deleteExamQuestion(id);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
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
        const queType = req.query.queType || '';
        const examAnswerDataPromise = getExamAnswer(examId, stuId, queType);
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
    
    //学生答案分数更新
    if(method === 'POST' && req.path === '/exam/answer/updateAnswerPoint'){
        const id = req.query.id || '';
        const examQuestionData = req.body;

        const examQuestionDataPromise = updateAnswerPoint(id, examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
    }

    //新增考试
    if(method === 'POST' && req.path === '/exam/student/newExam'){
        const examQuestionData = req.body;
        const examQuestionDataPromise = newExam(examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }

    //修改考试
    if(method === 'POST' && req.path === '/exam/student/updateExam'){
        const examId = req.query.examId || '';
        const examQuestionData = req.body;
        const examQuestionDataPromise = updateExam(examId, examQuestionData);
        return examQuestionDataPromise.then(examQuestionData => {
            if(examQuestionData){
                return new successModel('更新成功')
            }else{
                return new errorModel('更新失败')
            }
        })
        
    }
    

    //删除教师
    if(method === 'POST' && req.path === '/exam/student/deleteRepeat'){
        const examId = req.query.examId || '';
        const deleteTeacherDataPromise = deleteRpeat(examId)
        return deleteTeacherDataPromise.then(deleteTeacherData =>{
            if(deleteTeacherData){
                return new successModel('删除成功')
            }else{
                return new errorModel('删除失败')
            }
        })
    }

    //模板查询查询
    if(method === 'GET' && req.path === '/exam/moban/getMoban'){
        const moName = req.query.moName || '';
        const curName = req.query.curName || '';

        const examAnswerDataPromise = getMoban(moName, curName);
        return examAnswerDataPromise.then(examAnswerData => {
            return new successModel(examAnswerData)
        })
    }

    //删除考试
    if(method === 'POST' && req.path === '/exam/student/deleteExam'){
        const examId = req.query.examId || '';
        const deleteTeacherDataPromise = deleteExam(examId)
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