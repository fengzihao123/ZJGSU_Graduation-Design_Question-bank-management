// pages/stuPart/examing/examing.js
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
        answerList:[],
        examId:'',
        temp:'',
        flageA:false,
        flageB:false,
        flageC:false,
        flageD:false,
        temp:'',
        time:1,
        questionList:[],
        show: false,
    },
   

    // 点击全部
    quanbu(){
        this.setData({ show: true });
    },   
    onClose() {
        this.setData({ show: false });
      },

      //获取考试题目
    async getExamQuestion(classId, examId){
        let questionList = await request('/exam/student/getExamQuestion',{classId:classId, examId:examId})
        this.setData({
            questionList
        })
        let stuInfo = wx.getStorageSync('stuInfo')
        let stuId = stuInfo[0].stuId
        for(var i = 0; i < questionList.data.length; i++){
            this.createPostAnswer(
                questionList.data[i].classId,
                questionList.data[i].examId,
                stuId,
                questionList.data[i].queId,
                questionList.data[i].queType,
                )
        }
        this.getAnswerList(examId,stuId)
        
    },
    //获取答案
    async getAnswerList(examId, stuId){
        let answerList = await request('/exam/answer/getAnswer',{examId:examId,stuId:stuId})
        this.setData({
            answerList
        })
    },

    //答案更新
    async updateAnswer(id, answer, myAnswer, queType){
        if(queType == '单选' || queType == '多选' || queType == '填空'){
            if(answer == myAnswer){
                let result = upload('/exam/answer/updateAnswer?id=' + id,{answer, myAnswer, point:2})
            }else{
                let result = upload('/exam/answer/updateAnswer?id=' + id,{answer, myAnswer, point:0})
            }
        } 
        let result = upload('/exam/answer/updateAnswer?id=' + id,{answer, myAnswer})
        console.log(result)
    },

      // 查看index 修改样式
      chageIndex(event){
        let index = event.currentTarget.dataset
        let questionList = this.data.questionList
        let answer =  this.data.answer
        for(var i = 0;i < questionList.data.length;i++){
           if(answer[i]){
            questionList.data[i].selectStatus = '3'
           }else{
            questionList.data[i].selectStatus = '2'
           }
        }
        questionList.data[index.index].selectStatus = '1'
        this.setData({
            index:index.index,
            questionList,
            show:false
        })
    },
    //倒计时结束
    timeFinsh(){
        wx.navigateTo({
            url: '/pages/stuPart/myExam/myExam',
        })
    },

    //上一题
    toPre(){
        let index = this.data.index
        let length = this.data.questionList.data.length
        let questionList = this.data.questionList
        let answer = this.data.answer
        if(answer[index]){
            questionList.data[index].selectStatus = '3'
        }else{
            questionList.data[index].selectStatus = '2'
        }

        if(questionList.data[index].queType == '多选'){
            this.quick_sort()
            let temp = this.data.temp
            let answer = this.data.answer
            answer[index] = temp
            this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
            this.setData({
              answer,
              temp:''
            })
        }
        if(index == 0){
            index = length - 1 

            questionList.data[index].selectStatus = '1'

            if(questionList.data[index].queType == '多选'){
              let answer = this.data.answer
              let temp = this.data.temp
              temp = answer[index] 
              this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
              this.setData({
                  answer,
                  temp,
              })
            }
        }else{
            index = index - 1

            questionList.data[index].selectStatus = '1'

            if(questionList.data[index].queType == '多选'){
              let answer = this.data.answer
              let temp = this.data.temp
              temp = answer[index] 
              this.setData({
                  answer,
                  temp
              })
            }
        }
        // for(var i = 0;i < collectList.length;i++){
        //   collectList[i].is_pcik = 'false'
        // }
        // collectList[index].is_pcik = 'true'
        
        this.setData({
            index:index,
            questionList
        })
    },
    //下一题
    toNext(){
      let index = this.data.index
      let length = this.data.questionList.data.length
      let questionList = this.data.questionList
      let answer = this.data.answer

      if(answer[index]){
        questionList.data[index].selectStatus = '3'
        }else{
            questionList.data[index].selectStatus = '2'
        }

      if(questionList.data[index].queType == '多选'){

          this.quick_sort()
          let temp = this.data.temp
          let answer = this.data.answer
          answer[index] = temp
          this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
          this.setData({
              answer,
              temp:''
          })
      }
      if(index == length - 1){
          index = 0

          questionList.data[index].selectStatus = '1'

          if(questionList.data[index].queType == '多选'){
              let answer = this.data.answer
              let temp = this.data.temp
              temp = answer[index] 
              this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
              this.setData({
                  answer,
                  temp
              })
          }
      }else{
          index = index + 1
          
          questionList.data[index].selectStatus = '1'

          if(questionList.data[index].queType == '多选'){
              let answer = this.data.answer
              let temp = this.data.temp
              temp = answer[index] 
              this.setData({
                  answer,
                  temp
              })
          }
      }
    //   for(var i = 0;i < collectList.length;i++){
    //       collectList[i].is_pcik = 'false'
    //     }
    //     collectList[index].is_pcik = 'true'
        this.setData({
            index:index,
            questionList
        })
  },
  //选择A
  chooseA(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = 'A'
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //取消A
  cancleA(){
      let answer = this.data.answer
      let index = this.data.index
      answer[index] = ''
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },

  //选择B
  chooseB(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = 'B'
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //取消B
  cancleB(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = ''
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //选择C
  chooseC(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = 'C'
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //取消C
  cancleC(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = ''
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },

  //选择D
  chooseD(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = 'D'
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //取消D
  cancleD(){
      let answer = this.data.answer
      let index = this.data.index
      console.log(index)
      answer[index] = ''
      this.setData({
          answer
      })
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },

  //多选选择A
  D_chooseA(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      console.log(temp)
      temp = temp + 'A'
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
          console.log(answer[index].indexOf('A') !== -1)
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
      
  },
  D_cancleA(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp.replace('A','')
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //多选选择B
  D_chooseB(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp + 'B'
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
      
  },
  D_cancleB(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp.replace('B','')
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //多选选择C
  D_chooseC(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp + 'C'
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
      
  },
  D_cancleC(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp.replace('C','')
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  //多选选择D
  D_chooseD(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp + 'D'
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
      
  },
  D_cancleD(){
      let index = this.data.index
      let answer = this.data.answer
      let questionList = this.data.questionList
      let temp = this.data.temp
      temp = temp.replace('D','')
      this.quick_sort()
      if(questionList.data[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
  },
  // 主观题答案获取
  getAnswer(event){
    let daan = event.detail.value
    let index = this.data.index
    let answer = this.data.answer
    answer[index] = daan
    this.setData({
        answer
    })
    this.updateAnswer(this.data.answerList.data[index].id, this.data.questionList.data[index].answer, answer[index], this.data.questionList.data[index].queType)
},

  quick_sort(){
    let temp = this.data.temp
    if(temp != undefined ){
        let A = temp.indexOf('A')
        let B = temp.indexOf('B')
        let C = temp.indexOf('C')
        let D = temp.indexOf('D')
        if(A !== -1 && B !== -1){
            temp = 'AB'
        }if(A !== -1 && C !== -1){
            temp = 'AC'
        }if(A !== -1 && D !== -1){
            temp = 'AD'
        }if(B !== -1 && C !== -1){
            temp = 'BC'
        }if(B !== -1 && D !== -1){
            temp = 'BD'
        }if(C !== -1 && D !== -1){
            temp = 'CD'
        }if(A !== -1 && B !== -1 && C !== -1){
            temp = 'ABC'
        }if(A !== -1 && B !== -1 && D !== -1){
            temp = 'ABD'
        }if(A !== -1 && C !== -1 && D !== -1){
            temp = 'ACD'
        }if(B !== -1 && C !== -1 && D !== -1){
            temp = 'BCD'
        }if(A !== -1 && B !== -1 && C !== -1 && D !== -1){
            temp = 'ABCD'
        }
        this.setData({
            temp
        })
    }  
},  
submit(){
        wx.showModal({
            title: '提示',
            content: '确认提交吗？',
            success (res) {
              if (res.confirm) {
                console.log("提交完成")  
                wx.navigateTo({
                url: '/pages/stuPart/myExam/myExam',
            })
            } 
        }
    })
},

// 创建上传答案
    async createPostAnswer(classId, examId, stuId, queId, queType, answer){
        let result = await upload('/exam/answer/postAnswer',{
            classId,
            examId, 
            stuId, 
            queId, 
            queType,
            answer
        })
        console.log(result)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let examId = options.examId
        let stuInfo = wx.getStorageSync('stuInfo')
        this.setData({
            stuInfo,
            examId
        })
        this.getExamQuestion(stuInfo[0].classId, examId)
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