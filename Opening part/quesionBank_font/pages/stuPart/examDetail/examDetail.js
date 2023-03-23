// pages/stuPart/examDetail/examDetail.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        examDetail:[],
        curName:''
    },

    kaoshengxuzhi() {
        this.setData({ show: true });
      },
    
    onClose() {
        this.setData({ show: false });
      },
    
      // 前往考试页面
      toExaming(){
        wx.navigateTo({
          url: '/pages/stuPart/examing/examing',
        })
      },

      // 获取考试详情
      async getExamDetail(){
        let examDetail = await request('/student/exam/examDetail',{examId:'11',stuId:'1911060118'})
        let courseList = await request('/student/course/getCourse',{curId:examDetail.examDetail.curId})
        let curName = courseList.curName
        this.setData({
          examDetail,
          curName
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getExamDetail()
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