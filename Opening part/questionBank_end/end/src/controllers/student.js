const {execSQL} = require('../db/mysql')
// 跟学生相关的方法

// 学生登录接口
const getStudentLoginResult = (stuId, stuPwd, classId) =>{
    //从数据库拿数据
    let sql = `select * from student where`;
    if(stuId){
        sql += ` stuId='${stuId}'`;
    }
    if(classId){
        sql += ` classId=${classId}`;
    }
    if(stuPwd){
        sql += ` and stuPwd='${stuPwd}'`;
    }
    return execSQL(sql)
}

// 学生班级查询
const getClassInfo = (classId, className) =>{
    let sql = `select * from class where `
    if(classId){
        sql += `classId=${classId}`
    }
    if(className){
        sql += `className='${className}'`
    }
    return execSQL(sql)
}

// 学生信息查询
const getStudentDetail = (stuId) =>{
    let sql = `select * from student where `;
    if(stuId){
        sql += `stuId='${stuId}'`
    }
    return execSQL(sql)
}

//新增教师信息
const creatNewTeacher = (teacherData) =>{
    //将数据存到数据库中
    const teaId = teacherData.teaId
    const teaPwd = teacherData.teaPwd
    const teaName = teacherData.teaName
    const gender = teacherData.gender
    const phoneNum = teacherData.phoneNum
    const createAt = Date.now()

    const sql = `
    insert into teacher (teaId, teaPwd, teaName, gender, phoneNum, createAt) values ('${teaId}', '${teaPwd}', '${teaName}', ${gender}, '${phoneNum}', ${createAt})
    `
    return execSQL(sql).then(insertedResult => {
        console.log(insertedResult)
        return{
            teaId: insertedResult.insertteaId
        }
    })

}

//更新教师信息
const updateTeacher = (teaId, teacherData = {}) =>{

    const teaPwd = teacherData.teaPwd
    const teaName = teacherData.teaName
    const gender = teacherData.gender
    const phoneNum = teacherData.phoneNum
    const createAt = Date.now()
    const sql = `update teacher set teaPwd='${teaPwd}', teaName='${teaName}', gender=${gender}, phoneNum='${phoneNum}', createAt=${createAt} where teaId='${teaId}'`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
    

}

//删除教师信息
const deleteTeacher = (teaId) =>{
    const sql = `delete from teacher where teaId='${teaId}'`;
    return execSQL(sql).then(deleteResult => {
        if(deleteResult.affectedRows > 0){
            return true;
        }
        return false
    })
}
module.exports = {
    getStudentLoginResult,
    getClassInfo,
    getStudentDetail
}