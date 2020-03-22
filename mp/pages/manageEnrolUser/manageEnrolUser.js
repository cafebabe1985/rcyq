// pages/enrolUserPage/enrolUserPage.js
import {
  Active
} from '../../net/active.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enrolUsers: null,
    showEnrolUserMore: [],
    enrolWriteOpts: []
  },
  contactEnroler(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  showMore(e) {

    let index = parseInt(e.currentTarget.dataset.index)
    let key = `showEnrolUserMore[${index}]`
    let value = !this.data.showEnrolUserMore[index]
    this.setData({
      [key]: value
    })
  },
 async configEnrol(e){
   let index = parseInt(e.currentTarget.dataset.index) 
   wx.showLoading({
     title: '提交数据',
   })
   let res = await Active.editActiveEnrol({
     id:e.currentTarget.dataset.id,
     enrolStatus:'1'
   })
   if(res.success){
     wx.showToast({
       title: '报名审批通过',
     })
   }else{
     wx.showToast({
       title: '网络故障',
       icon:'none'
     })
   }
   let key = `enrolUsers[${index}].enrolInfo.enrolStatus`
   this.setData({
     [key]:'1'
   })
   wx.hideLoading()
   
   console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideShareMenu()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptData', async (data) => {
       
     let usersRes = await Active.listActiveEnrolById({activeId:data.id})
      let activeRes = await Active.getActiveById(data.id)
      let _enrolOpts = activeRes.result.enrolWriteOpts 
     this.setData({
       enrolUsers:usersRes.result
     })
      let showEnrolUserMore = []
      for (let i = 0; i < usersRes.result.length; i++) {
        showEnrolUserMore[i] = false
      }
      let enrolWriteOpts = []
      if (_enrolOpts.length > 2) {
        enrolWriteOpts = _enrolOpts.slice(2)
      }
      this.setData({
        enrolUsers: data.users,
        showEnrolUserMore: showEnrolUserMore,
        enrolWriteOpts: enrolWriteOpts
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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