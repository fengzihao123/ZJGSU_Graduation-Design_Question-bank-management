const {execSQL} = require('../db/mysql')
// 跟题库相关的方法

//题库收藏查询
const getQuestionCollect = (stuId) =>{
    //从数据库拿数据
    let sql = `select * from collect where`;
    if(stuId){
        sql += ` stuId='${stuId}' and isCollect=1`;
    }
    return execSQL(sql)
}

//题库错题查询
const getQuestionError = (stuId) =>{
    //从数据库拿数据
    let sql = `select * from error where`;
    if(stuId){
        sql += ` stuId='${stuId}'`;
    }
    return execSQL(sql)
}


//取消收藏
const cancleCollect = (stuId, queId, questionData) =>{
    //将数据存到数据库中
    const isCollect = questionData.isCollect
    const sql = `update collect set isCollect=${isCollect} where stuId='${stuId}' and queId=${parseInt(queId)}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 

}

//收藏
const Collect = (stuId, queId, questionData) =>{
    //将数据存到数据库中
    const isCollect = questionData.isCollect
    const sql = `update collect set isCollect=${isCollect} where stuId='${stuId}' and queId=${parseInt(queId)}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
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
    getQuestionCollect,
    getQuestionError,
    cancleCollect,
    Collect
}