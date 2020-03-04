//index.js
//获取应用实例
import { WxSys } from '../../net/wxSys.js'
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '欢迎使用儒此有趣微信小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {
    
  },
  async getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.checkSession({
     async success(){
        let resdata = await WxSys.getInfo(app.globalData.sessionKey, e.detail)
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        let storageUser = wx.getStorageSync('userInfo')
        if (!storageUser) {
          wx.setStorageSync('userInfo', resdata)
        }
        wx.navigateBack({
          delta: 1
        })
      },
     async fail(){
        wx.login({
          success: async res => {
            let resdata = await WxSys.login(res.code)
            let jsonObj = resdata
            app.globalData.sessionKey = jsonObj.sessionKey
            let resdata2 = await WxSys.getInfo(app.globalData.sessionKey, e.detail)
            this.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true
            })
            let storageUser = wx.getStorageSync('userInfo')
            if (!storageUser) {
              wx.setStorageSync('userInfo', resdata2)
            }
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
      
  }
})
