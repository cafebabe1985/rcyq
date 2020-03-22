// pages/person/person.js
import {
  User
} from '../../net/user.js'
import {
  Active
} from '../../net/active.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    favorCount:0,
    activityCount:0,
    scoreCount:0
  },
async getUserInfo(){
  let userInfo = wx.getStorageSync("userInfo")
  
  if (userInfo && userInfo.openId) {
    
  let res = await User.getByOpenId(userInfo.openId)
   
  if(res.success){
    
    this.setData({
      userInfo:res.result
    })
  }
  
    return res.result
  }
  return null
  
},
  async countEnrolCount(userOpneId){
    let res =await Active.listActiveEnrol({ userOpneId: userOpneId})
   
   return res.result
},
  async countFavorCount(userOpneId){
    let res = await Active.listActiveFavorite({ userOpneId: userOpneId })

    return res.result
},
  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  goApplyScenic(){
    if(this.data.userInfo.vipLevel === '1'){
      return
    }
    wx.navigateTo({
      url: '/pages/applyScenicManager/applyScenicManager',
    })
  },
  copyOpenId(){
    
    wx.setClipboardData({
      data: this.data.userInfo.openId,
      success:(res)=>{
          wx.showToast({
          title: '已复制ID到剪切板',
          icon:'success',
          duration:1000
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.hideShareMenu()
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow () {
    let userInfo = await this.getUserInfo()

    let favorCountMax = 0
    let activityCountMax = 0
    let scoreCountMax = 0
    let resActive = await this.countEnrolCount(userInfo.openId)
    let resFavor = await this.countFavorCount(userInfo.openId)

    if (userInfo) {
      favorCountMax = resFavor.length
      scoreCountMax = userInfo.accumulatePoint || 0
      activityCountMax = resActive.length

    }
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            favorCount: that.data.favorCount >= favorCountMax ? favorCountMax : i,
            activityCount: that.data.activityCount >= activityCountMax ? activityCountMax : i,
            scoreCount: that.data.scoreCount >= scoreCountMax ? scoreCountMax : i
          })
          i++
          numDH();
        }, 70)
      } else {
        that.setData({
          favorCount: that.coutNum(favorCountMax),
          activityCount: that.coutNum(activityCountMax),
          scoreCount: that.coutNum(scoreCountMax)
        })
      }
    }
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
      
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