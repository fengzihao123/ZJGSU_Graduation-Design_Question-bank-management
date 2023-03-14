// pages/stuPart/mycourse/myCourse.js

// 引用导航栏
import {studentBar} from '../../../utils/tabBar.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 'info',
        show: false
    },
    //页面跳转
    onChange(event) {
        this.setData({ active: event.detail });
        if(this.data.active === 'exam'){
            wx.navigateTo({
              url: '../myExam/myExam',
            })
        }else if(this.data.active === 'grade'){
            wx.navigateTo({
              url: '../myGrade/myGrade',
            })
        }
      },

      //课程说明  弹窗弹出
      courseDescription(){
        this.setData({ show: true });
      },
      // 弹窗关闭
      onClose() {
        this.setData({ show: false });
      },

      // 跳转课程
      toCourse(){
        wx.navigateTo({
          url: '../course/course',
        })
      },

      // 跳转历史错题
      toHistory(){
        wx.navigateTo({
          url: '../historyError/historyError',
        })
      },
      //  跳转题目收藏
      toCollection(){
        wx.navigateTo({
          url: '../questionCollection/questionCollection',
        })
      },

      // 跳转设置
      toSetting(){
        wx.navigateTo({
          url: '../setting/setting',
        })
      },

      // 退出
      quit(){
        wx.navigateTo({
          url: '../../login/login',
        })
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