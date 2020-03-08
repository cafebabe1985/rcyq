// pages/myCreateActive/myCreateActive.js
import {
  Active
} from '../../net/active.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },
 async listActive(id){
   
  let res = await Active.listUserCreate(id,{
    column:'createTime',
    order:'desc'
  })
  console.log(res)
  this.setData({
    list:res.result
  })
 },
 async editActive(e){
   let item = e.currentTarget.dataset.item
   let value = e.currentTarget.dataset.value
    item.displayType = value
   let index = parseInt(e.currentTarget.dataset.index)
   let _this =this
   console.log(item)
   wx.showModal({
     title: '提示',
     content: '你是否撤销该活动?撤销后数据不会消失,但无法显示在主页',
    async success(res) {
       if (res.confirm) {
        
         let res = await Active.editActive(item)
        let key = `list[${index}]`
       
         if(res.success){
           _this.setData({
             [key]:item
           })
           wx.showToast({
             title: '撤销成功',
             icon:'success',
             duration:1000
           })
         }
       } else if (res.cancel) {
         
       }
     }
   })
  
  
  },
  enrolManage(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/manageEnrolUser/manageEnrolUser',
      success: (res) => {
        res.eventChannel.emit('acceptData',item)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.listActive(options.id)
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