const {execSQL} = require('../db/mysql')
// 跟考试相关的方法

// 考试列表查询
const getExamList = (classId, curName, schoolTerm) =>{
    //从数据库拿数据
    let sql = `select * from exam where`;
    if(classId){
        sql += ` classId='${classId}'`;
    }
    if(curName){
        sql += ` and curName='${curName}'`;
    }
    if(schoolTerm){
        sql += ` and schoolTerm='${schoolTerm}'`;
    }
    return execSQL(sql)
}

// 教师考试列表查询
const getExamListTeacher = (teaId, examId, teacherStatus) =>{
    //从数据库拿数据
    let sql = `select * from exam where`;
    if(teaId){
        sql += ` teaId='${teaId}'`;
    }
    if(examId){
        sql += ` and examId=${examId}`;
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
const getExamQuestion = (classId, examId, queType, queId) =>{
    let sql = `select * from questioning where`;
    if(examId){
        sql += ` examId=${examId}`
    }
    if(classId){
        sql += ` and classId=${classId}`
    }
    if(queType){
        sql += ` and queType='${queType}'`
    }
    if(queId){
        sql += ` and queId='${queId}'`
    }
    return execSQL(sql)
}

// 考试题目查询--除了examId！=
const getExamQuestionExcept = (examId, curName) =>{
    let sql = `select * from questioning where`;
    if(examId){
        sql += ` examId!=${examId}`
    }
    if(curName){
        sql += ` and curName='${curName}'`
    }
    return execSQL(sql)
}

// 考试题目查询--重复度
const getExamQuestionRepeat = (queType, curName) =>{
    let sql = `select * from questioning where`;
    if(queType){
        sql += ` queType='${queType}'`
    }
    if(curName){
        sql += ` and curName='${curName}'`
    }
    return execSQL(sql)
}

//重复度上传
const postRepeat = (examQuestionData) =>{
    //将数据存到数据库中
    const examId = examQuestionData.params.examId
    const totalNum = examQuestionData.params.totalNum
    const sql = `
    insert into chongfu (examId, repeatNum, totalNum, repeatPercent) values (${examId}, 0, ${totalNum}, 0.1)
    `
    return execSQL(sql).then(insertedResult => {
        console.log(insertedResult)
        return{
            classId: insertedResult.insertclassId,
            examId: insertedResult.insertexamId
        }
    })
}

// 查询--重复度
const getRepeat = (examId) =>{
    let sql = `select * from chongfu where`;
    if(examId){
        sql += ` examId=${examId}`
    }
    return execSQL(sql)
}

//更新重复度
const updateRepeat = (examId, examQuestionData = {}) =>{
    const repeatNum = examQuestionData.params.repeatNum

    const sql = `update chongfu set repeatNum=${repeatNum} where examId=${examId}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//考试题目错题最多5个
const getExamQuestionTOP = (examId) =>{
    let sql = `select * from questioning where`;
    if(examId){
        sql += ` examId=${examId} order by errorCount desc limit 5`
    }
    return execSQL(sql)
}

//新增考试题目
const newExamQuestion = (examQuestionData = {}) =>{
    const classId = examQuestionData.params.classId
    const examId = examQuestionData.params.examId
    const curName = examQuestionData.params.curName
    const queId = examQuestionData.params.queId
    const queType = examQuestionData.params.queType
    const stem = examQuestionData.params.stem
    const choiceA = examQuestionData.params.choiceA
    const choiceB = examQuestionData.params.choiceB
    const choiceC = examQuestionData.params.choiceC
    const choiceD = examQuestionData.params.choiceD
    const answer = examQuestionData.params.answer

    const sql = `insert into questioning (classId, examId, curName, queId, queType, stem, choiceA, choiceB, choiceC, choiceD, answer, selectStatus, errorCount) values (${classId}, ${examId}, '${curName}' ,${queId}, '${queType}', '${stem}', '${choiceA}', '${choiceB}', '${choiceC}', '${choiceD}', '${answer}', '2', 0)`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//更新考试题目错误数目
const updateExamQuestion = (id, examQuestionData = {}) =>{
    const errorCount = examQuestionData.params.errorCount

    const sql = `update questioning set errorCount=${errorCount} where id=${id}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//删除考试题目
const deleteExamQuestion = (id) =>{
    const sql = `delete from questioning where id=${id}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
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
const getExamAnswer = (examId, stuId, queType) =>{
    let sql = `select * from answer where`;
    if(examId){
        sql += ` examId=${examId}`
    }
    if(stuId){
        sql += ` and stuId='${stuId}'`
    }
    if(queType){
        sql += ` and queType='${queType}'`
    }
    return execSQL(sql)
}

//更新答案
const updateAnswer = (id, examQuestionData = {}) =>{

    const answer = examQuestionData.answer
    const myAnswer = examQuestionData.myAnswer
    const stem = examQuestionData.stem
    const point = examQuestionData.point
    const sql = `update answer set answer='${answer}', myAnswer='${myAnswer}', stem='${stem}', point=${point} where id=${id}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//更新答案分数
const updateAnswerPoint = (id, examQuestionData = {}) =>{

    const point = examQuestionData.params.point
    const sql = `update answer set point=${point} where id=${id}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//新增考试
const newExam = (examQuestionData = {}) =>{
    const classId = examQuestionData.params.classId
    const teaId = examQuestionData.params.teaId
    const className = examQuestionData.params.className
    const curName = examQuestionData.params.curName
    const startTime = examQuestionData.params.startTime
    const schoolTerm = examQuestionData.params.schoolTerm
    const examType = examQuestionData.params.examType
    const teacherStatus = examQuestionData.params.teacherStatus

    const sql = `insert into exam (classId, teaId, className, curName, startTime, schoolTerm, examType, teacherStatus) values (${classId}, '${teaId}', '${className}', '${curName}', '${startTime}', '${schoolTerm}', '${examType}', ${teacherStatus})`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//修改考试
const updateExam = (examId, examQuestionData = {}) =>{
    const duration = examQuestionData.params.duration
    const totalPoint = examQuestionData.params.totalPoint
    const status = examQuestionData.params.status
    const teacherStatus = examQuestionData.params.teacherStatus
    const danxuan = examQuestionData.params.danxuan
    const DanXScore = examQuestionData.params.DanXScore
    const duoxuan = examQuestionData.params.duoxuan
    const DuoXScore = examQuestionData.params.DuoXScore
    const tiankong = examQuestionData.params.tiankong
    const TKScore = examQuestionData.params.TKScore
    const jisuan = examQuestionData.params.jisuan
    const JSScore = examQuestionData.params.JSScore
    const wenda = examQuestionData.params.wenda
    const WDScore = examQuestionData.params.WDScore
    const biancheng = examQuestionData.params.biancheng
    const BCScore = examQuestionData.params.BCScore
    
    console.log(duration, totalPoint, status, teacherStatus, danxuan, DanXScore, duoxuan, DuoXScore, tiankong, TKScore, jisuan, JSScore, wenda, WDScore, biancheng, BCScore)

    const sql = `update exam set duration='${duration}', totalPoint='${totalPoint}', status=${status}, teacherStatus=${teacherStatus}, danxuan=${danxuan}, DanXScore=${DanXScore}, duoxuan=${duoxuan}, DuoXScore=${DuoXScore}, tiankong=${tiankong}, TKScore=${TKScore}, jisuan=${jisuan}, JSScore=${JSScore}, wenda=${wenda}, WDScore=${WDScore}, biancheng=${biancheng}, BCScore=${BCScore} where examId=${examId}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//删除考试题目
const deleteRpeat = (examId) =>{
    const sql = `delete from questioning where examId=${parseInt(examId)}`;
    return execSQL(sql).then(deleteResult => {
        if(deleteResult.affectedRows > 0){
            return true;
        }
        return false
    })
}

// 模板查询
const getMoban = (moName, curName) =>{
    let sql = `select * from moban where`;
    if(moName){
        sql += ` moName='${moName}'`
    }
    if(curName){
        sql += ` and curName='${curName}'`
    }
    
    return execSQL(sql)
}
module.exports = {
    getExamList,
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
    getMoban
}