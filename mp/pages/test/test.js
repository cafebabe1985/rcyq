// pages/test/test.js
const app = getApp()
import { WxSys } from '../../net/wxSys.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 async getPhoneNumber(e){
    console.log(e)
   console.log(app.globalData.sessionKey)
   wx.checkSession({
    async success(){
       let res2 = await WxSys.getPhone(app.globalData.sessionKey, e.detail)
       console.log(res2)
     },
     fail(){
       wx.login({
         success: async res => {
           const resdata = await WxSys.login(res.code)
           let jsonObj = resdata
           app.globalData.sessionKey = jsonObj.sessionKey
           // 发送 res.code 到后台换取 openId, sessionKey, unionId
           let res3 = await WxSys.getPhone(app.globalData.sessionKey, e.detail)
           console.log(res3)
         }
       })
     }
   })
  let data = e.detail
   
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