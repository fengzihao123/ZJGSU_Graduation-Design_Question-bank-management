// pages/stuPart/historyError/historyError.js
import Dialog from '@vant/weapp/dialog/dialog';
import request from '../../../utils/request'
import upload from '../../../utils/upload'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        answer:[],
        temp:'',
        result: ['a', 'b'],
        flageA:false,
        flageB:false,
        flageC:false,
        flageD:false,
        temp:'',
        collectList:[],
        stuInfo:[],
        show: false,
    },


    // 收藏
    collect(){
        let index = this.data.index
        let collectList = this.data.collectList
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认收藏吗？',
            success (res) {
              if (res.confirm) {
                that.Collect()
                collectList.data[index].isCollect = 1
                that.setData({
                    collectList
                })
              } else if (res.cancel) {
              }
            }
          })

    },
     //收藏函数
     async Collect(){
        let index = this.data.index
        let collectList = this.data.collectList
        await upload('/question/collect/collect?stuId=' + collectList.data[index].stuId + '&queId=' + collectList.data[index].queId,{isCollect:1})
    },
    //取消收藏函数
    async cancleCollect(){
        let index = this.data.index
        let collectList = this.data.collectList
        await upload('/question/collect/deleteCollection?stuId=' + collectList.data[index].stuId + '&queId=' + collectList.data[index].queId,{isCollect:0})
    },
    //取消收藏
    async no_collect(){
        let index = this.data.index
        let collectList = this.data.collectList
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认取消收藏吗？',
            success (res) {
              if (res.confirm) {
                that.cancleCollect()
                collectList.data[index].isCollect = 0
                that.setData({
                    collectList
                })
              } else if (res.cancel) {
              }
            }
          })
    },
    //删除
    shanchu(){
        let index = this.data.index
        let collectList = this.data.collectList
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认删除吗？',
            success (res) {
              if (res.confirm) {
                collectList.data[index].isCollect = 0
                that.setData({
                    collectList
                })
              } else if (res.cancel) {
              }
            }
          })
    },
    // 点击全部
    quanbu(){
        this.setData({ show: true });
    },   
    onClose() {
        this.setData({ show: false });
      },

      //收藏列表获取
      async getCollectList(stuId){
          let collectList = await request('/question/collect/getCollection',{stuId:stuId})
          this.setData({
              collectList
          })
      },

      // 查看index
      chageIndex(event){
          let index = event.currentTarget.dataset
          let collect = this.data.collectList
          for(var i = 0;i < collect.data.length;i++){
             collect.data[i].isPick = 'false'
          }
          collect.data[index.index].isPick = 'true'
          this.setData({
              index:index.index,
              collectList:collect,
              show:false
          })
      },
      //上一题
      toPre(){
          let index = this.data.index
          let length = this.data.collectList.data.length
          let collectList = this.data.collectList
          if(index == 0){
              index = length - 1 
          }else{
              index = index - 1
          }
          for(var i = 0;i < collectList.data.length; i++){
            collectList.data[i].isPick = 'false'
          }
          collectList.data[index].isPick = 'true'
          this.setData({
              index:index,
              collectList,
          })
      },
      //下一题
      toNext(){
        let index = this.data.index
        let length = this.data.collectList.data.length
        let collectList = this.data.collectList
        if(index == length - 1){
            index = 0
        }else{
            index = index + 1
        }
        for(var i = 0; i < collectList.data.length; i++){
            collectList.data[i].isPick = 'false'
          }
          collectList.data[index].isPick = 'true'
          this.setData({
              index:index,
              collectList,
          })
        
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let stuInfo = wx.getStorageSync('stuInfo')
        this.getCollectList(stuInfo[0].stuId)
        
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