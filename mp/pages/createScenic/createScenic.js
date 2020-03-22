// pages/createScenic/createScenic.js
import { formatVideo } from '../../utils/formatHtml.js'
import {
  config
} from '../../config/config.js'
import {
  Scenic
} from '../../net/scenic.js'
import {
  CityTab
} from '../../net/cityTab.js'
import {
  User
} from '../../net/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
     form:{
       scenicName:'',
       city: null,
       title: '',
       author: '',
       poster: '',
       content:'',
       hit:0,
       newsType:'2',
       displayType:'0',
       createBy:''
     },
     isEdit:false,
    editorHeight: 100,
      validatorRules:{
        scenicName:true,       
        title:true,
        author:true,
        poster:true
      },
      cityTabs: [],
  },
  
  async initCityTab() {
    let res = await CityTab.listCityTab('displayOrder', 'asc')
    
    this.setData({
      cityTabs: res.result.records
    })
  },
  cityTabsChange(e) {
    let value = parseInt(e.detail.value)
    let key = 'form.city'
    this.setData({

      [key]: value
    })
    this.data.form.city = '' + value
    // this.data.form.city = parseInt(e.detail.value)
  },
  onInputBlur(e){
    let value = e.detail.value
    let key = e.currentTarget.dataset.key  
   
    this.validateItem(key,value)
    this.data.form[key] = value    
  },
  validateItem(key, value){
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
  getContents(e) {
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
 async doSubmit(e){
   if (!this.data.form.content) {
     wx.showToast({
       title: '请输入详情，并保存！',
       icon: 'none'
     })
     return
   }
   if(e.currentTarget.dataset.status){
    
      this.data.form.displayType = e.currentTarget.dataset.status
   
   }
   for (let key in this.data.validatorRules){
      this.validateItem(key,this.data.form[key])
    }
    for(let i in this.data.validatorRules){
      if (!this.data.validatorRules[i]){
        return 
      }
    }
  
    wx.showLoading({
      scenicName: '正在提交数据',
    })
   
   let res =await Scenic.addScenic(this.data.form)
   
   if(res.success){
     wx.showToast({
       scenicName: '提交成功',
       duration:1000
     })
   }else{
     wx.showToast({
       scenicName: '网络故障',
       icon:'none',
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
    }else{
      this.data.form.displayType = '0'
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
      scenicName: '正在提交数据',
    })
    
    let res = await Scenic.editScenic(this.data.form)

    if (res.success) {
      wx.showToast({
        scenicName: '提交成功',
        duration: 1000
      })
    } else {
      wx.showToast({
        scenicName: '网络故障',
        icon: 'none',
        duration: 1000
      })
    }
    wx.hideLoading()
    wx.navigateBack({

    })

  },
  async getUserInfo(id){
    let res = await User.getScenicManagerByOpenId(id)
   console.log(res)
    this.setData({
      "form.author": res.result.applyInfo.realName,
      "form.city": parseInt(res.result.applyInfo.city),
      "form.createBy": res.result.userInfo.openId
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    wx.hideShareMenu()
    this.initCityTab()
    this.getUserInfo(options.id)
    // const eventChannel = this.getOpenerEventChannel()
    if (options.scenicId){
      let res = await Scenic.getScenicById(options.scenicId)
    
      this.setData({
        form:res.result,
        isEdit:true
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