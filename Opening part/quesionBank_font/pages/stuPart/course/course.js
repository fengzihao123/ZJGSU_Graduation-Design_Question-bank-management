// pages/stuPart/course/course.js
import Toast from '@vant/weapp/toast/toast';
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseList:[],
        teaName:'',
        className:'',
        option: [
            { text: '学期', value: 'a' },
            { text: '2022-2023 第二学期', value: '2022-2023 第二学期' },
            { text: '2022-2023 第一学期', value: '2022-2023 第一学期' },
            { text: '2021-2022 第二学期', value: '2021-2022 第二学期' },
            { text: '2021-2022 第一学期', value: '2022-2023 第一学期' },
          ],
          value: 'a',
        //   value_content: '',
      },
    
     // 前往课程详情页面
     toCourseDetail(){
       wx.navigateTo({
         url: '/pages/stuPart/courseDetail/courseDetail',
       })
     },

     // 课程列表获取
     async getCourse(){
       let courseList = await request('/student/course/getCourse',{stuId:'1911060118'})
       
       this.setData({
         courseList
       })
     },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getCourse()
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