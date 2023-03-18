// pages/stuPart/examing/examing.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        is_danxuan:false,
        is_duoxuan:false,
        is_jisuan:false,
        is_tiankong:true,
        is_wenda:false,
        is_biancheng:false
    },
    // 获取答案
    getAnswer(event){
        console.log(event.detail.value)
    },
    // 点击单选
    select_danxuan(){
        let is_duoxuan = false
        let is_jisuan = false
        let is_tiankong = false
        let is_wenda = false
        let is_biancheng = false
        let is_danxuan = true
        this.setData({
            is_danxuan,
            is_duoxuan,
            is_tiankong,
            is_jisuan,
            is_wenda,
            is_biancheng
        })
        //this.onShow()
    },

    // 点击多选
    select_duoxuan(){
        let is_danxuan = false
        let is_jisuan = false
        let is_tiankong = false
        let is_wenda = false
        let is_biancheng = false
        let is_duoxuan = true
        this.setData({
            is_danxuan,
            is_duoxuan,
            is_tiankong,
            is_jisuan,
            is_wenda,
            is_biancheng
        })
        //this.onShow()
    },
    // 点击填空
    select_tiankong(){
        let is_danxuan = false
        let is_jisuan = false
        let is_duoxuan = false
        let is_wenda = false
        let is_biancheng = false
        let is_tiankong = true
        this.setData({
            is_danxuan,
            is_duoxuan,
            is_tiankong,
            is_jisuan,
            is_wenda,
            is_biancheng
        })
        //this.onShow()
    },
     // 点击计算
     select_jisuan(){
        let is_danxuan = false
        let is_tiankong = false
        let is_duoxuan = false
        let is_wenda = false
        let is_biancheng = false
        let is_jisuan = true
        this.setData({
            is_danxuan,
            is_duoxuan,
            is_tiankong,
            is_jisuan,
            is_wenda,
            is_biancheng
        })
        //this.onShow()
    },
    // 点击问答
    select_wenda(){
        let is_danxuan = false
        let is_tiankong = false
        let is_duoxuan = false
        let is_jisuan = false
        let is_biancheng = false
        let is_wenda = true
        this.setData({
            is_danxuan,
            is_duoxuan,
            is_tiankong,
            is_jisuan,
            is_wenda,
            is_biancheng
        })
        //this.onShow()
    },
    // 点击编程
    select_biancheng(){
        let is_danxuan = false
        let is_tiankong = false
        let is_duoxuan = false
        let is_jisuan = false
        let is_wenda = false
        let is_biancheng = true
        this.setData({
            is_danxuan,
            is_duoxuan,
            is_tiankong,
            is_jisuan,
            is_wenda,
            is_biancheng
        })
        //this.onShow()
    },

    // 点击全部
    quanbu(){
        this.setData({ show: true });
    },   
    onClose() {
        this.setData({ show: false });
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