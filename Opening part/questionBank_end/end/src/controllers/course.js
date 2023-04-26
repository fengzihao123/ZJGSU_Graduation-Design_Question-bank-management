const {execSQL} = require('../db/mysql')
// 跟课程相关的方法

// 课程列表查询
const getCourseList = (stuId, term, curName) =>{

    let sql = `select * from curriculum where`;
    if(stuId){
        sql += ` stuId='${stuId}'`
    }
    if(term){
        sql += ` and term='${term}'`
    }
    if(curName){
        sql += ` and curName='${curName}'`
    }
    return execSQL(sql)
}

// 教师课程列表查询
const getTeacherCourseList = (teaId, classId, curName) =>{

    let sql = `select * from teacherDetail where`;
    if(teaId){
        sql += ` teaId='${teaId}'`
    }
    if(classId){
        sql += ` and classId=${classId}`
    }
    if(curName){
        sql += ` and curName='${curName}'`
    }
    return execSQL(sql)
}

// 教师课程列表查询
const getTeacherCourseList1 = (curName, classId) =>{

    let sql = `select * from curriculum where`;
    if(curName){
        sql += ` curName='${curName}'`
    }
    if(classId){
        sql += ` and classId=${classId}`
    }
    return execSQL(sql)
}

// 课程信息查询
const getCourseDetail = (stuId, curName) =>{

    let sql = `select * from curriculum where`;
    if(stuId){
        sql += ` stuId='${stuId}'`
    }
    if(curName){
        sql += ` and curName='${curName}'`
    }
    return execSQL(sql)
}

// 课程信息查询---不重複
const getCourseDetailNoRepeat = (teaId) =>{

    let sql = `select distinct curName, curImage from teacherdetail where`;
    if(teaId){
        sql += ` teaId='${teaId}'`
    }
    return execSQL(sql)
}

//删除课程信息
const deleteCourseStudent = (id) =>{
    const sql = `delete from curriculum where id=${id}`;
    return execSQL(sql).then(deleteResult => {
        if(deleteResult.affectedRows > 0){
            return true;
        }
        return false
    })
}

//新建学生信息
const newCourseStudent = (courseData = {}) =>{

    const stuId = courseData.params.stuId
    const curName = courseData.params.curName
    const teaId = courseData.params.teaId
    const stuName = courseData.params.stuName
    const classId = courseData.params.classId
    const curImage = courseData.params.curImage
    const term = courseData.params.term
    console.log(stuId, curName, teaId, stuName, classId, curImage, term)
    const sql = `insert into curriculum (stuId, curName, teaId, stuName, classId, curImage, term) values 
    ('${stuId}', '${curName}', '${teaId}', '${stuName}', ${classId}, '${curImage}', '${term}')`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
    

}

// 课程章节查询
const getChapter = (curName) =>{

    let sql = `select * from chapter where`;
    if(curName){
        sql += ` curName='${curName}' order by id`
    }
    return execSQL(sql)
}
module.exports = {
    getCourseList,
    getCourseDetail,
    getTeacherCourseList,
    getTeacherCourseList1,
    deleteCourseStudent,
    newCourseStudent,
    getChapter,
    getCourseDetailNoRepeat
    // creatNewTeacher,
    // updateTeacher,
    // deleteTeacher
}