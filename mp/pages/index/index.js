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
  goHome(){
    console.log("gohome")
    wx.switchTab({
      url: '/pages/home/home'
    })
    // wx.navigateTo({
    //   url: '/pages/home/home',
    // })
  },
  async onLoad(opts) {
    // wx.setStorageSync("userInfo", null)
    let userInfo = wx.getStorageSync("userInfo")
    console.log(userInfo)
    if (userInfo) {
      wx.showLoading({
        title: '登录中',
      })
      let loginFirst = await WxSys.loginSys({
        username: userInfo.openId,
        password: userInfo.openId,
        captcha: 'cafebabe'
      })
      console.log(loginFirst)
      if (loginFirst.success) {
        wx.setStorageSync("token", loginFirst.result.token)
       // this.setUserInfo(sessionKey, obj)
        //跳转
      } else {
        let registRes = await WxSys.registWx({
          openId: userInfo.openId,
          type: 'wx'
        })
        if (registRes.success) {
          //尝试登录
          let loginRes = await WxSys.loginSys({
            username: userInfo.openId,
            password: userInfo.openId,
            captcha: 'cafebabe'
          })
          console.log(loginRes)
          wx.setStorageSync("token", loginRes.result.token)
         // this.setUserInfo(sessionKey, obj)
          //跳转
        }
      }
      wx.hideLoading()
      this.goHome()
      return
    }
   // 获取用户信息
   let _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:(res)=>{
              _this.doLogin(res)
            }
          })
        }
      }
    })
  },

  async setTokenAndUserInfo(openId, sessionKey, obj) {
    let loginFirst = await WxSys.loginSys({
      username: openId,
      password: openId,
      captcha: 'cafebabe'
    })
    console.log(loginFirst)
    if (loginFirst.success) {
      wx.setStorageSync("token", loginFirst.result.token)
      this.setUserInfo(sessionKey, obj)
            //跳转
    } else {
      let registRes = await WxSys.registWx({
        openId: openId,
        type: 'wx'
      })
      if (registRes.success) {
        //尝试登录
        let loginRes = await WxSys.loginSys({
          username: openId,
          password: openId,
          captcha: 'cafebabe'
        })
        wx.setStorageSync("token", loginRes.result.token)
        this.setUserInfo(sessionKey, obj)
        //跳转
      }
    }
  },
  async doLogin(obj){
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success: async  res => {
        const resdata = await WxSys.login(res.code)

        if (resdata.success) {
          let jsonObj = JSON.parse(resdata.message)

          this.setTokenAndUserInfo(jsonObj.openid, jsonObj.sessionKey, obj)

        } else {
          wx.showToast({
            title: '抱歉服务器故障,小程序暂停运行',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  async setUserInfo(sessionKey, obj) {
    const resdata = await WxSys.getInfo(sessionKey, obj)
    
    let info = null
    if (resdata.success) {
      info = JSON.parse(resdata.message)
      wx.setStorageSync('userInfo', info)
      wx.hideLoading()
      this.goHome()
    }
  },
  async getUserInfo(e) {
    
    let obj = e.detail
    if (obj.errMsg.indexOf("ok") != -1) {
      
      this.doLogin(obj)

    }

  }
})
