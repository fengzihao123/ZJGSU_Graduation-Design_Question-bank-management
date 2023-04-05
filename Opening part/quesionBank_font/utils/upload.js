import config from './config'

export default (url , data = {} , method = 'post') => {
    return new Promise((resolve, reject) => {
        //1.new Promise 初始化promise实例的状态为pending
     wx.request({
         url: config.host + url,
         data,
         method,
         //请求头  注：在get请求中可有可无，但post需要
        header: {
            'Content-Type': 'application/json' // 默认值
          },
         success: (res) => {
             resolve(res.data);//resolve修改promis的状态为成功状态resolved
         },
         fail: (err) => {
             reject(err);//reject修改promise的状态为失败状态rejected
         }
     })
    })
 }
