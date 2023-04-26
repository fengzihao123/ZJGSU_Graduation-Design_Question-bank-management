// pages/stuPart/gradeSelect/gradeSlect.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseDetail:[],
        examId:''
    },
    // 课程列表获取
    async getCourseDetail(stuId, curName){
        let courseDetail = await request('/course/student/getCourseList',{stuId, curName})
        let examDetail = await request('/exam/student/getExamList',{curName, classId:courseDetail.data[0].classId})
        this.setData({
            courseDetail,
            examId:examDetail.data[0].examId
        })
        console.log(examDetail.data)
    },


    // 前往个人情况
    toPerson(){
        wx.navigateTo({
          url: '../gradeDetail/gradeDetail?stuId=' + this.data.courseDetail.data[0].stuId + '&curName=' + this.data.courseDetail.data[0].curName,
        })
    },
    // 前往班级情况
    toClass(){
        wx.navigateTo({
          url: '../gradeDetailClass/gradeDetailClass?examId=' + this.data.examId,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let curName = options.curName;
        let stuId = options.stuId;
        this.getCourseDetail(stuId, curName)
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