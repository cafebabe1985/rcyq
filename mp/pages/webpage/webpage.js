// pages/webpage/webpage.js
import { formatRichText, scanVideo } from '../../utils/formatHtml.js'
import {
  config
} from '../../config/config.js'
import {
  Swiper
} from '../../net/swiper.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
content:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad (options) {
   wx.showLoading({
     title: '加载中...',
   })
  let res =await  Swiper.getById(options.id)
  let data = res.result
    
      /**
     * 格式化富文本
     * 1.图片居中
     * 2.分离视频
     * */
      data.content = formatRichText(data.content)
      let cstr = data.content
      if (!cstr) {
        this.setData({
         
          content: []
        })
        return
      }
      let videoObj = scanVideo(cstr)
      let contents = []
      for (let i = 0; i < videoObj.srcList.length; i++) {
        let cellT = {
          type: 0,
          content: videoObj.richTexts[i]
        }
        let cellV = {
          type: 1,
          src: videoObj.srcList[i]
        }
        contents.push(cellT)
        contents.push(cellV)
      }
      contents.push({
        type: 0,
        content: videoObj.richTexts.pop()
      })
      console.log(contents)
      this.setData({
       
        content: contents
      })
      
   wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})