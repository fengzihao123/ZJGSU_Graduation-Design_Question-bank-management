// pages/login/student_login/student_login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_student: true,
        is_teacher: false,
        student_pwd_value: '',
        student_pwd_value: '',
      },
    // 学生学号获取
      student_num(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
      },
    //   学生密码获取
      student_pwd(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
      },

    /**
     * 生命周期函数--监听页面加载
     */

    //  选择器选择学生
    pick_student(){
      let is_student = true
      let is_teacher = false
      this.setData({
        is_student,
        is_teacher
      })
    },

      //  选择器选择教师
      pick_teacher(){
        let is_student = false
        let is_teacher = true
        this.setData({
          is_student,
          is_teacher
        })
      },

      // 学生登录
      stu_login(){
        wx.navigateTo({
          url: '../stuPart/myCourse/myCourse',
        })
      },
      // 教师登录
      tea_login(){
        wx.switchTab({
          url: '../teaPart/bankGM/bankGM',
        })
      },

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