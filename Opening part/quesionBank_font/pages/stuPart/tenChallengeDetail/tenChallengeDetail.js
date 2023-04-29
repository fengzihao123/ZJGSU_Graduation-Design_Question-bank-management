// pages/stuPart/tenChallengeDetail/tenChallengeDetail.js
import request from '../../../utils/request'
import upload from '../../../utils/upload'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      curName: '',
      stuId: '',
      stuName: '',
      topList:[]
    },
    // 前往挑战小游戏
    toChallengeGame(){
      let curName = this.data.curName;
      let stuId = this.data.stuId;
      let stuName = this.data.stuName;
        wx.navigateTo({
          url: '../challengeGame/challengeGame?curName=' + curName + '&stuId=' + stuId + '&stuName=' + stuName,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let curName = options.curName
      let stuId = options.stuId
      let stuName = options.stuName
      this.setData({
        curName,
        stuId,
        stuName
      })
      this.getTop()
    },

    //获取排行榜
    async getTop(){
      let curName = this.data.curName
      let topList = await request('/challenge/socre/getScore',{curName})
      this.setData({
        topList:topList.data
      })
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