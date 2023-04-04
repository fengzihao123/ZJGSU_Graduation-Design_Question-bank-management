// 创建服务器
const http = require("http");
// 回调函数
const serverHandler = require('../app')

// 端口 3000
const PORT = 3001;

const server = http.createServer(serverHandler);

server.listen(PORT, ()=>{
    console.log("题库管理系统后台服务成功启动，PORT：",PORT);
})