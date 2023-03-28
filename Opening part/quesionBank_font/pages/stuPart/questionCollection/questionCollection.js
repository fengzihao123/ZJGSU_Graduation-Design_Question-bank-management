// pages/stuPart/historyError/historyError.js
import Dialog from '@vant/weapp/dialog/dialog';
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        answer:[],
        temp:'',
        result: ['a', 'b'],
        flageA:false,
        flageB:false,
        flageC:false,
        flageD:false,
        temp:'',
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
                "is_pcik":"true"
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
                "is_pcik":"false"
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
                "is_pcik":"false"
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
                "is_pcik":"false"
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
                "is_pcik":"false"
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
                "is_pcik":"false"
            }
        
        ],
        show: false,
    },


    // 收藏
    collect(){
        let index = this.data.index
        let collectList = this.data.collectList
        collectList[index].isCollect = true
        this.setData({
            collectList
        })

    },
    //取消收藏
    no_collect(){
        let index = this.data.index
        let collectList = this.data.collectList
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认取消收藏吗？',
            success (res) {
              if (res.confirm) {
                collectList[index].isCollect = false
                that.setData({
                    collectList
                })
              } else if (res.cancel) {
              }
            }
          })
       
    },
    //删除
    shanchu(){
        let index = this.data.index
        let collectList = this.data.collectList
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认删除吗？',
            success (res) {
              if (res.confirm) {
                collectList[index].isCollect = false
                that.setData({
                    collectList
                })
              } else if (res.cancel) {
              }
            }
          })
    },
    // 点击全部
    quanbu(){
        this.setData({ show: true });
    },   
    onClose() {
        this.setData({ show: false });
      },

      //错题列表获取
      async getCollectList(){
          let collectList = await request('/question/collect/getCollection',{stuId:'1911060118'})
          this.setData({
              collectList
          })
      },

      // 查看index
      chageIndex(event){
          let index = event.currentTarget.dataset
          let collect = this.data.collectList
          for(var i = 0;i < collect.length;i++){
             collect[i].is_pcik = 'false'
          }
          collect[index.index].is_pcik = 'true'
          this.setData({
              index:index.index,
              collectList:collect,
              show:false
          })
      },
      //上一题
      toPre(){
          let index = this.data.index
          let length = this.data.collectList.length
          let collectList = this.data.collectList
          if(index == 0){
              index = length - 1 
          }else{
              index = index - 1
          }
          for(var i = 0;i < collectList.length;i++){
            collectList[i].is_pcik = 'false'
          }
          collectList[index].is_pcik = 'true'
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
        if(index == length - 1){
            index = 0
    
        }else{
            index = index + 1
        }
        for(var i = 0;i < collectList.length;i++){
            collectList[i].is_pcik = 'false'
          }
          collectList[index].is_pcik = 'true'
          this.setData({
              index:index,
              collectList,
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