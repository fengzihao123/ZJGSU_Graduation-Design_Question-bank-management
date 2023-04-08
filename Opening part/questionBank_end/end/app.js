const querystring = require('querystring')
const handleTeacherRoute = require('./src/routes/teacher');
const handleStudentRoute = require('./src/routes/student');
const handleCourseRoute = require('./src/routes/course');
const handleExamRoute = require('./src/routes/exam');
const handleGradeRoute = require('./src/routes/grade')
const handleQuestionRoute = require('./src/routes/question')

//处理POST数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST'){
            resolve({});
            return;
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({});
            return;
        }
        let postData = '';
        req.on('data',(chunk) => {
            postData += chunk.toString();
        })
        req.on('end',() => {
            if(!postData){
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandler = (req, res) => {
    res.setHeader('Content-Type','application/json')

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析 query
    req.query = querystring.parse(url.split('?')[1])

    //处理 POST 数据
    getPostData(req).then((postData) => {
        req.body = postData;

        //教师相关的路由
        const teacherDataPromise = handleTeacherRoute(req, res);
        if(teacherDataPromise){
            teacherDataPromise.then(teacherData =>{
                res.end(
                    JSON.stringify(teacherData)
                );
            })
            return ;
        }

        //学生相关的路由
        const studentDataPromise = handleStudentRoute(req, res);
        if(studentDataPromise){
            studentDataPromise.then(studentData =>{
                res.end(
                    JSON.stringify(studentData)
                );
            })
            return ;
        }

        //课程相关的路由
        const courseDataPromise = handleCourseRoute(req, res);
        if(courseDataPromise){
            courseDataPromise.then(courseData =>{
                res.end(
                    JSON.stringify(courseData)
                );
            })
            return ;
        }

        //考试相关的路由
        const examDataPromise = handleExamRoute(req, res);
        if(examDataPromise){
            examDataPromise.then(examData =>{
                res.end(
                    JSON.stringify(examData)
                );
            })
            return ;
        }

        //成绩相关的路由
        const gradeDataPromise = handleGradeRoute(req, res);
        if(gradeDataPromise){
            gradeDataPromise.then(gradeData =>{
                res.end(
                    JSON.stringify(gradeData)
                );
            })
            return ;
        }

        //题库相关的路由
        const questionDataPromise = handleQuestionRoute(req, res);
        if(questionDataPromise){
            questionDataPromise.then(questionData =>{
                res.end(
                    JSON.stringify(questionData)
                );
            })
            return ;
        }
        //未匹配到任何路由
        res.writeHead(404, { 'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
    })

}
module.exports = serverHandler