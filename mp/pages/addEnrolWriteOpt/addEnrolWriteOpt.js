// pages/addEnrolWriteOpt/addEnrolWriteOpt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    typePicker: [
      '用户填写',
      '单项选择',
      '多项选择'
    ],
    name: '',
    opts: [''],
    optValidate: [true],
    nameValidate: true,
    isEdit:false,
    optIndex:null
  },
  pickerChange(e) {
    this.setData({
      type: e.detail.value
    })
  },
  moveOpt(e) {
    let index = e.currentTarget.dataset.index
    this.data.opts.splice(index, 1)
    this.data.optValidate.splice(index, 1)
    this.setData({
      opts: this.data.opts,
      optValidate: this.data.optValidate
    })
  },
  addOpt(e) {

    let value = e.currentTarget.dataset.opt
    let index = e.currentTarget.dataset.index
    let validate = `optValidate[${index}]`

    if (value) {
      this.data.opts.push('')
      this.data.optValidate.push(true)
      this.setData({
        [validate]: true,
        opts: this.data.opts,
        optValidate: this.data.optValidate
      })
    } else {
      this.setData({
        [validate]: false
      })

    }
  },
  onNameInput(e) {
    this.setData({
      name: e.detail.value.trim()
    })

  },
  onNameBlur(e) {
    this.checkName()

  },
  checkName() {
    let res
    if (this.data.name) {
      res = true
    } else {
      res = false
    }
    this.setData({
      nameValidate: res,
      name: this.data.name
    })
  },
  checkOpts() {
    
    let newOptValidate=[]
    let newOpts = this.data.opts.filter((value,index)=>{
      return value
    })
    if (newOpts.length==0){
        newOpts=['']
        newOptValidate=[false]
      this.setData({
        opts: newOpts,
        optValidate: newOptValidate
      })
      return false
    }else{
      for (let i; i < newOpts.length;i++){
        newOptValidate.push(true)
      }
      this.setData({
        opts: newOpts,
        optValidate: newOptValidate
      })
      return true
    }
  
  },
  onOptInput(e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value.trim()
    let key = `opts[${index}]`
    this.setData({
      [key]: value
    })
  },
  onConfig() {
    let ok = false
    if (this.data.type != 0) {
      this.checkName()
      let optsRes = this.checkOpts()

      if (this.data.nameValidate && optsRes) {
        ok = true
      }
    } else {
      this.checkName()
      if (this.data.nameValidate) {
        ok = true
      }
    }
    if (ok) {
      let pages = getCurrentPages()
      
      if(pages.length>1){
      let pre = pages[pages.length - 2]
        let newOpt = {
          type: this.data.type,
          name: this.data.name,
          opts: this.data.opts,
          diy:'1',
          value: '1',
          required: true,
        }
        if(this.data.isEdit){
          pre.data.enrolWriteOpts.splice(this.data.optIndex, 1, newOpt)
        }else{
          pre.data.enrolWriteOpts.push(newOpt)
        }
       
        pre.setData({
          enrolWriteOpts: pre.data.enrolWriteOpts
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
  onLoad (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptOpt',  (opt)=> {
      if(opt){
        this.data.isEdit = true
        this.data.optIndex = opt.index
        this.optValidate = []
        for (let i in opt.data.opts){
          this.data.optValidate.push(true) 
        }
        
        this.setData({
          name:opt.data.name,
          type:opt.data.type,
          opts:opt.data.opts,
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