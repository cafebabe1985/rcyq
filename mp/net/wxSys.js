
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
}

export {
  WxSys
}