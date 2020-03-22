// pages/createScenic/createScenic.js
import {
  config
} from '../../config/config.js'
import {
  News
} from '../../net/news.js'

import {
  User
} from '../../net/user.js'

import { formatVideo} from '../../utils/formatHtml.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    form: {
      title: '',

      subTitle: '',
      author: '',
      poster: '',
      content: '',
      hit: 0,
      newsType: '1',
      displayType: '3',
      createBy: ''
    },
    isEdit: false,
    editorHeight: 100,
    validatorRules: {
      title: true,
      subTitle: true,
      author: true,
      poster: true
    },

  },
  onInputBlur(e) {
    let value = e.detail.value
    let key = e.currentTarget.dataset.key

    this.validateItem(key, value)
    this.data.form[key] = value
  },
  validateItem(key, value) {
    let validateKey = `validatorRules.${key}`

    if (value && value.trim()) {
      this.setData({
        [validateKey]: true,
      })
      return true
    } else {
      this.setData({
        [validateKey]: false,
      })
      return false
    }
  },
  getEditorContents(e) {

    this.data.form.content = e.detail.html
  },
  getContents(e){   
    this.data.form.content = formatVideo(e)
    wx.hideLoading()
  },
  getEditorFocus() {

  },
  chooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: this.data.apiBaseUrl + '/sys/common/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            const data = JSON.parse(res.data)
            this.setData({
              'form.poster': data.message,
              'validates.poster.validate': true
            })

          }
        })
      }
    });
  },
  async doSubmit(e) {
    if(!this.data.form.content){
      wx.showToast({
        title: '请输入详情，并保存！',
        icon:'none'
      })
      return
    }
    if (e.currentTarget.dataset.status) {

      this.data.form.displayType = e.currentTarget.dataset.status

    }else{
      this.data.form.displayType = '1'
    }
    for (let key in this.data.validatorRules) {
      this.validateItem(key, this.data.form[key])
    }
    for (let i in this.data.validatorRules) {
      if (!this.data.validatorRules[i]) {
        return
      }
    }

    wx.showLoading({
      title: '正在提交数据',
    })

    let res = await News.addNews(this.data.form)

    if (res.success) {
      wx.showToast({
        title: '提交成功',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '网络故障',
        icon: 'none',
        duration: 1000
      })
    }
    wx.hideLoading()
    wx.navigateBack({

    })

  },
  async doEdit(e) {

    if (e.currentTarget.dataset.status) {

      this.data.form.displayType = e.currentTarget.dataset.status
    } else {
      this.data.form.displayType = '1'
    }
    for (let key in this.data.validatorRules) {
      this.validateItem(key, this.data.form[key])
    }
    for (let i in this.data.validatorRules) {
      if (!this.data.validatorRules[i]) {
        return
      }
    }

    wx.showLoading({
      title: '正在提交数据',
    })

    let res = await News.editNews(this.data.form)

    if (res.success) {
      wx.showToast({
        title: '提交成功',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '网络故障',
        icon: 'none',
        duration: 1000
      })
    }
    wx.hideLoading()
    wx.navigateBack({

    })

  },
  async getUserInfo(id) {
    let res = await User.getByOpenId(id)
    console.log(res)
    if (res.success) {
      this.setData({
        "form.author": res.result.nickName,
        "form.createBy": id
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.hideShareMenu()
    this.getUserInfo(options.id)
    if (options.scenicId) {
      let res = await News.getNewsById(options.scenicId)

      this.setData({
        form: res.result,
        isEdit: true
      })

      let editor = this.selectComponent("#editor")

    }

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