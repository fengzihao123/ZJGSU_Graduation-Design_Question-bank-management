const { successModel, errorModel } = require("../model/responseModel");
const { getCourseList, 
        getCourseDetail,
        getTeacherCourseList,
        getTeacherCourseList1,
        deleteCourseStudent,
        newCourseStudent,
        getChapter,
        getCourseDetailNoRepeat
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

    //课程列表查询教师
    if(method === 'GET' && req.path === '/course/student/getTeacherCourseList'){
        const teaId = req.query.teaId || '';
        const classId = req.query.classId || '';
        const curName = req.query.curName || '';
        const courseListDataPromise = getTeacherCourseList(teaId, classId, curName);
        return courseListDataPromise.then(courseListData => {
            return new successModel(courseListData)
        })
    }

    //课程列表查询教师
    if(method === 'GET' && req.path === '/course/student/getTeacherCourseList1'){
        const curName = req.query.curName || '';
        const classId = req.query.classId || '';

        const courseListDataPromise = getTeacherCourseList1(curName, classId);
        return courseListDataPromise.then(courseListData => {
            return new successModel(courseListData)
        })
    }

    //获取课程详情
    if(method === 'GET' && req.path === '/course/student/getCourseDetail'){
            const stuId = req.query.stuId || '';
            const curName = req.query.curName || '';
            const courseDetailDataPromise = getCourseDetail(stuId, curName);
            return courseDetailDataPromise.then(courseDetailData => {
                return new successModel(courseDetailData)
            })
        }

        //获取课程详情--不重复
    if(method === 'GET' && req.path === '/course/student/getCourseDetailNoRepeat'){
        const teaId = req.query.teaId || '';
        const courseDetailDataPromise = getCourseDetailNoRepeat(teaId);
        return courseDetailDataPromise.then(courseDetailData => {
            return new successModel(courseDetailData)
        })
    }

   //删除课程信息
   if(method === 'POST' && req.path === '/course/student/deleteCourseStudent'){
    const id = req.query.id || '';
    const deleteCourseDataPromise = deleteCourseStudent(id)
    return deleteCourseDataPromise.then(deleteCourseData =>{
        if(deleteCourseData){
            return new successModel('删除成功')
        }else{
            return new errorModel('删除失败')
        }
    })
}

    //新增学生信息
    if(method === 'POST' && req.path === '/course/student/newCourseStudent'){
        const courseData = req.body;
        const newCourseDataPromise = newCourseStudent(courseData);
        return newCourseDataPromise.then(newCourseData => {
            return new successModel(newCourseData)
        })
    }

    //章节信息查询
    if(method === 'GET' && req.path === '/course/student/getChapter'){
        const curName = req.query.curName || '';

        const courseListDataPromise = getChapter(curName);
        return courseListDataPromise.then(courseListData => {
            return new successModel(courseListData)
        })
    }


}

module.exports = handleCourseRoute;