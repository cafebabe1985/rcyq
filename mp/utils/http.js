import { promisic } from "./util.js"
import { config } from "../config/config.js"

class Http {
//get
  static async wxGet({ url, method = 'GET', data }) {
    // 将wx.request方法转换成promise方法
  let token =  wx.getStorageSync("token")
  console.log(token)
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        'X-Access-Token': token
      }
    })
    return res.data
  }
  //delete
  static async wxDelete({ url, method = 'DELETE', data }) {
    // 将wx.request方法转换成promise方法
    let token = wx.getStorageSync("token")
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        'X-Access-Token': token
      }
    })
    return res.data
  }

  //put
  static async wxPut({ url, method = 'PUT', data }) {
    // 将wx.request方法转换成promise方法
    let token = wx.getStorageSync("token")
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        'X-Access-Token': token
      }
    })
    return res.data
  }
//post
  static async wxPost({ url, method = 'POST', data }) {
    // 将wx.request方法转换成promise方法
    let token = wx.getStorageSync("token")
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        'X-Access-Token': token
      }
    })
    return res.data
  }

}

export {
  Http
}