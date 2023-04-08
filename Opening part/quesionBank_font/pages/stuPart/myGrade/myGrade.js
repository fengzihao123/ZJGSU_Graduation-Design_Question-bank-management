// pages/stuPart/myGrade/myGrade.js
// 引入
import * as echarts from '../../../ec-canvas/echarts'
import request from '../../../utils/request'
let chart = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stuInfo:[],
        scoreList:[], 
        gradeList:[],
        curNameList:[],
        ec:{
          onInit: initChart
        }
    },
    //页面跳转
    onChange(event) {
        this.setData({ active: event.detail });
        if(this.data.active === 'exam'){
            wx.navigateTo({
              url: '../myExam/myExam',
            })
        }else if(this.data.active === 'info'){
            wx.navigateTo({
              url: '../myCourse/myCourse',
            })
        }
      },

      // 成绩查询
      async getGrade(stuId){
        let gradeList = await request('/grade/student/getGrade',{stuId:stuId})
        let scoreList = []
        let curNameList = []
        for(var i = 0; i < gradeList.data.length; i++){
          scoreList.push(gradeList.data[i].score)
          curNameList.push(gradeList.data[i].curName)
        }
        this.setData({
          gradeList,
          scoreList,
          curNameList
        })
        wx.setStorageSync('scoreList', scoreList)  
        wx.setStorageSync('curNameList', curNameList)      
      },
     
        
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let stuInfo = wx.getStorageSync('stuInfo')
      this.setData({
        stuInfo
      })
      this.getGrade(stuInfo[0].stuId)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
    
})
 // 初始化
 function initChart(canvas,width,height,dpr){
  chart = echarts.init(canvas,null,{
    width:width,
    height:height,
    devicePixelRatio:dpr
  })
  canvas.setChart(chart)
  let option = getOption() //echarts 的配置信息

  chart.setOption(option)
  return chart
}
 function  getOption(){
  let scoreList = wx.getStorageSync('scoreList')
  let curNameList = wx.getStorageSync('curNameList')
  return {
    xAxis:{
      data:curNameList,
      type: 'category'
    },
    yAxis:{
      type:'value'
    },
    series:[{
      data:scoreList,
      type: 'line'
    }]
  }
}