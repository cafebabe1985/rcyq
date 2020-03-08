// pages/applyScenicManager/applyScenicManager.js
import {
  config
} from '../../config/config.js'
import {
  CityTab
} from '../../net/cityTab.js'
import {
  User
} from '../../net/user.js'
import {
  Scenic
} from '../../net/scenic.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    isEdit: false,
    isApplyHandle: false,
    cityTabs: [],
    imgList: [],
    cur: null,
    form: {
      realName: null,
      city: null,
      cid: null,
      phone: null,
      cidfront: null,
      cidback: null,
      status:'0'
    },
    validatorRules: {
      realName: {
        validate: true,
        message: ''
      },
      city: {
        validate: true,
        message: ''
      },
      cid: {
        validate: true,
        message: ''
      },
      phone: {
        validate: true,
        message: ''
      },
      cidfront: {
        validate: true,
        message: ''
      },
      cidback: {
        validate: true,
        message: ''
      },
    }
  },
  async initCityTab() {
    let res = await CityTab.listCityTab('displayOrder', 'asc')
    console.log(res)
    this.setData({
      cityTabs: res.result.records
    })
  },
  async doApply(){
   wx.showLoading({
     title: '正在处理',
   })
      if(this.data.form.status != '1'){
        this.data.form.status = '1'
      }else{
        this.data.form.status = '0'
      }
     
  let res = await  Scenic.editScenicApply(this.data.form)
 
  if(res.success){
    this.setData({
      form:this.data.form
    })
  }
  wx.showToast({
    title: '处理成功',
    icon:'success',
    duration:1000
  })
  wx.hideLoading()
  },
  initFormData(cityTabs) {
    let resData
    let cur
    for (let i in cityTabs) {
      if (cityTabs[i].name === resData.city) {
        cur = i
      }
    }
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
  ChooseImage(e) {
    let key = e.currentTarget.dataset.key
    let formKey = `form.${key}`
    let validateKey = `validatorRules.${key}.validate`
    wx.chooseImage({
      count: 2, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: this.data.apiBaseUrl + '/sys/common/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            console.log(res)
            const data = JSON.parse(res.data)
            this.setData({
              [formKey]: data.message,
              [validateKey]: true
            })

          }
        })

      }
    });
  },
  ViewImage(e) {
    let imgs = [this.data.apiBaseUrl + e.currentTarget.dataset.url]
    wx.previewImage({
      urls: imgs,
      current: imgs[0]
    });
  },
  DelImg(e) {
    let key = e.currentTarget.dataset.key
    let formKey = `form.${key}`
    let validateKey = `validatorRules.${key}.validate`
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      cancelText: '不删除',
      confirmText: '继续删除',
      success: res => {
        if (res.confirm) {

          this.setData({
            [formKey]: null,
            [validateKey]: false
          })
        }
      }
    })
  },
  onInputBlur(e) {
    let key = e.currentTarget.dataset.key
    let value = e.detail.value
    this.data.form[key] = value
    this.validateField(key, value)

  },
  async doSubmit() {
    if (this.validateAll()) {
      let userInfo = wx.getStorageSync("userInfo")
      this.data.form.userOpenId = userInfo.openId
      this.data.form.status = '0'
      let res = await User.addScenicApply(this.data.form)
      if (res.success) {
        wx.navigateBack({

        })
      }
    }
  },
  validateAll() {
    for (let i in this.data.validatorRules) {
      this.validateField(i, this.data.form[i])
    }
    for (let i in this.data.validatorRules) {
      if (!this.data.validatorRules[i].validate) {
        return false
      }
    }
    return true
  },
  validateField(key, value) {
    if (value) {
      switch (key) {
        case 'cid':
          if (this.validateCid(value)) {
            this.setData({
              "validatorRules.cid.validate": true,
              "validatorRules.cid.errMessage": "",
            })
          } else {
            this.setData({
              "validatorRules.cid.validate": false,
              "validatorRules.cid.errMessage": "身份证格式错误",
            })
          }
          break
        case 'phone':
          if (this.validatePhone(value)) {
            this.setData({
              "validatorRules.phone.validate": true,
              "validatorRules.phone.errMessage": "",
            })
          } else {
            this.setData({
              "validatorRules.phone.validate": false,
              "validatorRules.phone.errMessage": "格式错误",
            })
          }
          break
        default:
          break
      }
    } else {
      let vkey = `validatorRules.${key}.validate`
      console.log(vkey)
      let vMes = `validatorRules.${key}.errMessage`
      this.setData({
        [vkey]: false,
        [vMes]: '必填'
      })
    }

  },
  validatePhone(value) {

    if (!(/^1[3456789]\d{9}$/.test(value))) {

      return false;
    } else {
      return true
    }
  },
  validateCid(value) {
    //身份证规则校验

    if (this.checkCode(value)) {
      var date = value.substring(6, 14);
      if (this.checkDate(date)) {
        if (this.checkProv(value.substring(0, 2))) {
          return true;
        }
      }
    }
    return false;
  },
  //校验码校验
  checkCode(val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        sum += val[i] * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;


  },
  //省级地址码校验
  checkProv(val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门"
    };
    if (pattern.test(val)) {
      if (provs[val]) {
        return true;
      }
    }
    return false;
  },
  //出生日期码校验
  checkDate(val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
      var year = val.substring(0, 4);
      var month = val.substring(4, 6);
      var date = val.substring(6, 8);
      var date2 = new Date(year + "-" + month + "-" + date);
      if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
        return true;
      }
    }
    return false;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initCityTab()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptData', (data) => {
      console.log(data)
      if (data) {
        data.applyInfo.city = parseInt(data.applyInfo.city)
        this.setData({
          form: data.applyInfo,
          isApplyHandle: true
        })
      }
    })
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