const {execSQL} = require('../db/mysql')
// 跟题库相关的方法

//题库收藏查询
const getQuestionCollect = (stuId, curName) =>{
    //从数据库拿数据
    let sql = `select * from collect where`;
    if(stuId){
        sql += ` stuId='${stuId}' and isCollect=1`;
    }
    if(curName){
        sql += ` and curName='${curName}'`;
    }
    return execSQL(sql)
}

//题库错题查询
const getQuestionError = (stuId, curName) =>{
    //从数据库拿数据
    let sql = `select * from error where`;
    if(stuId){
        sql += ` stuId='${stuId}' and isError=1`;
    }
    if(curName){
        sql += ` and curName='${curName}'`;
    }
    return execSQL(sql)
}

//题库查询
const getQuestion = (curName, queType, chaName, difficulty, stem) =>{
    //从数据库拿数据
    let sql = `select * from question where isDelete=0`;
    if(curName){
        sql += ` and curName='${curName}'`;
    }
    if(queType){
        sql += ` and queType='${queType}'`;
    }
    if(chaName){
        sql += ` and chaName='${chaName}'`;
    }
    if(difficulty){
        sql += ` and difficulty='${difficulty}'`;
    }
    if(stem){
        sql += ` and stem like '%${stem}%'`;
    }
    return execSQL(sql)
}

//题库查询---十秒挑战
const getQuestionTen = (curName, difficulty, num) =>{
    //从数据库拿数据
    let sql = `select * from question where isDelete=0`;
    if(curName){
        sql += ` and curName='${curName}'`;
    }
    if(difficulty){
        sql += ` and difficulty=${difficulty} and queType='单选'`;
    }
    if(num){
        sql += ` order by rand() limit ${parseInt(num)}`;
    }
    return execSQL(sql)
}


//题库查询--自动--困难
const getQuestionAutoDiff = (diffNum, curName, queType) =>{
    //从数据库拿数据order by rand()
    let sql = `select * from question where isDelete=0 and difficulty >=3 and curName='${curName}' and queType='${queType}' order by rand() limit ${parseInt(diffNum)}`;
    return execSQL(sql)
}

//题库查询--自动--简单
const getQuestionAutoSimple = (simpleNum, curName, queType) =>{
    //从数据库拿数据order by rand()
    let sql = `select * from question where isDelete=0 and difficulty <=3 and curName='${curName}' and queType='${queType}' order by rand() limit ${parseInt(simpleNum)}`;
    return execSQL(sql)
}

