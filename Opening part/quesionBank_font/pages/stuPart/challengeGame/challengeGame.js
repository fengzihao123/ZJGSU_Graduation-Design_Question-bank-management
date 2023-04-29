// pages/stuPart/examing/examing.js
import request from '../../../utils/request'
import upload from '../../../utils/upload'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        isSuccess:true,
        answer:[],
        stuInfo:[],
        curName: '',
        questionList:[],
        stuId: '',
        stuName: '',
        answerList:[],
        examDetail:[],
        examId:'',
        score:0,
        isImg:false,
        isFlaseImg:false,
        isTime:false,
        level:1,
        temp:'',
        flageA:false,
        flageB:false,
        flageC:false,
        flageD:false,
        temp:'',
        time:0.167,
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
    async getChallengeQuestion(level, curName){
        if(level == 1){
            let questionList = [];
            // 0.6 0.2 0.1 0.1 0
            let result1 = await request('/question/question/getQuestionTen',{curName, difficulty:1, num:6 })
            for(var i = 0; i < result1.data.length; i++){
                questionList.push(result1.data[i])
            }
            let result2 = await request('/question/question/getQuestionTen',{curName, difficulty:2, num:2 })
            for(var i = 0; i < result2.data.length; i++){
                questionList.push(result2.data[i])
            }
            let result3 = await request('/question/question/getQuestionTen',{curName, difficulty:3, num:1 })
            for(var i = 0; i < result3.data.length; i++){
                questionList.push(result3.data[i])
            }
            let result4 = await request('/question/question/getQuestionTen',{curName, difficulty:4, num:1 })
            for(var i = 0; i < result4.data.length; i++){
                questionList.push(result4.data[i])
            }
            this.setData({
                questionList,
                time:0.167,
                index:0,
                answer:[]
            })
       }else if(level == 2){
        let questionList = [];
        // 0.3 0.3 0.2 0.1 0.1
        let result1 = await request('/question/question/getQuestionTen',{curName, difficulty:1, num:3 })
        for(var i = 0; i < result1.data.length; i++){
            questionList.push(result1.data[i])
        }
        let result2 = await request('/question/question/getQuestionTen',{curName, difficulty:2, num:3})
        for(var i = 0; i < result2.data.length; i++){
            questionList.push(result2.data[i])
        }
        let result3 = await request('/question/question/getQuestionTen',{curName, difficulty:3, num:2 })
        for(var i = 0; i < result3.data.length; i++){
            questionList.push(result3.data[i])
        }
        let result4 = await request('/question/question/getQuestionTen',{curName, difficulty:4, num:1 })
        for(var i = 0; i < result4.data.length; i++){
            questionList.push(result4.data[i])
        }
        let result5 = await request('/question/question/getQuestionTen',{curName, difficulty:5, num:1 })
        for(var i = 0; i < result5.data.length; i++){
            questionList.push(result5.data[i])
        }
        this.setData({
            questionList,
            time:0.167,
            index:0,
            answer:[]
        })
   }else if(level == 3){
    let questionList = [];
    // 0.3 0.3 0.2 0.1 0.1
    let result1 = await request('/question/question/getQuestionTen',{curName, difficulty:1, num:2 })
    for(var i = 0; i < result1.data.length; i++){
        questionList.push(result1.data[i])
    }
    let result2 = await request('/question/question/getQuestionTen',{curName, difficulty:2, num:3})
    for(var i = 0; i < result2.data.length; i++){
        questionList.push(result2.data[i])
    }
    let result3 = await request('/question/question/getQuestionTen',{curName, difficulty:3, num:3 })
    for(var i = 0; i < result3.data.length; i++){
        questionList.push(result3.data[i])
    }
    let result4 = await request('/question/question/getQuestionTen',{curName, difficulty:4, num:2 })
    for(var i = 0; i < result4.data.length; i++){
        questionList.push(result4.data[i])
    }
    let result5 = await request('/question/question/getQuestionTen',{curName, difficulty:5, num:1 })
    for(var i = 0; i < result5.data.length; i++){
        questionList.push(result5.data[i])
    }
    this.setData({
        questionList,
        time:0.167,
        index:0,
        answer:[]
    })
}else if(level >= 4){
    let questionList = [];
    // 0.3 0.3 0.2 0.1 0.1
    let result1 = await request('/question/question/getQuestionTen',{curName, difficulty:1, num:2 })
    for(var i = 0; i < result1.data.length; i++){
        questionList.push(result1.data[i])
    }
    let result2 = await request('/question/question/getQuestionTen',{curName, difficulty:2, num:3})
    for(var i = 0; i < result2.data.length; i++){
        questionList.push(result2.data[i])
    }
    let result3 = await request('/question/question/getQuestionTen',{curName, difficulty:3, num:2 })
    for(var i = 0; i < result3.data.length; i++){
        questionList.push(result3.data[i])
    }
    let result4 = await request('/question/question/getQuestionTen',{curName, difficulty:4, num:2 })
    for(var i = 0; i < result4.data.length; i++){
        questionList.push(result4.data[i])
    }
    let result5 = await request('/question/question/getQuestionTen',{curName, difficulty:5, num:2 })
    for(var i = 0; i < result5.data.length; i++){
        questionList.push(result5.data[i])
    }
    this.setData({
        questionList,
        time:0.167,
        index:0,
        answer:[]
    })
}
        
    },
    //获取答案
    async getAnswerList(examId, stuId){
        let answerList = await request('/exam/answer/getAnswer',{examId:examId,stuId:stuId})
        this.setData({
            answerList
        })
    },
    //答案更新
    async updateAnswer(id, answer, myAnswer, stem, queType){
        if(queType == '单选'){
            if(answer == myAnswer){
                let result = upload('/exam/answer/updateAnswer?id=' + id,{answer, myAnswer, stem, point:this.data.examDetail.data[0].DanXScore})
            }else{
                let result = upload('/exam/answer/updateAnswer?id=' + id,{answer, myAnswer, stem, point:0})
            }
        } 
    },
    //倒计时结束
    timeFinsh(){
        this.setData({
            isTime:true
        })
        setTimeout(()=>{
            this.setData({
                isSuccess:false,
                isTime:false
            })
            this.newChallenge()
        }, 1500)
    },

  //选择A
  chooseA(){
      let answer = this.data.answer
      let index = this.data.index
      let score = this.data.score
      answer[index] = 'A'
      this.setData({
          answer
      })

      if(answer[index] == this.data.questionList[index].answer){
          if(this.data.questionList[index].difficulty == 1){
              score = score + 100;
          }else if(this.data.questionList[index].difficulty == 2){
              score = score + 110;
          }else if(this.data.questionList[index].difficulty == 3){
              score = score + 130;
          }else if(this.data.questionList[index].difficulty == 4){
              score = score + 150;
          }else if(this.data.questionList[index].difficulty == 5){
              score = score + 200;
          }
          this.setData({
            time:0.1,
            isImg:true
        })
        setTimeout(()=>{
        index++
        if(index == 4){
            this.setData({
                time:0.5,
                index,
                score,
                isImg:false
            })
        }else{
        this.setData({
            time:0.166,
            index,
            score,
            isImg:false
            })
        }  
        }, 1200)
      }else{

        this.setData({
            isFlaseImg:true
        })
        setTimeout(()=>{
            this.setData({
                isSuccess:false,
                isFlaseImg:false
            })
            this.newChallenge()
        }, 2500)
      }
  },
  //选择B
  chooseB(){
      let answer = this.data.answer
      let index = this.data.index
      let score = this.data.score
      answer[index] = 'B'
      this.setData({
        answer
    })

      if(answer[index] == this.data.questionList[index].answer){
        if(this.data.questionList[index].difficulty == 1){
            score = score + 100;
        }else if(this.data.questionList[index].difficulty == 2){
            score = score + 110;
        }else if(this.data.questionList[index].difficulty == 3){
            score = score + 130;
        }else if(this.data.questionList[index].difficulty == 4){
            score = score + 150;
        }else if(this.data.questionList[index].difficulty == 5){
            score = score + 200;
        }
        this.setData({
            time:0.1,
            isImg:true,
        })
        setTimeout(()=>{
            index++
        if(index == 4){
            this.setData({
                time:0.5,
                index,
                score,
                isImg:false
            })
        }else{
          this.setData({
              time:0.168,
              index,
              score,
              isImg:false
            })
        }  
          }, 1200)
        
    }else{
        this.setData({
            isFlaseImg:true
        })
        setTimeout(()=>{
            this.setData({
                isSuccess:false,
                isFlaseImg:false
            })
            this.newChallenge()
        }, 2500)
    }
  },
  //选择C
  chooseC(){
      let answer = this.data.answer
      let index = this.data.index
      let score = this.data.score    
      answer[index] = 'C'
      this.setData({
        answer
    })

      if(answer[index] == this.data.questionList[index].answer){
        if(this.data.questionList[index].difficulty == 1){
            score = score + 100;
        }else if(this.data.questionList[index].difficulty == 2){
            score = score + 110;
        }else if(this.data.questionList[index].difficulty == 3){
            score = score + 130;
        }else if(this.data.questionList[index].difficulty == 4){
            score = score + 150;
        }else if(this.data.questionList[index].difficulty == 5){
            score = score + 200;
        }
        this.setData({
            time:0.1,
            isImg:true,
        })
        setTimeout(()=>{
            index++
        if(index == 4){
            this.setData({
                time:0.5,
                index,
                score,
                isImg:false
            })
        }else{
          this.setData({
              time:0.169,
              index,
              score,
              isImg:false
            })
        }  
          }, 1200)
    }else{
        this.setData({
            isFlaseImg:true
        })
        setTimeout(()=>{
            this.setData({
                isSuccess:false,
                isFlaseImg:false
            })
            this.newChallenge()
        }, 2500)
    }
  },
  //选择D
  chooseD(){
      let answer = this.data.answer
      let index = this.data.index
      let score = this.data.score
      answer[index] = 'D'
      this.setData({
        answer
    })
      
      if(answer[index] == this.data.questionList[index].answer){
        if(this.data.questionList[index].difficulty == 1){
            score = score + 100;
        }else if(this.data.questionList[index].difficulty == 2){
            score = score + 110;
        }else if(this.data.questionList[index].difficulty == 3){
            score = score + 130;
        }else if(this.data.questionList[index].difficulty == 4){
            score = score + 150;
        }else if(this.data.questionList[index].difficulty == 5){
            score = score + 200;
        }
        this.setData({
            time:0.1,
            isImg:true,
        })
        setTimeout(()=>{
            index++
        if(index == 4){
            this.setData({
                time:0.5,
                index,
                score,
                isImg:false
            })
        }else{
          this.setData({
              time:0.165,
              index,
              score,
              isImg:false
            })
        }  
        }, 1200)
        
    }else{
        this.setData({
            isFlaseImg:true
        })
        setTimeout(()=>{
            this.setData({
                isSuccess:false,
                isFlaseImg:false
            })
            this.newChallenge()
        }, 2500)
    }
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
        let curName = options.curName
        let stuId = options.stuId
        let stuName = options.stuName
        this.setData({
          curName,
          stuId,
          stuName
        })
        this.getChallengeQuestion(this.data.level, curName)
    },

    //前往下一关
    nextLevel(){
        let level = this.data.level
        level = level + 1
        this.setData({
            level
        })
        this.getChallengeQuestion(level,this.data.curName)
    },

    async newChallenge(){
        let curName = this.data.curName;
        let stuId = this.data.stuId;
        let stuName = this.data.stuName
        let score = this.data.score
        let result = await request('/challenge/socre/getScore',{stuId, curName})
        let count = result.data.length
        count++
        await upload('/challenge/socre/newScore',{curName, stuId, stuName, score, count})
    },

    backPage(){
        wx.reLaunch({
          url: '../tenChallenge/tenChallenge',
        })
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