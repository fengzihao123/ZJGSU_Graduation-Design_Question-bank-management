
var axios = require('axios')
var SERVER_CONFIG = require('./config')
var $ = require('jquery')

console.log(SERVER_CONFIG.SERVER_CONFIG.host)

const upload = (url , data = {}) => {
    return new Promise((resolve, reject) => {
        let getUrl = SERVER_CONFIG.SERVER_CONFIG.host + url
        axios.post(getUrl, {
            params: data
        }).then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        });
    })
}

module.exports = {
    upload
}