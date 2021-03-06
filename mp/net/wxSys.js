
import { Http } from "../utils/http"
import { config } from '../config/config.js'
/**
 * 编写主题请求业务类
 */
class WxSys {

  /**
   * 用code换取id
   */
  static async login(code, other) {
    let data = {
      code:code,
    }
    if (other) {
      Object.assign(data, other)
    }
    // console.log("appid:" + config.appid)
    return await Http.wxGet({
      url: 'wx/login',
      data
    })
  }
  /**
   * 获取微信用户信息
   */
  static async getInfo(sessionKey,other) {
    let data = {
      sessionKey: sessionKey,
    }
    if (other) {
      Object.assign(data, other)
    }
    
    return await Http.wxGet({
      url: 'wx/info',
      data
    })
  }
  /**
   * 注册微信用户
   */
  static async registWx(data) {
   

    return await Http.wxPost({
      url: '/sys/user/register',
      data
    })
  }
  /**
   * 登录系统
   */
  static async loginSys(data) {


    return await Http.wxPost({
      url: '/sys/login',
      data
    })
  }
  /**
   * 获取微信用户绑定手机号
   */
  static async getPhone(sessionKey, other) {
    let data = {
      sessionKey: sessionKey,
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/phone',
      data
    })
  }
/**
 * 文件上传
 */
  static async uploadFile(data) {

   
  }
}

export {
  WxSys
}