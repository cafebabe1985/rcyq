import { promisic } from "./util.js"
import { config } from "../config/config.js"

class Http {
//get
  static async wxGet({ url, method = 'GET', data }) {
    // 将wx.request方法转换成promise方法
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey
      }
    })
    return res.data
  }
//post
  static async wxPost({ url, method = 'POST', data }) {
    // 将wx.request方法转换成promise方法
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey
      }
    })
    return res.data
  }

}

export {
  Http
}