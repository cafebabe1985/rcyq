//app.js
import { WxSys } from './net/wxSys.js'

App({
  async onLaunch() {
    // 登录
    wx.login({
      success: async res => {
        const resdata = await WxSys.login(res.code)
        let jsonObj = resdata
        this.globalData.sessionKey = jsonObj.sessionKey
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          let userInforStore = wx.getStorageSync('userInfo') || null
          if (!userInforStore) {
            wx.getUserInfo({
              success: async res => {
                const resdata = await WxSys.getInfo(this.globalData.sessionKey, res.detail)
                console.log("app>>>", resdata)
                wx.setStorageSync('userInfo', resdata)

                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  console.log("callback")
                  this.userInfoReadyCallback(res)
                  let userInforStore = wx.getStorageSync('userInfo') || null
                  if (!userInforStore) {
                    wx.setStorageSync('userInfo', userInforStore)
                  }
                }
              }
            })
          }
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionKey: null
    // apiBaseUrl:'http://localhost:8080/jeecg-boot/'
  }
})