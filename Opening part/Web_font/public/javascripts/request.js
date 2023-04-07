var axios = require('axios')
var SERVER_CONFIG = require('./config')
var $ = require('jquery')

console.log(SERVER_CONFIG.SERVER_CONFIG.host)

const request = (url , data = {}) => {
    return new Promise((resolve, reject) => {
        let getUrl = SERVER_CONFIG.SERVER_CONFIG.host + url
        axios.get(getUrl, {
            params: data
        }).then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        });
    })
    // $.get({
    //     url:getUrl,    //请求的url地址
    //     data: data,
    //     success:function(req){
    //         //请求成功
    //         console.log(req)
    //     },
    //     error:function(){
    //         //请求出错
    //     },
    //     complete:function(){
    //         //请求完成
    //     }
    // });
}

module.exports = {
    request
}