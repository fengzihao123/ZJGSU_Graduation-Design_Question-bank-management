// pages/stuPart/myGrade/myGrade.js
// 引入
import * as echarts from '../../../ec-canvas/echarts'
let chart = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
     
        
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
  let v = getCurrentPages()
  console.log(v[0].data.values)
  return {
    xAxis:{
      type: 'category',
      data:['第一次','第二次','第三次']
    },
    yAxis:{
      type:'value'
    },
    series:[{
      data:[67,v[0].data.values,82],
      type: 'line'
    }]
  }
}