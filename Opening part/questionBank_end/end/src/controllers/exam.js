const {execSQL} = require('../db/mysql')
// 跟考试相关的方法

// 考试列表查询
const getExamList = (classId, curId, schoolTerm) =>{
    //从数据库拿数据
    let sql = `select * from exam where`;
    if(classId){
        sql += ` classId='${classId}'`;
    }
    if(curId){
        sql += ` and curId='${curId}'`;
    }
    if(schoolTerm){
        sql += ` and schoolTerm='${schoolTerm}'`;
    }
    return execSQL(sql)
}

// 考试详情查询
const getExamDetail = (examId) =>{
    let sql = `select * from exam where`;
    if(examId){
        sql += ` examId=${examId}`
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
    getExamList,
    getExamDetail
}