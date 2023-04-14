// pages/stuPart/myExam/myExam.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 'exam',
        examList:[],
        curName:'',
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
        v1:2,
        v2:0,
        v3:3,
    },

  //考试列表获取
    async getExamList(classId, schoolTerm){
      let examList = await request('/exam/student/getExamList',{classId:classId, schoolTerm:schoolTerm})
      this.setData({
        examList
      })
    },

    async getExamListByCurId(classId, curName){
      let examList = await request('/exam/student/getExamList',{classId:classId, curName})
      this.setData({
        examList
      })
    },



    change(event){
      this.getExamList(this.data.stuInfo[0].classId, event.detail)
    },

    //页面跳转
    onChange(event) {
        this.setData({ active: event.detail });
        if(this.data.active === 'info'){
            wx.navigateTo({
              url: '../myCourse/myCourse',
            })
        }else if(this.data.active === 'grade'){
            wx.navigateTo({
              url: '../myGrade/myGrade',
            })
        }
      },

      // 跳转考试详情页面
      toExamDetail(event){
        let {exam} = event.currentTarget.dataset;
        console.log(exam.examId)
        wx.navigateTo({
          url: '/pages/stuPart/examDetail/examDetail?examId=' + exam.examId,
        })
      },

    
     

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let stuInfo = wx.getStorageSync('stuInfo')
      let curName = options.curName
      this.setData({
        stuInfo,
        curName
      })
      if(curName){
        this.getExamListByCurId(stuInfo[0].classId,curName)
      }else{
        this.getExamList(stuInfo[0].classId,'')
      }
      
      
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