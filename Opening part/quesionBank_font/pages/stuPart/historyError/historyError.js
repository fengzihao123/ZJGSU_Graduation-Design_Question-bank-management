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
        stuInfo:[],
        temp:'',
        flageA:false,
        flageB:false,
        flageC:false,
        flageD:false,
        temp:'',
        errorList:[],
        show: false,
    },

     
    // //删除
    // shanchu(){
    //     let index = this.data.index
    //     let errorList = this.data.errorList
    //     var that = this
    //     wx.showModal({
    //         title: '提示',
    //         content: '确认删除吗？',
    //         success (res) {
    //           if (res.confirm) {
    //             that.deleteError()
    //             let newError = that.getErrorList(that.data.stuInfo[0].stuId)
    //             that.setData({
    //                 errorList:newError
    //             })
    //           } else if (res.cancel) {
    //           }
    //         }
    //       })
    // },

     // 收藏
     collect(){
        let index = this.data.index
        let errorList = this.data.errorList
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认收藏吗？',
            success (res) {
              if (res.confirm) {
                that.AddCollect()
                errorList.data[index].isCollect = 1
                that.setData({
                    errorList
                })
              } else if (res.cancel) {
              }
            }
          })

    },
     //收藏函数
    async AddCollect(){
        let index = this.data.index
        let errorList = this.data.errorList
        let result = await upload('/question/collect/newCollect',{
            queId:errorList.data[index].queId,
            stuId:errorList.data[index].stuId,
            queType:errorList.data[index].queType,
            curName:errorList.data[index].curName,
            stem:errorList.data[index].stem,
            choiceA:errorList.data[index].choiceA,
            choiceB:errorList.data[index].choiceB,
            choiceC:errorList.data[index].choiceC,
            choiceD:errorList.data[index].choiceD,
            difficulty:errorList.data[index].difficulty,
            chaName:errorList.data[index].chaName,
            analysis:errorList.data[index].analysis,
            answer:errorList.data[index].answer,
            isCollect:1,
            isPick:'false'
        })
        console.log(result)
    },
    // //取消收藏函数
    // async cancleCollect(){
    //     let index = this.data.index
    //     let collectList = this.data.collectList
    //     await upload('/question/collect/deleteCollection?stuId=' + collectList.data[index].stuId + '&queId=' + collectList.data[index].queId,{isCollect:0})
    // },
    // //取消收藏
    // async no_collect(){
    //     let index = this.data.index
    //     let collectList = this.data.collectList
    //     var that = this
    //     wx.showModal({
    //         title: '提示',
    //         content: '确认取消收藏吗？',
    //         success (res) {
    //           if (res.confirm) {
    //             that.cancleCollect()
    //             collectList.data[index].isCollect = 0
    //             that.setData({
    //                 collectList
    //             })
    //           } else if (res.cancel) {
    //           }
    //         }
    //       })
    // },


    // 点击全部
    quanbu(){
        this.setData({ show: true });
    },   
    onClose() {
        this.setData({ show: false });
      },

      //错题列表获取
      async getErrorList(stuId, curName){
          let errorList = await request('/question/errorQuestion/getError',{stuId,curName})
          this.setData({
              errorList
          })
      },
      //错题
    //   async Error(){
    //     let index = this.data.index
    //     let errorList = this.data.errorList
    //     let result = await upload('/question/errorQuestion/error?stuId=' + errorList.data[index].stuId + '&queId=' + errorList.data[index].queId,{isError:1})
    //     console.log(result)
    //   },
      //删除错题
      async deleteError(){
          let index = this.data.index
          let errorList = this.data.errorList
          let result = await upload('/question/errorQuestion/deleteError?stuId=' + errorList.data[index].stuId + '&queId=' + errorList.data[index].queId,{isError:0})
          console.log(result)
      },

      // 查看index
      chageIndex(event){
          let index = event.currentTarget.dataset
          let error = this.data.errorList
          for(var i = 0;i < error.data.length;i++){
             error.data[i].isPick = 'false'
          }
          error.data[index.index].isPick = 'true'
          this.setData({
              index:index.index,
             errorList:error,
              show:false
          })
      },
      //上一题
      toPre(){
          let index = this.data.index
          let length = this.data.errorList.data.length
          let errorList = this.data.errorList
          if(index == 0){
              index = length - 1 
          }else{
              index = index - 1
          }
          for(var i = 0; i <errorList.data.length; i++){
            errorList.data[i].isPick = 'false'
          }
          errorList.data[index].isPick = 'true'
          this.setData({
              index:index,
              errorList,
          })
      },
      //下一题
      toNext(){
        let index = this.data.index
        let length = this.data.errorList.data.length
        let errorList = this.data.errorList
        if(index == length - 1){
            index = 0
        }else{
            index = index + 1
        }
        for(var i = 0;i < errorList.data.length;i++){
            errorList.data[i].isPick = 'false'
          }
          errorList.data[index].isPick = 'true'
          this.setData({
              index:index,
              errorList,
          })
        
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {  
        let curName = options.curName
        let stuId = options.stuId
        this.getErrorList(stuId, curName)
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