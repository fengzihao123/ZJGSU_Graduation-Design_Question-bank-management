// pages/stuPart/examing/examing.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        answer:[],
        temp:'',
        flageA:false,
        flageB:false,
        flageC:false,
        flageD:false,
        temp:'',
        time:1,
        collectList:[
            {
                "queId": "1324612474954258",
                "queType": "单选",
                "stem": "基家将步族发必细眼青厂求资多那。调却展利方集样打红变值来始府做听观。我成其动示指就解白把马般育引资会天。织重机十增用率军机加议容形还或听回林。存不拉些会即种两在间压素入响。",
                "choiceA": "器层革带面况万果子计六观文。",
                "choiceB": "少任里结省调总问意位革传江它立工选。",
                "choiceC": "目快斗系取今车了光选千界。",
                "choiceD": "其强光采家计队期多办道示存级市。",
                "chaName": "第2章",
                "difficulty": "1",
                "answer": "超",
                "explain": "联些选级政存不队命两级维直。心向边与二立往者名住众多今提从。据较最现不力安度历手反派么。心万机参做及越起论论去率员之法面八。术县儿温由算得它率是然马本增要。农已压院便据起九相列如命认。",
                "isCollect": "true",
                "selectStatus":"1"
            },
            {
                "queId": "881823182184393",
                "queType": "多选",
                "stem": "记角教门现今争响地将育治转十问角持。非越实再许信计断对每提象论林。她眼需并规存般究儿克律器查。此识民向政发给军半过空据即少音。",
                "choiceA": "算质同少会受农意器劳取采米常温支。",
                "choiceB": "什铁已所史亲义自求名音劳北。",
                "choiceC": "果反离近由青现属出或面声走眼与际。",
                "choiceD": "只制体响酸五安产要受也传联好何及。",
                "chaName": "第1章",
                "difficulty": "5",
                "answer": "强",
                "explain": "准先说究万党问类布物议单地切合老。子书克水表取划育次准社性县指解地。但调次但却路周热细代求产月般层已快节。王并且面事场第他达面用实九的满同革。可边自内物体进且每技太高报油许使。口所关况门些性例每马文消化科美整。很林太结主认会见快心关解。",
                "isCollect": "true",
                "selectStatus":"2"
            },
            {
                "queId": "4455535709600350",
                "queType": "填空",
                "stem": "状几变程团常资七周意支毛重史可得具。行类商研价体科理太志象变放化细。且它何经设五领科间第教状包使起满。样写道林六活历空外不据权手听手气马。行道日命政资率候此备真该历计近保习。发何十时回农象边号山器重因记几常。",
                "choiceA": null,
                "choiceB": null,
                "choiceC": null,
                "choiceD": null,
                "chaName": "第2章",
                "difficulty": "4",
                "answer": "军",
                "explain": "这南先向联书方就和化识酸广。强清已约六多加格中记书委。此断张八观利动采科家响广认科条设没断。",
                "isCollect": "true",
                "selectStatus":"2"
            },
            {
                "queId": "8396874067531420",
                "queType": "计算",
                "stem": "对成而细你好中劳四还门了安。红用式构别装色而群及思事物开千快素。看传小任响你场油主前信住没期王。复来性水写较切话细列性步列。",
                "choiceA": null,
                "choiceB": null,
                "choiceC": null,
                "choiceD": null,
                "chaName": "第2章",
                "difficulty": "2",
                "answer": "娜",
                "explain": "比形示易共受感色约间生求后完清。第需入观海新克难种需方类采路权务政原。到飞种料象造己海小观及新强资革。单学般论育前里儿物风育入号义南精消布。",
                "isCollect": "true",
                "selectStatus":"2"
            },
            {
                "queId": "390807626540014",
                "queType": "问答",
                "stem": "力取根图产济成最用想红事万单却于济种。这技指很权水证任理新自利听复毛。就写达子现书深王口命年统心查。广何开二党意土般县身那正由须候来。示般热是复战还统边准道很此别圆间增。基今影反相她但用几片院消放规己劳。",
                "choiceA": null,
                "choiceB": null,
                "choiceC": null,
                "choiceD": null,
                "chaName": "第5章",
                "difficulty": "3",
                "answer": "娟",
                "explain": "走拉高具青铁事响里两两相了深于定。验工造主断教住出并动实社行型商较声般。它算周音济资然效选型过达以族北。资革原算前族即气工此离声形。者很又事感质华县写律道持身题历常。光么各连强车较整采许儿式产构识体近程。",
                "isCollect": "true",
                "selectStatus":"2"
            },
            {
                "queId": "390807626540014",
                "queType": "编程",
                "stem": "力取根图产济成最用想红事万单却于济种。这技指很权水证任理新自利听复毛。就写达子现书深王口命年统心查。广何开二党意土般县身那正由须候来。示般热是复战还统边准道很此别圆间增。基今影反相她但用几片院消放规己劳。",
                "choiceA": null,
                "choiceB": null,
                "choiceC": null,
                "choiceD": null,
                "chaName": "第5章",
                "difficulty": "3",
                "answer": "娟",
                "explain": "走拉高具青铁事响里两两相了深于定。验工造主断教住出并动实社行型商较声般。它算周音济资然效选型过达以族北。资革原算前族即气工此离声形。者很又事感质华县写律道持身题历常。光么各连强车较整采许儿式产构识体近程。",
                "isCollect": "true",
                "selectStatus":"2"
            }
        
        ],
        show: false,
    },
   

    // 点击全部
    quanbu(){
        this.setData({ show: true });
    },   
    onClose() {
        this.setData({ show: false });
      },

      // 查看index 修改样式
      chageIndex(event){
        let index = event.currentTarget.dataset
        let collect = this.data.collectList
        let answer =  this.data.answer
        for(var i = 0;i < collect.length;i++){
           if(answer[i]){
            collect[i].selectStatus = '3'
           }else{
            collect[i].selectStatus = '2'
           }
        }
        collect[index.index].selectStatus = '1'
        this.setData({
            index:index.index,
            collectList:collect,
            show:false
        })
    },
    //倒计时结束
    timeFinsh(){
        console.log("jieshu")
        // 提交
    },

    //上一题
    toPre(){
        let index = this.data.index
        let length = this.data.collectList.length
        let collectList = this.data.collectList
        let answer = this.data.answer
        if(answer[index]){
            collectList[index].selectStatus = '3'
        }else{
            collectList[index].selectStatus = '2'
        }

        if(collectList[index].queType == '多选'){
            this.quick_sort()
            let temp = this.data.temp
            let answer = this.data.answer
            answer[index] = temp
            this.setData({
              answer,
              temp:''
            })
        }
        if(index == 0){
            index = length - 1 

            collectList[index].selectStatus = '1'

            if(collectList[index].queType == '多选'){
              let answer = this.data.answer
              let temp = this.data.temp
              temp = answer[index] 
              this.setData({
                  answer,
                  temp,
              })
            }
        }else{
            index = index - 1

            collectList[index].selectStatus = '1'

            if(collectList[index].queType == '多选'){
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
            collectList,
        })
    },
    //下一题
    toNext(){
      let index = this.data.index
      let length = this.data.collectList.length
      let collectList = this.data.collectList
      let answer = this.data.answer

      if(answer[index]){
        collectList[index].selectStatus = '3'
        }else{
            collectList[index].selectStatus = '2'
        }

      if(collectList[index].queType == '多选'){

          this.quick_sort()
          let temp = this.data.temp
          let answer = this.data.answer
          answer[index] = temp
          this.setData({
              answer,
              temp:''
          })
      }
      if(index == length - 1){
          index = 0

          collectList[index].selectStatus = '1'

          if(collectList[index].queType == '多选'){
              let answer = this.data.answer
              let temp = this.data.temp
              temp = answer[index] 
              this.setData({
                  answer,
                  temp
              })
          }
      }else{
          index = index + 1
          
          collectList[index].selectStatus = '1'

          if(collectList[index].queType == '多选'){
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
            collectList,
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
  },
  //取消A
  cancleA(){
      let answer = this.data.answer
      let index = this.data.index
      answer[index] = ''
      this.setData({
          answer
      })
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
  },

  //多选选择A
  D_chooseA(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      console.log(temp)
      temp = temp + 'A'
      
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
          console.log(answer[index].indexOf('A') !== -1)
      }
      
  },
  D_cancleA(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp.replace('A','')
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
  },
  //多选选择B
  D_chooseB(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp + 'B'
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      
  },
  D_cancleB(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp.replace('B','')
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
  },
  //多选选择C
  D_chooseC(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp + 'C'
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      
  },
  D_cancleC(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp.replace('C','')
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
  },
  //多选选择D
  D_chooseD(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp + 'D'
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
      
  },
  D_cancleD(){
      let index = this.data.index
      let answer = this.data.answer
      let collectList = this.data.collectList
      let temp = this.data.temp
      temp = temp.replace('D','')
      if(collectList[index].queType == '多选'){
          answer[index] = temp
          this.setData({
              answer,
              temp
          })
      }
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
    let answer = this.data.answer
    let length1 = this.data.collectList.length
    let length2 = answer.length
    if(length1 == length2){
        //  题目全部完成
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
    }else{
        wx.showModal({
            title: '提示',
            content: '有题目未完成，确认提交吗？',
            success (res) {
              if (res.confirm) {
                  console.log("提交完成")
                  wx.navigateTo({
                    url: '/pages/stuPart/myExam/myExam',
                  })
              } 
            }
          })
    }
    
   
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