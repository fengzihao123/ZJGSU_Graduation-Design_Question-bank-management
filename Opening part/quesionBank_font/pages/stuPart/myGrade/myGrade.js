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
        grade:[],
        test:['a','b'],
        gradeList:[],
        courseNameList:[],
        course:[],
        active: 'grade',
        values:'70',
        
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
      async getGrade(){
        let grade = await request('/student/grade/getGrade',{stuId:'1911060118'})
        let course = await request('/student/course/getCourse',{stuId:'1911050119'})
        let gradeList = []
        let courseNameList = []
        for(var i = 0; i < 3 ;i++ ){
          gradeList.push(grade.score)
          courseNameList.push(course.curName)
        }
        wx.setStorageSync('gradeList',gradeList)
        wx.setStorageSync('courseNameList',courseNameList)
        this.setData({
          grade,
          course,
          gradeList,
          courseNameList
        })
        
      },
     
        
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getGrade()
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
  // let v =   getCurrentPages()
  // console.log(v[0].data)
  let gradeList = wx.getStorageSync('gradeList')
  let courseNameList = wx.getStorageSync('courseNameList')
  return {
    xAxis:{
      type: 'category',
      data:courseNameList
    },
    yAxis:{
      type:'value'
    },
    series:[{
      data:gradeList,
      type: 'line'
    }]
  }
}