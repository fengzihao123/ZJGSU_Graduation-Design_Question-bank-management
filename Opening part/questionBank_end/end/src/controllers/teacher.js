// 跟教师相关的方法

// 教师登录接口
const getTeacherLoginResult = (teaId, teaPwd) =>{
    //从数据库拿数据
    return[{
        id:1,
        teaId:'958608363',
        teaPwd:'123456'
    }]
}

// 教师信息查询
const getTeacherDetail = (teaId) =>{
    return [{
        id:1,
        teaId:'958608363',
        name:'张三',
        gender:1
    }]
}
module.exports = {
    getTeacherLoginResult,
    getTeacherDetail
}