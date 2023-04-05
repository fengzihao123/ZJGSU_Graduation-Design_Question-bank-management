const {execSQL} = require('../db/mysql')
// 跟教师相关的方法

// 教师登录接口
const getTeacherLoginResult = (teaId, teaPwd) =>{
    //从数据库拿数据
    let sql = `select * from teacher where`;
    if(teaId){
        sql += ` teaId='${teaId}'`;
    }
    if(teaPwd){
        sql += ` and teaPwd='${teaPwd}'`;
    }
    return execSQL(sql)
}

// 教师信息查询
const getTeacherDetail = (teaId) =>{
    let sql = `select * from teacher where `;
    if(teaId){
        sql += `teaId='${teaId}'`
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
const updateTeacher = (teacherData = {}) =>{
    return true;
}

//删除教师信息
const deleteTeacher = (teaId) =>{
    return true;
}
module.exports = {
    getTeacherLoginResult,
    getTeacherDetail,
    creatNewTeacher,
    updateTeacher,
    deleteTeacher
}