// pages/stuPart/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value_realName:'',
        gender: '',
        option1: [
            { text: '学院', value: 'a' },
            { text: '工商管理学院', value: '工商管理学院' },
            { text: '信息与电子工程学院', value: '信息与电子工程学院' },
            { text: '计算机与信息工程学院', value: '计算机与信息工程学院' },
            { text: '金融学院', value: '金融学院' },
          ],
          option2: [
            { text: '专业', value: 'b' },
            { text: '软件工程', value: '软件工程' },
            { text: '计算机科学与技术', value: '计算机科学与技术' },
            { text: '网络安全', value: '网络安全' },
          ],
          option3: [
            { text: '年级', value: 'c' },
            { text: '2022级', value: '2022级' },
            { text: '2021级', value: '2021级' },
            { text: '2020级', value: '2020级' },
            { text: '2019级', value: '2019级' },
          ],
          option4: [
            { text: '班级', value: 'd' },
            { text: '计科1902', value: '计科1902' },
            { text: '计科1901', value: '计科1901' },
          ],
          value1: 'a',
          value2: 'b',
          value3: 'c',
          value4: 'd',
          value1_content: '',
          value2_content: '',
          value3_content: '',
          value4_content: '',
    },
    // 选择1 学院
    change1(event){
        let value1_content = event.detail
        this.setData({
            value1_content
        })
    },
     // 选择2 学院
     change2(event){
        let value2_content = event.detail
        this.setData({
            value2_content
        })
    },
     // 选择3 学院
     change3(event){
        let value3_content = event.detail
        this.setData({
            value3_content
        })
    },
     // 选择4 学院
     change4(event){
        let value4_content = event.detail
        this.setData({
            value4_content
        })
    },

    // 输入格 信息获取

    // 真实姓名
    onChange_realName(event){
        console.log("真实姓名："+ event.detail)
    },
    // 性别
    onChange_pick(event){
        console.log("性别："+ event.detail)
    },




    // 保存和跳转
    saveANDtoMycourse(){
        wx.navigateTo({
          url: '../myCourse/myCourse',
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