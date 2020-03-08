//app.js
import {
  WxSys
} from './net/wxSys.js'

App({
  async onLaunch() {
    //检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    wx.showLoading({
      title: '正在登录',
    })
    // 登录
    wx.login({
      success: async res => {
        const resdata = await WxSys.login(res.code)
        if (resdata.success) {
          let jsonObj = resdata.message
          this.globalData.sessionKey = jsonObj.sessionKey
          let obj = JSON.parse(jsonObj)
          let loginFirst = await WxSys.loginSys({
            username: obj.openid,
            password: obj.openid,
            captcha: 'cafebabe'
          })
          console.log(loginFirst)
          if (loginFirst.success) {
            wx.setStorageSync("token", loginFirst.result.token)
          } else {
            let registRes = await WxSys.registWx({
              openId: obj.openid,
              type: 'wx'
            })
           
            if (registRes.success) {
              //登录
              let loginRes = await WxSys.loginSys({
                username: obj.openid,
                password: obj.openid,
                captcha: 'cafebabe'
              })
              wx.setStorageSync("token", loginRes.result.token)
            }
          }
          //登录。。。

        } else {
          wx.showToast({
            title: '抱歉服务器故障,小程序暂停运行',
            icon: 'none',
            duration: 2000
          })
        }


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

                wx.setStorageSync('userInfo', resdata)

                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {

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

        //用户手机

      }
    })
    wx.hideLoading()
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