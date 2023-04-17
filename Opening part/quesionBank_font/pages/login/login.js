// pages/login/student_login/student_login.js

import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_student: true,
        is_teacher: false,
        student_pwd_value: '',
        student_num_value: '',
        teacher_pwd_value: '',
        teacher_num_value: '',
      },
    // 学生学号获取
      student_num(event) {
        // event.detail 为当前输入的值
        let student_num_value = event.detail
        this.setData({
          student_num_value
        })
      },
    //   学生密码获取
      student_pwd(event) {
        // event.detail 为当前输入的值
        let student_pwd_value = event.detail
        this.setData({
          student_pwd_value
        })
      },

      // 教工号获取
      teacher_num(event) {
        // event.detail 为当前输入的值
        let teacher_num_value = event.detail
        this.setData({
          teacher_num_value
        })
      },
    //   教师密码获取
      teacher_pwd(event) {
        let teacher_pwd_value = event.detail
        this.setData({
          teacher_pwd_value
        })
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
      async stu_login(){
        let stuId = this.data.student_num_value
        let stuPwd = this.data.student_pwd_value
        
        if(this.data.student_num_value.length == 0){
          wx.showToast({
            title: '学号为空',
            icon: 'none'
          })
        }else if(this.data.student_pwd_value.length == 0){
          wx.showToast({
            title: '密码为空',
            icon: 'none'
          })
        }else {
            let result = await request('/student/user/login',{stuId:stuId,stuPwd:stuPwd})
            if(result.data.length == 1){
              wx.setStorageSync('stuInfo', result.data)
              console.log(result.data)
              wx.switchTab({
                url: '../stuPart/myCourse/myCourse'
              })
            }else if(result.data.length == 0){
              wx.showToast({
                title: '学号或密码错误',
                icon: 'none',
              })
          }
        }
        
        
      },
      // 教师登录
      async tea_login(){
        let result = await request('/teacher/user/login',{stuId:'958608363',stuPwd:'a123456'})
        console.log(result.result)
        if(this.data.teacher_num_value.length == 0){
          wx.showToast({
            title: '教工号为空',
            icon: 'none'
          })
        }else if(this.data.teacher_pwd_value.length == 0){
          wx.showToast({
            title: '密码为空',
            icon: 'none'
          })
        }else {
            if(result.result == true){
              wx.switchTab({
                url: '/pages/teaPart/bankGM/bankGM',
              })
            }else if(result.result == false){
              wx.showToast({
                title: '工号或密码错误',
                icon: 'none',
              })
          }
        }
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