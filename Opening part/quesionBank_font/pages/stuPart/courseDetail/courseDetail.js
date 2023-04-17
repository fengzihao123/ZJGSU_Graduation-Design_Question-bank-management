// pages/stuPart/courseDetail/courseDetail.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      courseDetail:[],
      stuInfo: [],
      curName: '',
      teaInfo:[]
    },
    //前往考试页面
    toExam(){
        wx.switchTab({
          url: '../myExam/myExam?curName=' + this.data.courseDetail.data[0].curName,
        })
    },
    //获取课程详情
    async getCourseDetail(stuId, curName){
      let courseDetail = await request('/course/student/getCourseDetail',{stuId:stuId,curName})
      let teaInfo = await request('/teacher/user/userInfo',{teaId:courseDetail.data[0].teaId})
      this.setData({
        courseDetail,
        teaInfo
      })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      let curName = options.curName
      let stuInfo = wx.getStorageSync('stuInfo')
      this.setData({
        curName,
        stuInfo
      })
      this.getCourseDetail(stuInfo[0].stuId, curName)
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