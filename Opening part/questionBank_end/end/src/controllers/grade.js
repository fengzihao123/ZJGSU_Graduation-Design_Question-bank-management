const {execSQL} = require('../db/mysql')
// 跟成绩相关的方法

// 成绩查询
const getGrade = (stuId) =>{
    //从数据库拿数据
    let sql = `select * from grade where`;
    if(stuId){
        sql += ` stuId='${stuId}'`;
    }
    return execSQL(sql)
}

// 新增成绩
const creatNewGrade = (gradeData = {}) =>{

    const examId = gradeData.params.examId
    const stuId = gradeData.params.stuId
    const curName = gradeData.params.curName
    const danxuan = gradeData.params.danxuan
    const duoxuan = gradeData.params.duoxuan
    const tiankong = gradeData.params.tiankong
    const jisuan = gradeData.params.jisuan
    const wenda = gradeData.params.wenda
    const biancheng = gradeData.params.biancheng
    const score = gradeData.params.score

    console.log(examId, stuId, curName, danxuan, duoxuan, tiankong, jisuan, wenda, biancheng, score)
    const sql = `insert into grade (examId, stuId, curName, danxuan, duoxuan, tiankong, jisuan, wenda, biancheng, score) values 
    (${examId}, '${stuId}', '${curName}', ${danxuan}, ${duoxuan}, ${tiankong}, ${jisuan}, ${wenda}, ${biancheng}, ${score})`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
    

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
    getGrade,
    creatNewGrade
}