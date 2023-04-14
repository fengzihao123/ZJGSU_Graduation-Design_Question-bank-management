const { successModel, errorModel } = require("../model/responseModel");
const { getCourseList, 
        getCourseDetail,
        // creatNewTeacher, 
        // updateTeacher,
        // deleteTeacher
    } = require('../controllers/course')


//处理课程相关的路由
const handleCourseRoute = (req, res) =>{
    // 定义处理路由的逻辑
    const method = req.method;
    
    //课程列表查询/course/student/getCourseDetail
    if(method === 'GET' && req.path === '/course/student/getCourseList'){
        const stuId = req.query.stuId || '';
        const term = req.query.term || '';
        const courseListDataPromise = getCourseList(stuId, term);
        return courseListDataPromise.then(courseListData => {
            return new successModel(courseListData)
        })
    }

    if(method === 'GET' && req.path === '/course/student/getCourseList'){
        const stuId = req.query.stuId || '';
        const term = req.query.term || '';
        const courseListDataPromise = getCourseList(stuId, term);
        return courseListDataPromise.then(courseListData => {
            return new successModel(courseListData)
        })
    }

    //获取课程详情
    if(method === 'GET' && req.path === '/course/student/getCourseDetail'){
            const stuId = req.query.stuId || '';
            const curId = req.query.curId || '';
            const courseDetailDataPromise = getCourseDetail(stuId, curId);
            return courseDetailDataPromise.then(courseDetailData => {
                return new successModel(courseDetailData)
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

module.exports = handleCourseRoute;