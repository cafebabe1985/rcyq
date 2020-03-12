//index.js
//获取应用实例
import { WxSys } from '../../net/wxSys.js'
const app = getApp()

Page({
  data: {
   
    motto: '欢迎使用儒此有趣微信小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
 
  goHome(){
    console.log("gohome!!!!!!!!!!")
    wx.switchTab({
      url: '/pages/home/home'
    })
  
  },
  async onLoad(opts) {   
    let userInfo = wx.getStorageSync("userInfo") 
    console.log("onload->>>", userInfo)   
    if (userInfo) {
      wx.showLoading({
        title: '自动登录中',
      })
      let loginFirst = await WxSys.loginSys({
        username: userInfo.nickName,
        password: userInfo.openId,
        captcha: 'cafebabe'
      })      
      if (loginFirst.success) {
        wx.setStorageSync("token", loginFirst.result.token)
       // this.setUserInfo(sessionKey, obj)
       wx.hideLoading()
       this.goHome()
        //跳转
      } 
      // else {
      //   let registRes = await WxSys.registWx({
      //     nickName:userInfo.nickName,
      //     openId: userInfo.openId,
      //     type: 'wx'
      //   })
      //   if (registRes.success) {
      //     //尝试登录
      //     let loginRes = await WxSys.loginSys({
      //       username: userInfo.nickName,
      //       password: userInfo.openId,
      //       captcha: 'cafebabe'
      //     })
      //     console.log(loginRes)
      //     wx.setStorageSync("token", loginRes.result.token)
      //     wx.hideLoading()
      //    // this.setUserInfo(sessionKey, obj)
      //     //跳转
      //   }
      // }
      // wx.hideLoading()
      // this.goHome()
      return
    }
    console.log("没有缓存-》》》")
    //没有缓存
   // 获取用户信息
  //  let _this = this
  //   wx.getSetting({
  //     success(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         wx.getUserInfo({
  //           success:(res)=>{
  //             console.log("获取了用户授权-》》》",res)
  //             _this.doLogin(res)
  //           }
  //         })
  //       }
  //     }
  //   })
  },

  async setTokenAndUserInfo(openId, sessionKey, obj) {
    //如果没有，先获取用户信息
   let info = await this.setUserInfo(sessionKey, obj)
   console.log(info)
   //获取成功
   if(info){
     let loginFirst = await WxSys.loginSys({
       username: info.nickName,
       password: info.openId,
       captcha: 'cafebabe'
     })
     console.log(loginFirst)
     if (loginFirst.success) {
       wx.setStorageSync("token", loginFirst.result.token)
       wx.hideLoading()
       this.goHome()
     //  this.setUserInfo(sessionKey, obj)
       //跳转
     } else {
       let registRes = await WxSys.registWx({
         nickName: info.nickName,
         openId: info.openId,
         type: 'wx'
       })
       if (registRes.success) {
         //尝试登录
         let loginRes = await WxSys.loginSys({
           username: info.nickName,
           password: info.openId,
           captcha: 'cafebabe'
         })
         console.log(loginRes)
         wx.setStorageSync("token", loginRes.result.token)
         wx.hideLoading()
          this.goHome()
         //跳转
       }
     }
   }
      
  },
  async doLogin(obj){
    console.log("执行登录操作--》》")
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success: async  res => {
        const resdata = await WxSys.login(res.code)
        console.log("微信登录成功--》》》", resdata)
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
      return info
      // wx.hideLoading()
      // this.goHome()
    }else{
      return null
    }
  },
  async getUserInfo(e) {
    
    let obj = e.detail
    if (obj.errMsg.indexOf("ok") != -1) {
      
      this.doLogin(obj)

    }

  }
})
