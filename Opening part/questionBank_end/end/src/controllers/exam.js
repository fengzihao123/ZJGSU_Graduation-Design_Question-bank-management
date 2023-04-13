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

// 教师考试列表查询
const getExamListTeacher = (teaId, teacherStatus) =>{
    //从数据库拿数据
    let sql = `select * from exam where`;
    if(teaId){
        sql += ` teaId='${teaId}'`;
    }
    if(teacherStatus){
        sql += ` and teacherStatus=${teacherStatus}`;
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

// 考试题目查询
const getExamQuestion = (classId, examId) =>{
    let sql = `select * from questioning where`;
    if(classId){
        sql += ` classId=${classId}`
    }
    if(examId){
        sql += ` and examId=${examId}`
    }
    return execSQL(sql)
}

//考试答案上传
const postAnswer = (examQuestionData) =>{
    //将数据存到数据库中
    const classId = examQuestionData.classId
    const examId = examQuestionData.examId
    const stuId = examQuestionData.stuId
    const queId = examQuestionData.queId
    const queType = examQuestionData.queType
    
    const sql = `
    insert into answer (classId, examId, stuId, queId, queType) values (${classId}, ${examId}, '${stuId}', ${queId}, '${queType}')
    `
    return execSQL(sql).then(insertedResult => {
        console.log(insertedResult)
        return{
            classId: insertedResult.insertclassId,
            examId: insertedResult.insertexamId
        }
    })

}

// 考试答案查询
const getExamAnswer = (examId, stuId) =>{
    let sql = `select * from answer where`;
    if(examId){
        sql += ` examId=${examId}`
    }
    if(stuId){
        sql += ` and stuId='${stuId}'`
    }
    return execSQL(sql)
}

//更新答案
const updateAnswer = (id, examQuestionData = {}) =>{

    const answer = examQuestionData.answer

    const sql = `update answer set answer='${answer}' where id=${id}`
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
    getExamDetail,
    getExamQuestion,
    postAnswer,
    updateAnswer,
    getExamAnswer,
    getExamListTeacher
}