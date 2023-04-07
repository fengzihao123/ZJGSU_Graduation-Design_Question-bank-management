// pages/teaPart/postTest/postTest.js
import upload from '../../../utils/upload'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      test:'test'
    },

    async testPost(){
        await upload('/teacher/user/newUserInfo',{teaId:"test",teaPwd:"123456",teaName:"冯子豪",gender:0,phoneNum:"12344566778"})
        console.log("新建成功")
      },
    async testUpdate(){
      await upload('/teacher/user/userInfoUpdate?teaId='+this.data.test,{teaPwd:"654321",teaName:"冯子豪",gender:0,phoneNum:"12344566778"})
      console.log("更改成功")
    },
    async testDelete(){
      await upload('/teacher/user/deleteUserInfo?teaId='+this.data.test,{})
      console.log("删除成功")
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