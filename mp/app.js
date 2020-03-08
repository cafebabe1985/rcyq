//app.js
import {
  WxSys
} from './net/wxSys.js'

App({
  async onLaunch() {
    //检查更新
    console.log("APP登录")
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
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
    console.log("APP登录中·····")
    
    // 登录
    // wx.login({
    //   success: async res => {       
    //     const resdata = await WxSys.login(res.code)
    //     console.log(resdata)
    //     if (resdata.success) {         
    //       let jsonObj = JSON.parse(resdata.message)          
    //       this.globalData.sessionKey = jsonObj.sessionKey        
    //       this.globalData.openid = jsonObj.openid
    //     } else {
    //       wx.showToast({
    //         title: '抱歉服务器故障,小程序暂停运行',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // })
      
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
    sessionKey: null,
    openid:null
    // apiBaseUrl:'http://localhost:8080/jeecg-boot/'
  }
})