//题目详情查询
const getQuestionDetail = (queId) =>{
    //从数据库拿数据
    let sql = `select * from question where isDelete=0`;
    if(queId){
        sql += ` and queId='${parseInt(queId)}'`;
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

//取消错题
const cancleError = (stuId, queId, questionData) =>{
    //将数据存到数据库中
    const isError = questionData.isError
    const sql = `update error set isError=${isError} where stuId='${stuId}' and queId=${parseInt(queId)}`
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

//新增收藏
const AddCollect = (questionData) =>{
    //将数据存到数据库中
    const queId = questionData.queId
    const stuId = questionData.stuId
    const queType = questionData.queType
    const curName = questionData.curName
    const stem = questionData.stem
    const choiceA = questionData.choiceA
    const choiceB = questionData.choiceB
    const choiceC = questionData.choiceC
    const choiceD = questionData.choiceD
    const difficulty = questionData.difficulty
    const chaName = questionData.chaName
    const analysis = questionData.analysis
    const answer = questionData.answer
    const isCollect = questionData.isCollect
    const isPick = questionData.isPick
    console.log(analysis)

    // const sql = `insert into collect (queId, stuId, queType, stem, choiceA, choiceB, choiceC, choiceD, difficulty, chaName, explain, answer, isCollect, isPick) values (${queId}, '${stuId}', '${queType}', '${stem}', '${choiceA}', '${choiceB}', '${choiceC}', '${choiceD}', ${difficulty}, '${chaName}', '${explain}', '${answer}', ${isCollect}, '${isPick}')`
    const sql = `insert into collect (queId, stuId, queType, curName, stem, choiceA, choiceB, choiceC, choiceD, difficulty, chaName, answer, isCollect, isPick, analysis) values (${queId}, '${stuId}', '${queType}', '${curName}', '${stem}', '${choiceA}', '${choiceB}', '${choiceC}', '${choiceD}', ${difficulty}, '${chaName}', '${answer}', ${isCollect}, '${isPick}', '${analysis}')`
    
    return execSQL(sql).then(insertedResult => {
        console.log(insertedResult)
        return{
            stuId: insertedResult.insertstuId,
            queId: insertedResult.insertqueId
        }
    })

}

//错题
const Error = (stuId, queId, questionData) =>{
    //将数据存到数据库中
    const isError = questionData.isError
    const sql = `update error set isError=${isError} where stuId='${stuId}' and queId=${parseInt(queId)}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//新增错题
const newError = (questionData) =>{
    //将数据存到数据库中
    const queId = questionData.params.queId
    const stuId = questionData.params.stuId
    const queType = questionData.params.queType
    const curName = questionData.params.curName
    const stem = questionData.params.stem
    const choiceA = questionData.params.choiceA
    const choiceB = questionData.params.choiceB
    const choiceC = questionData.params.choiceC
    const choiceD = questionData.params.choiceD
    const difficulty = questionData.params.difficulty
    const chaName = questionData.params.chaName
    const analysis = questionData.params.analysis
    const answer = questionData.params.answer
    const myAnswer = questionData.params.myAnswer
    
    if(queType == '单选' || queType == '多选'){
        const sql = `insert into error (queId, stuId, queType, curName, stem, choiceA, choiceB, choiceC, choiceD, difficulty, chaName, analysis, answer, myAnswer, isError, isCollect, isPick)
        values (${queId}, '${stuId}', '${queType}', '${curName}', '${stem}', '${choiceA}', '${choiceB}', '${choiceC}', '${choiceD}', ${difficulty}, '${chaName}', '${analysis}', '${answer}', '${myAnswer}', 1, 0, 'false')`
        return execSQL(sql).then(updateResult =>{
            if(updateResult.affectedRows > 0){
                return true;
            }
            return false;
        }) 
    }else{
        const sql = `insert into error (queId, stuId, queType, curName, stem, difficulty, chaName, analysis, answer, myAnswer, isError, isCollect, isPick)
        values (${queId}, '${stuId}', '${queType}', '${curName}', '${stem}', ${difficulty}, '${chaName}', '${analysis}', '${answer}', '${myAnswer}', 1, 0, 'false')`
        return execSQL(sql).then(updateResult =>{
            if(updateResult.affectedRows > 0){
                return true;
            }
            return false;
        }) 
    }
    
}

//删除题库
const deleteQuestion = (queId, questionData = {}) =>{

    const isDelete = questionData.params.isDelete

    const sql = `update question set isDelete=${isDelete} where queId=${parseInt(queId)}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
    

}

//更新题库
const updateQuestion = (queId, questionData = {}) =>{

    const curName    = questionData.params.curName
    const stem       = questionData.params.stem
    const choiceA    = questionData.params.choiceA || ''
    const choiceB    = questionData.params.choiceB || ''
    const choiceC    = questionData.params.choiceC || ''
    const choiceD    = questionData.params.choiceD || ''
    const chaName    = questionData.params.chaName
    const queType    = questionData.params.queType
    const difficulty = questionData.params.difficulty
    const answer     = questionData.params.answer
    const sql = `update question set curName='${curName}', stem='${stem}', choiceA='${choiceA}', choiceB='${choiceB}', choiceC='${choiceC}', choiceD='${choiceD}', chaName='${chaName}', queType='${queType}', difficulty=${parseInt(difficulty)}, answer='${answer}' where queId=${parseInt(queId)}`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

//新增题库
const newQuestion = (questionData = {}) =>{

    const curName    = questionData.params.curName || ''
    const stem       = questionData.params.stem || ''
    const stemImgone = questionData.params.stemImgone || ''
    const stemImgtwo = questionData.params.stemImgtwo || ''
    const choiceA    = questionData.params.choiceA || ''
    const choiceB    = questionData.params.choiceB || ''
    const choiceC    = questionData.params.choiceC || ''
    const choiceD    = questionData.params.choiceD || ''
    const chaName    = questionData.params.chaName || ''
    const queType    = questionData.params.queType || ''
    const difficulty = questionData.params.difficulty || ''
    const answer     = questionData.params.answer || ''
    const analysis     = questionData.params.analysis || ''
    const analysisImgone = questionData.params.analysisImgone || ''
    const analysisImgtwo = questionData.params.analysisImgtwo || ''
    
    const sql = `insert into question values(0, '${curName}', '${stem}', '${stemImgone}', '${stemImgtwo}', '${choiceA}', '${choiceB}', '${choiceC}', '${choiceD}', '${chaName}', '${queType}', ${parseInt(difficulty)}, '${answer}', '${analysis}', '${analysisImgone}', '${analysisImgtwo}', 0)`
    return execSQL(sql).then(updateResult =>{
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    }) 
}

module.exports = {
    getQuestionCollect,
    getQuestionError,
    cancleCollect,
    Collect,
    cancleError,
    Error,
    AddCollect,
    getQuestion,
    deleteQuestion,
    updateQuestion,
    newQuestion,
    getQuestionDetail,
    newError,
    getQuestionAutoDiff,
    getQuestionAutoSimple,
    getQuestionTen
}