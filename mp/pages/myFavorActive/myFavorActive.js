// pages/myCreateActive/myCreateActive.js
import {
  Active
} from '../../net/active.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },
  async listActive(id) {
    console.log(id)
    let res = await Active.listActiveFavorite(id)
    console.log(res)
    this.setData({
      list: res.result
    })
  },
  async cancelEnrol(e) {
    let enrolId = e.currentTarget.dataset.id
    // let openId = e.currentTarget.dataset.userId

    let index = parseInt(e.currentTarget.dataset.index)
    let _this = this

    wx.showModal({
      title: '提示',
      content: '你是否取消报名?',
      async success(res) {
        if (res.confirm) {

          let res = await Active.deleteEnrolById(enrolId)
          // let key = `list[${index}]`
          _this.data.list.splice(index, 1)
          if (res.success) {
            _this.setData({
              list: _this.data.list
            })
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 1000
            })
          }
        } else if (res.cancel) {

        }
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