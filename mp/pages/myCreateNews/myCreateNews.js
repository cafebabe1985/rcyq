// pages/myPublishScenic/myPublishScenice.js
import {
  News
} from '../../net/news.js'
import {
  config
} from '../../config/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: 0,
    Custom: 0,
    CustomBar: 0,
    apiBaseUrl: config.apiBaseUrl,
    TabCur: 0,
    news: null,
    openId: null
  },
  tabSelect(e) {
    let index = e.currentTarget.dataset.id
    this.setData({
      TabCur: index,
    })

    index = parseInt(index)
    switch (index) {
      case 0:
        this.listNews({
          createBy: this.data.openId,
        })
        break;
      case 1:
        this.listNews({
          createBy: this.data.openId,
          displayType: '1'
        })
        break;
      case 2:
        this.listNews({
          createBy: this.data.openId,
          displayType: '3'
        })
        break;
      default:
        break
    }
  },
  goNewsDetail(e) {
    let id = e.currentTarget.dataset.item.id
    let displayType = e.currentTarget.dataset.item.displayType
    if (displayType == '3') {
      wx.navigateTo({
        url: `/pages/createNews/createNews?id=${this.data.openId}&scenicId=${id}`,
       
      })
    } else {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}&type=${2}&path=`,

      })
    }
  },
  async listNews(query) {
    wx.showLoading({
      title: '加载中',
    })
    const resScenicData = await News.listAllNews(1, 1000, 'createTime', 'desc',query)
    if (resScenicData.success) {
      console.log(resScenicData.result.records)
      this.setData({
        news: resScenicData.result.records
      })
    }
    wx.hideLoading()
  },
  createNews() {

    wx.navigateTo({
      url: `/pages/createNews/createNews?id=${this.data.openId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideShareMenu()
    // wx.getSystemInfo({
    //   success: e => {
    //     this.data.StatusBar = e.statusBarHeight;
    //     let capsule = wx.getMenuButtonBoundingClientRect();
    //     if (capsule) {
    //       this.data.Custom = capsule;
    //       this.data.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
    //     } else {
    //       this.data.CustomBar = e.statusBarHeight + 50;
    //     }
       
    //     this.setData({
    //       CustomBar: this.data.CustomBar
    //     })
    //   }
    // })
    this.data.openId = options.id

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.listNews({
      createBy: this.data.openId,

    })
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