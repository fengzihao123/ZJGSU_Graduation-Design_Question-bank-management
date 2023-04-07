// pages/stuPart/course/course.js
import Toast from '@vant/weapp/toast/toast';
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseList:[],
        stuInfo:[],
        option: [
            { text: '学期', value: 'a' },
            { text: '2022-2023 第二学期', value: '2022-2023 第二学期' },
            { text: '2022-2023 第一学期', value: '2022-2023 第一学期' },
            { text: '2021-2022 第二学期', value: '2021-2022 第二学期' },
            { text: '2021-2022 第一学期', value: '2021-2022 第一学期' },
            { text: '2020-2021 第二学期', value: '2020-2021 第二学期' },
            { text: '2020-2021 第一学期', value: '2020-2021 第一学期' },
            { text: '2019-2020 第二学期', value: '2019-2020 第二学期' },
            { text: '2019-2020 第一学期', value: '2019-2020 第一学期' },
          ],
          value: 'a',
        //   value_content: '',
      },
    
     // 前往课程详情页面
     toCourseDetail(event){
      let {course} = event.currentTarget.dataset;
       wx.navigateTo({
         url: '/pages/stuPart/courseDetail/courseDetail?curId=' + course.curId,
       })
     },

     //学期选择
     change(event){
      console.log(event.detail)
      this.getCourse(event.detail)
     },

     // 课程列表获取
     async getCourse(term){
       let courseList = await request('/course/student/getCourseList',{stuId:this.data.stuInfo[0].stuId,term:term})
       
       this.setData({
         courseList
       })
     },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 学生信息获取
      let stuInfo = wx.getStorageSync('stuInfo')
       this.setData({
         stuInfo
       })
      this.getCourse('')
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