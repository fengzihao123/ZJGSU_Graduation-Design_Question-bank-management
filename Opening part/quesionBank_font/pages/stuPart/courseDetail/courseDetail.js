// pages/stuPart/courseDetail/courseDetail.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      courseDetail:[],
      teaName:'',
      className:''
    },
    //前往考试页面
    toExam(){
        wx.navigateTo({
          url: '../myExam/myExam',
        })
    },
    //获取课程详情
    async getCourseDetail(){
      let courseDetail = await request('/student/course/getCourse',{stuId:'1911060118',curId:'123445'})
      let teaList = await request('/teacher/user/userInfo',{teaId:courseDetail.teaId})
      let classList = await request('/student/user/class',{classId:courseDetail.classId})
      let className = classList.className
      let teaName = teaList.teaInfo.teaName
      this.setData({
        courseDetail,
        teaName,
        className
      })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getCourseDetail()
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