const querystring = require('querystring')
const handleTeacherRoute = require('./src/routes/teacher');


const serverHandler = (req, res) => {
    res.setHeader('Content-Type','application/json')

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析 query
    req.query = querystring.parse(url.split('?')[1])

    const teacherData = handleTeacherRoute(req, res);
    if(teacherData){
        res.end(
            JSON.stringify(teacherData)
        );
        return ;
    }

    res.writeHead(404, { 'Content-Type':'text/plain'});
    res.write('404 Not Found');
    res.end();

}
module.exports = serverHandler