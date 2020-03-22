// pages/myPublishScenic/myPublishScenice.js
import {
  Scenic
} from '../../net/scenic.js'
import {
  config
} from '../../config/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    TabCur: 0,
    scenics: null,
    openId:null
  },
  tabSelect(e) {
    let index = e.currentTarget.dataset.id
      this.setData({
        TabCur: index,
      })
   
     index = parseInt(index)
   switch(index){
    case 0:
       this.listScenic({
         createBy: this.data.openId,
       })
       break;
       case 1:
       this.listScenic({
         createBy: this.data.openId,
          displayType:'1'
       })
       break;
     case 2:
       this.listScenic({
         createBy: this.data.openId,
         displayType: '0'
       })
       break;
     case 3:
       this.listScenic({
         createBy: this.data.openId,
         displayType: '3'
       })
       break;
       default:
       break
   }
  },
  goNewsDetail(e){
    let id = e.currentTarget.dataset.item.id
    let displayType = e.currentTarget.dataset.item.displayType
    if (displayType == '3'){
      wx.navigateTo({
        url: `/pages/createScenic/createScenic?id=${this.data.openId}&scenicId=${id}`,
        // success:(res)=>{
        //   res.eventChannel.emit('acceptData', e.currentTarget.dataset.item)
        // }
      })
    }else{
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}&type=${0}&target=review&path=`,

      })
    }
  },
  async listScenic(query){
    wx.showLoading({
      title: '加载中',
    })
    const resScenicData = await Scenic.listAllScenic(1, 1000, 'createTime', 'desc', 1, query)
   if (resScenicData.success){
     console.log(resScenicData.result.records)
     this.setData({
       scenics: resScenicData.result.records
     })
   }
   wx.hideLoading()
  },
  createScenic(){
    wx.navigateTo({
      url: `/pages/createScenic/createScenic?id=${this.data.openId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.hideShareMenu()
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
  onShow () {
    this.listScenic({
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