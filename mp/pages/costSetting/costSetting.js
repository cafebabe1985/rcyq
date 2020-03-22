// pages/addEnrolWriteOpt/addEnrolWriteOpt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    typePicker: [
      '免费',
      '报名后付费',
      '活动中收费'
    ],
    refundType: 0,
    refundPicker: [
      '活动开始前均可申请退款',
      '指定时间可以申请退款',
      '不支持退款'
    ],
    number: '',
    opts: [{
      name: '',
      cost: '',
      number: ''
    }],
    optValidate: [{
      all: true,
      name: true,
      cost: true,
      number: true,
      remove: false
    }],
    numberValidate: true,
    numberErrMessage: '',
    
  },
  pickerChange(e) {
    this.setData({
      type: e.detail.value
    })
  },
  refundChange(e) {
    this.setData({
      refundType: e.detail.value
    })
  },
  moveOpt(e) {
    if (this.data.opts.length <= 1) {
      return
    }
    let index = e.currentTarget.dataset.index
    this.data.opts.splice(index, 1)
    this.data.optValidate.splice(index, 1)

    this.setData({
      opts: this.data.opts,
      optValidate: this.data.optValidate
    })
  },
  addOpt(e) {
    let index = e.currentTarget.dataset.index
    let value = e.currentTarget.dataset.opt
    let opt = `opts[${index}]`
    let validate = `optValidate[${index}]`
    // let remove = `optValidate[${index}].remove`

    for (let i in value) {
      if (value[i]) {
        this.data.optValidate[index][i] = true
      } else {
        this.data.optValidate[index][i] = false
      }
    }

    if (this.data.optValidate[index].name && this.data.optValidate[index].cost && this.data.optValidate[index].number) {
      this.data.optValidate[index].all == true
      this.data.optValidate[index].remove = true
      let newOpt = {
        name: '',
        cost: '',
        number: ''
      }
      let newOptValidate = {
        all: true,
        name: true,
        cost: true,
        number: true,
        remove: false
      }
      this.data.opts.push(newOpt)
      this.data.optValidate.push(newOptValidate)
    } else {
      this.data.optValidate[index].all == false
      this.data.optValidate[index].remove = false
    }
    this.setData({
      opts: this.data.opts,
      optValidate: this.data.optValidate
    })

  },
  onOptNameInput(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value.trim()
    let key = `opts[${index}].name`
    this.setData({
      [key]: value
    })
  },
  onOptCostInput(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value.trim()
    let key = `opts[${index}].cost`
    this.setData({
      [key]: value
    })
  },
  onOptNumberInput(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value.trim()
    let key = `opts[${index}].number`
    this.setData({
      [key]: value
    })
  },
  onNumberInput(e) {
    this.setData({
      number: e.detail.value.trim()
    })

  },
  onNumberBlur(e) {
    this.checkNumber()

  },
  checkNumber() {
    let res
    let errMessage = ''

    if (this.data.number) {

      if ((/(^[1-9]\d*$)/.test(this.data.number))) {
        res = true
      } else {
        res = false
        this.data.number = ''
        errMessage = '*请输入大于0的整数'
      }

    } else {
      res = false
      errMessage = '*请输入大于0的整数'
    }

    this.setData({
      numberValidate: res,
      number: this.data.number,
      numberErrMessage: errMessage
    })

  },
  checkOpts() {
    for (let i = 0; i < this.data.opts.length; i++) {
      for (let index in this.data.opts[i]) {
        if (this.data.opts[i][index]) {
          this.data.optValidate[i][index] = true
        } else {
          this.data.optValidate[i][index] = false
        }
      }
      if (this.data.optValidate[i].name && this.data.optValidate[i].cost && this.data.optValidate[i].number) {
        this.data.optValidate[i].all = true
      } else {
        this.data.optValidate[i].all = false
      }
    }
    this.setData({
      opts: this.data.opts,
      optValidate: this.data.optValidate
    })
    for (let i in this.data.optValidate){
      if (!this.data.optValidate[i].all){
        return false
      }
    }
    return true
  },
  onConfig() {
    let ok = false
    if (this.data.type != 0) {
      this.checkNumber()
      let optsRes = this.checkOpts()

      if ( optsRes) {
        this.data.number = 0
        for(let i in this.data.opts){
          this.data.number += parseInt(this.data.opts[i].number) 
        }
         
        ok = true
      }
    } else {
      ok=true
    
    }
    if (ok) {
      let pages = getCurrentPages()

      if (pages.length > 1) {
        let pre = pages[pages.length - 2]
        let newOpt = {
          type: this.data.type,
          number: this.data.number,
          refundType: this.data.refundType,
          opts: this.data.type==0?[]:this.data.opts
        }
       
        
        pre.setData({
          "form.cost": newOpt
        })
      
        wx.navigateBack()
      }
    } else {
      return
    }
  },
  onCancel() { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideShareMenu()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptCost', (cost) => {
     
      if (cost) {
        let items = cost.opts.length > 0 ? cost.opts :
          [{
            name: '',
            cost: '',
            number: ''
          }]
        this.data.optValidate = []
          for(let i in items){
            this.data.optValidate.push({all: true,
              name: true,
              cost: true,
              number: true,
              remove: true})
          }
       
        this.data.optValidate[this.data.optValidate.length - 1].remove = false
       
        
        this.setData({
          number: cost.number,
          type: cost.type,
          refundType: cost.refundType,
          opts: items,
          optValidate: this.data.optValidate
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