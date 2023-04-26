// pages/stuPart/gradeDetailClass/gradeDetailClass.js
import request from '../../../utils/request'
import * as echarts from '../../../ec-canvas/echarts'
let chart = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionList: [],
        ec:{
            onInit: initChart
          },
          countData: []
    },

    async getGradeList(examId){
        let gradeList = await request('/grade/student/getGradeTeacher',{examId})
        let questionList = await  request('/exam/student/getExamQuestionTOP',{examId})
        var countData = []
        var value0_59 = 0;
        var value60_69 = 0;
        var value70_79 = 0;
        var value80_89 = 0;
        var value90_100 = 0;
    for(var i = 0; i < gradeList.data.length; i++){
        if(gradeList.data[i].score < 60){
            value0_59++
        }else if(60 <= gradeList.data[i].score && gradeList.data[i].score < 70){
            value60_69++
        }else if(70 <= gradeList.data[i].score && gradeList.data[i].score < 80){
            value70_79++
        }else if(80 <= gradeList.data[i].score && gradeList.data[i].score < 90){
            value80_89++
        }else if(90 <= gradeList.data[i].score && gradeList.data[i].score <= 100){
            value90_100++
        }
        countData = [
            {value: value0_59, name:'0-59'},
            {value: value60_69, name:'60-69'},
            {value: value70_79, name:'70-79'},
            {value: value80_89, name:'80-89'},
            {value: value90_100, name:'90-100'},
        ]
    }
        this.setData({
            questionList
        })
        wx.setStorageSync('countData', countData)
    },
    toQuestionDetail(event){
        let queId = event.currentTarget.dataset.que.queId
        wx.navigateTo({
          url: '../questionDetail/questionDetail?queId=' + queId,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let examId = options.examId
        this.getGradeList(examId)
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
// 初始化
function initChart(canvas,width,height,dpr){
    chart = echarts.init(canvas,null,{
      width:width,
      height:height,
      devicePixelRatio:dpr
    })
    canvas.setChart(chart)
    let option = getOption() //echarts 的配置信息
  
    chart.setOption(option)
    return chart
  }
   function  getOption(){
    let countData = wx.getStorageSync('countData')
    return {
        title: {
            text: '学生成绩分数段统计',
            subtext: 'Evaluation System',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: countData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
  }