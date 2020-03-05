import {
  Active
} from '../../net/active.js'
import {
  config
} from '../../config/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    formItems: null,
    formObj: null,
    agent:null,
    activeId:null
  },
  singlePickerChange(e) {
    let index = e.currentTarget.dataset.index
    if (e.currentTarget.dataset.diy === '0') {
      this.setData({
        "formObj.userGender.value": e.detail.value
      })
    } else {
      let key = `formObj.metaInfo.diy${index}.value`
      let keyLabel = `formObj.metaInfo.diy${index}.label`
      this.setData({
        [key]: e.detail.value,
        [keyLabel]: this.data.formItems[index].opts[e.detail.value]
      })
    }
   
  },
  checkboxChange(e) {

    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    this.data.formObj.metaInfo[`diy${index}`].value = value
    let labels = []
    for(let i in value){
      let cur = parseInt(value[i])
      labels.push(this.data.formItems[index].opts[cur])
    }
    this.data.formObj.metaInfo[`diy${index}`].label = labels
   
  },
  createFormObj(enrolWriteOpts) {
    let formObj = {}
    formObj['metaInfo'] = {}
    for (let i in enrolWriteOpts) {
      if (enrolWriteOpts[i].diy == "0") {
        switch (enrolWriteOpts[i].name) {
          case '昵称':
            formObj['userNickName'] = ''
            break
          case '手机':
            formObj['userPhone'] = ''
            break
          case '性别':
            formObj['userGender'] = { value: 0, label: '未知' }
            break
          case '真实姓名':
            formObj['userRealName'] = ''
            break
          case '身份证号':
            formObj['userCid'] = ''
            break
          default:
            break
        }
      } else {
        if (enrolWriteOpts[i].type == '0') {
          formObj['metaInfo'][`diy${i}`] = {
            value:'',
            name: enrolWriteOpts[i].name
          }
        } else if (enrolWriteOpts[i].type == '1') {
          formObj['metaInfo'][`diy${i}`] = {
            value: 0, 
            label: enrolWriteOpts[i].opts[0],
            name: enrolWriteOpts[i].name
          }
        } else {
          formObj['metaInfo'][`diy${i}`] = {
            value: [], 
            label: enrolWriteOpts[i].opts,
            name: enrolWriteOpts[i].name
          }
        }

      }
    }
    this.setData({
      formObj: formObj
    })


  },
  setFormObjValue(name, value) {
    let key = null
    switch (name) {
      case '昵称':
        key = 'userNickName'
        break
      case '手机':
        key = 'userPhone'
        break
      case '性别':
        key = 'userGender'
        break
      case '真实姓名':
        key = 'userRealName'
        break
      case '身份证号':
        key = 'userCid'
        break
      default:
        break
    }
    this.data.formObj[key] = value

  },
  createDiyItem(name, index, value) {
    return {
      name: name,
      key: `diy${index}`,
      value: value
    }
  },
  async configEnrol() {
 
    for (let i in this.data.formObj) {
      if (i === "metaInfo") {
        if (this.data.formObj[i].value instanceof Array && this.data.formObj[i].value.length == 0) {
          wx.showToast({
            title: '请填写完整',
            icon: 'none',
            duration: 1000
          })
          return
        }
      } else {
        if (!this.data.formObj[i]) {
          wx.showToast({
            title: '请填写完整',
            icon: 'none',
            duration: 1000
          })
          return
        }
      }
    }
    let userInfo = wx.getStorageSync("userInfo")
   
    if(this.data.agent){
      this.data.formObj.enrolAgentOpenId = userInfo.openId
      this.data.formObj.userType = '1'
    }else{
      this.data.formObj.userOpneId = userInfo.openId
      this.data.formObj.userType = '0'
    }
   
    let metaInfoArr = []
    
    if (this.data.formObj.metaInfo) {
      for (let i in this.data.formObj.metaInfo) {
        metaInfoArr.push(this.data.formObj.metaInfo[i])
      }
    }

    this.data.formObj.metaInfo = JSON.stringify(metaInfoArr)
  
    this.data.formObj.activeId = this.data.activeId
    if(this.data.formObj.userGender){
      this.data.formObj.userGender = this.data.formObj.userGender.value
    }
    if(this.data.needExamineEnrol ==='0'){
      this.data.formObj.enrolStatus = '1'
    }else{
      this.data.formObj.enrolStatus = '0'
    }
    wx.showLoading({
      title: '报名中',
    })
    let res = await Active.addActiveEnrol(this.data.formObj)
  
    if(res.success){
      wx.hideLoading()
      wx.showToast({
        title: '报名成功',
        duration:1000
      })
      wx.navigateBack({
        
      })
    }else{
      wx.hideLoading()
      wx.showToast({
        title: '请不要重复报名',
        icon:'none',
        duration: 1000
      })
     
    }
  },
  cancelEnrol() {
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.agent = (options.agent == 'true')
    wx.setNavigationBarTitle({
      title: this.data.agent?'帮人报表单':'本人报名表单'
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptData', (data) => {
    
      this.setData({
        formItems: data.enrolWriteOpts,
        activeId:data.id,
        needExamineEnrol: data.needExamineEnrol
      })
      this.createFormObj(data.enrolWriteOpts)
    
    })
  },
  handleTextInput(e) {

    let diy = e.currentTarget.dataset.diy
    let name = e.currentTarget.dataset.name
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    if (diy === '0') {
      this.setFormObjValue(name, value)
    } else {
     
      this.data.formObj.metaInfo[`diy${index}`]['name'] = name
      this.data.formObj.metaInfo[`diy${index}`]['value'] = value
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