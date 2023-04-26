// pages/stuPart/gradeDetail/gradeDetail.js
import request from '../../../utils/request'
import * as echarts from '../../../ec-canvas/echarts'
let chart = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        queTypeList:['单选','多选','填空','计算','问答','编程'],
        queTypeScoreList:[],
        ec:{
            onInit: initChart
          },
    },

    async getQueTypeList(stuId, curName){
        let socreList = await request('/grade/student/getGrade',{stuId, curName})
        let s = socreList.data[0]       
        let queTypeScoreList = [];
        queTypeScoreList.push(s.danxuan)
        queTypeScoreList.push(s.duoxuan)
        queTypeScoreList.push(s.tiankong)
        queTypeScoreList.push(s.jisuan)
        queTypeScoreList.push(s.wenda)
        queTypeScoreList.push(s.biancheng)
        this.setData({
            queTypeScoreList
        })
        wx.setStorageSync('queTypeScoreList', queTypeScoreList)
        wx.setStorageSync('queTypeList', this.data.queTypeList)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let stuId = options.stuId;
        let curName = options.curName;
        this.getQueTypeList(stuId, curName)
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
    let queTypeScoreList = wx.getStorageSync('queTypeScoreList')
    let queTypeList = wx.getStorageSync('queTypeList')
    return {
      xAxis:{
        data:queTypeList,
        type: 'category'
      },
      yAxis:{
        type:'value'
      },
      series:[{
        data:queTypeScoreList,
        type: 'line'
      }]
    }
  }