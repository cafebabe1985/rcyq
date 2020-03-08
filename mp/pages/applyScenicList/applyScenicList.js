// pages/applyScenicList/applyScenicList.js
import {
  Scenic
} from '../../net/scenic.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['全部','待授权','已授权'],
    cur:0
  },
  tabSelect(e){
    let index = e.currentTarget.dataset.id
    
    this.setData({
      cur: parseInt(index) 
    })
    if(index == 0){
      this.initList()
    }else if(index==1){
      this.initList({status:'0'})
    }else if(index == 2){
      this.initList({ status: '1' })
    }
  },
  async initList(data){
    wx.showLoading({
      title: '加载中',
    })
    let res = null
    if(data){
       res = await Scenic.listScenicApply('createTime', 'desc',data)
    }else{
       res = await Scenic.listScenicApply('createTime', 'desc')
    }
    
    this.setData({
      list:res?res.result:[]
    })
    wx.hideLoading()
    console.log(res)
  },
  handleApply(e){
    wx.navigateTo({
      url: '/pages/applyScenicManager/applyScenicManager',
      success:(res)=>{
        res.eventChannel.emit('acceptData', e.currentTarget.dataset.item)
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.initList()
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