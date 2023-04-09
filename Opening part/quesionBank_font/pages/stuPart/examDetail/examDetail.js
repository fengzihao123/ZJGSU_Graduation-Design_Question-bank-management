// pages/stuPart/examDetail/examDetail.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        examDetail:[],
        examId:'',
    },

    kaoshengxuzhi() {
        this.setData({ show: true });
      },
    
    onClose() {
        this.setData({ show: false });
      },
    
      // 前往考试页面
      toExaming(){
        var that = this
        wx.showModal({
            title: '确认考试吗？',
            content: '一旦开始无法退出！',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/stuPart/examing/examing?examId=' + that.data.examDetail.data[0].examId,
                })
              } else if (res.cancel) {
              }
            }
          })
      },

      // 获取考试详情
      async getExamDetail(examId){
        let examDetail = await request('/exam/student/examDetail',{examId:examId})
        this.setData({
          examDetail,
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let examId = options.examId
      this.setData({
        examId
      })
      this.getExamDetail(examId)
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