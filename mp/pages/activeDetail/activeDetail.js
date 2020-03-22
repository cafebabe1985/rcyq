import {
  Active
} from '../../net/active.js'
import { formatRichText, scanVideo } from '../../utils/formatHtml.js'
import {
  config
} from '../../config/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    favorite:false,
    preview:false,
    options:null,
    content:[],
    enrolUsers:null,
    enrolAvatars:null,
    userInfo:null,
      detail:null,
      TabCur: 0,
      tabs:[
        "详情",
        "报名",
        // "相册"
      ]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
     
    })
  },
  formatRichText(detail){
    if(!detail){
      return  []
    }
    let cstr = formatRichText(detail)
   
    let videoObj = scanVideo(cstr)
    let contents = []
    for (let i = 0; i < videoObj.srcList.length; i++) {
      let cellT = {
        type: 0,
        content: videoObj.richTexts[i]
      }
      let cellV = {
        type: 1,
        src: videoObj.srcList[i]
      }
      contents.push(cellT)
      contents.push(cellV)
    }
    contents.push({
      type: 0,
      content: videoObj.richTexts.pop()
    })
    return contents
  },
  
  async getDetail(options){
    let content = []
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '活动详情'
      })
      let res = await Active.getActiveById(options.id)
     
      content = this.formatRichText(res.result.detail)
     
      let activeId = res.result.id
      let enrolRes = await Active.listActiveEnrol({
        activeId:activeId
      })
      
      let enrolAvatars = enrolRes.result.filter((v,i,arr)=>{
        return v.userInfo
      })
      
      this.setData({
        detail: res.result,
        content:content,
        enrolUsers:enrolRes.result,
        enrolAvatars:enrolAvatars.slice(0,8),
        preview:false
      })

    } else {
      wx.setNavigationBarTitle({
        title: '活动预览'
      })
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('acceptData', (data) => {
        content = this.formatRichText(data.detail)
        this.setData({
          detail: data,
          content:content,
          preview:true
        })
      })
    }
    this.checkFavorite()
   wx.hideLoading()
  },
 async goEnrolPage(e){
   if (this.data.detail.cost.number && this.data.enrolUsers.length == this.data.detail.cost.number) {

     wx.showToast({
       title: '名额已满',
       icon: 'none',
       duration: 1000
     })
     return
   }
    let agent = e.currentTarget.dataset.agent
    if(agent == "false"){
     let res = await Active.checkReEnrol({
        activeId:this.data.detail.id,
       userOpneId: this.data.userInfo.openId
      })
      if(!res.success){
        wx.showToast({
          title: res.message,
          icon:'none'
        })
        return
      }
    }
  

    wx.navigateTo({
      url: `/pages/enrolPage/enrolPage?agent=${agent}`,
      success:(res)=>{
        res.eventChannel.emit('acceptData', this.data.detail)
      }
    })
  },
  contactCreator(e){
      wx.makePhoneCall({
        phoneNumber: this.data.detail.phone,
      })
  },
 async addFavorite(){
   
   if(this.data.favorite){
     return 
   }
    let userOpenId = this.data.userInfo.openId
    let activeId = this.data.detail.id
   let res = await Active.addActiveFavorite({
      userOpenId:userOpenId,
      activeId:activeId
    })
    
    if(res.success){
      this.setData({
        favorite:true
      })
    }
  },
 async checkFavorite(){
   let res = await Active.checkActiveFavorite({
      userOpenId: this.data.userInfo.openId,
      activeId: this.data.detail.id
    })
    if(res.result>0){
      this.setData({
        favorite:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.showLoading({
      title: '加载中'
    })
   let userInfo = wx.getStorageSync("userInfo")
   if(userInfo){
     this.setData(
       {
         userInfo: userInfo
       }
     )
   }else{
     wx.navigateTo({
       url: '/pages/index/index',
     })
   }

   this.data.options = options  
     
  },
  goAllEnrolUsers(){
    wx.navigateTo({
      url: '/pages/enrolUserPage/enrolUserPage',
      success:(res)=>{
        res.eventChannel.emit('acceptData', 
        {
          users: this.data.enrolUsers,
          enrolWriteOpts: this.data.detail.enrolWriteOpts
        }
       
        )
      }
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
  onShow() {
    if(!this.data.userInfo){
      this.data.userInfo =wx.getStorageSync("userInfo")
    }
    this.getDetail(this.data.options)
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
  onShareAppMessage () {
    return {
      title:this.data.detail.name,
      path: `/pages/activeDetail/activeDetail?id=${this.data.detail.id}`,
      imageUrl: this.data.detail.poster
    }
  }
})