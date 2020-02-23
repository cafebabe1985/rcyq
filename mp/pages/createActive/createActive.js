// pages/createActive/createActive.js
import {
  config
} from '../../config/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    editorHeight:100,
    fullEditor:false,
    showOptModal:false,
    currentOptIndex:0,
    validates:{
      name: {
        required:true,
        validate:true
      },
      startTime: {
        required: true,
        validate: true
      },
      endTime: {
        required: true,
        validate: true,
        errMessage:''
      },
      endEnrol:{
        required: true,
        validate: true
      },
      address: {
        required: true,
        validate: true
      },
      poster: {
        required: true,
        validate: true
      },
     teamSize:{
       required: false,
       validate: true
     },
      everyTeamMax:{
        required: false,
        validate: true
      },
      everyTeamMin:{
        required: false,
        validate: true
      }
    },
    picker: ['无保险要求', '会员自行购买', '主办方统一购买'],
    enrolWriteOpts:[
      {
        name:'昵称',
        key:'nickName',
        value:'1',
        required:true,
        type:'0',
        diy:'0'
      },
      {
        name: '手机',
        key: 'phone',
        value: '1',
        required: true,
        type: '0',
        diy: '0'
      },
      {
        name: '性别',
        key: 'gender',
        value: '0',
        required: false,
        type: '0',
        diy: '0'
      },
      {
        name: '真实姓名',
        key: 'realName',
        value: '0',
        required: false,
        type: '0',
        diy: '0'
      },
      {
        name: '身份证号',
        key: 'cardId',
        value: '0',
        required: false,
        type: '0',
        diy: '0'
      }
    ],
    index:0,
    textCurrentTotal:0,
    showMoreSetting:false,
    form: {
      name: '',
      detail: '',
      startTime: '',
      endTime: '',
      endEnrol:'',
      address: '',
      poster: '',
      enrolWay:'0',
      teamSize:'',
      everyTeamMax:'',
      everyTeamMin:'',
      needExamineEnrol:null,
      allowEnrolAgent:null,
      displayType:'0',
      notice:'',
      insuranceType:'0',
      cost:{
        type:'0',
        number:'',
        refundType:0,
        items:[]
      },
      enrolWriteOpts:null,
    }
  },
  onBlur(e){
    let value = e.detail.value
    let prop = e.currentTarget.dataset.name
    let key = e.currentTarget.dataset.key
    let formKey = `form.${prop}`
    if(this.data.validates[prop].required){
      if(value){
        this.setData({
          [key]: true,
          [formKey]: value
        })
      }else{
        this.setData({

          [key]: false
        })
      }      
    }    
  },
  setMin(e){
    let value = e.detail.value
    if (this.data.form.everyTeamMax && this.data.form.everyTeamMax< value){
      this.setData({
        "form.everyTeamMax": '',
        "validates.everyTeamMax.validate": false
      })
      
    }else{
      this.setData({
        "form.everyTeamMin": value,
        "validates.everyTeamMin.validate": true
      })
    }

  },
  setMax(e) {
    let value = e.detail.value
    if (this.data.form.everyTeamMin && this.data.form.everyTeamMin > value) {
      this.setData({
        "form.everyTeamMax": '',
        "validates.everyTeamMax.validate": false
      })

    }else{
      this.setData({
        "form.everyTeamMax": value,
        "validates.everyTeamMax.validate": true
      })
    }


  },
  goCostSetting(){
     wx.navigateTo({
      url: '/pages/costSetting/costSetting',
      success: (res) => {
        res.eventChannel.emit('acceptCost', this.data.form.cost)
      }
    })
  },
  onChangeEnrolWay(){
    if(this.data.form.enrolWay==='0'){
      this.data.form.enrolWay='1'
    }else{
      this.data.form.enrolWay = '0'
    }
    this.setData({
      'form.enrolWay': this.data.form.enrolWay
    })
  },
  onShowMoreSetting(){
             this.setData({
          showMoreSetting:!this.data.showMoreSetting
        })
      
  },
  textareaAInput(e){
    
    this.setData({
      textCurrentTotal:  e.detail.value.length
    })
  },
  goAgreementPage(){
      wx.navigateTo({
        url: '/pages/agreementPage/agreementPage',
      })
  },
  toAddEnrolWriteOpt(){
    wx.navigateTo({
      url: '/pages/addEnrolWriteOpt/addEnrolWriteOpt',
    })
  },
  onTapEnrolWriteOpts(e){
    let opt = e.currentTarget.dataset.opt
    let index = parseInt(e.currentTarget.dataset.index) 
    this.data.currentOptIndex = index
    let diy = opt.diy
    if(diy === '1'){
        this.setData({
          showOptModal:true
        })
    }else{
      let value = (opt.value === '0') ? '1' : '0'

      let key = `enrolWriteOpts[${index}].value`
      this.setData({
        [key]: value
      })
    }
    
  },
  editOpt(){
    this.setData({
      showOptModal:false
    })
    let index = this.data.currentOptIndex
    let data = this.data.enrolWriteOpts[index]
    wx.navigateTo({
      url: '/pages/addEnrolWriteOpt/addEnrolWriteOpt',
      success:(res)=>{
        res.eventChannel.emit('acceptOpt', { data: data,index:index })
      }
    })
  },
  deleteOpt(){
      this.data.enrolWriteOpts.splice(this.data.currentOptIndex,1)
      this.setData({
        enrolWriteOpts: this.data.enrolWriteOpts,
        showOptModal:false
      })
  },
  hideOptModal(){
    this.setData({
      showOptModal:false
    })
  },
  getEditorContents(e){
      
      this.data.form.detail = e.detail.html
  },
  getEditorFocus(){

  },
  changeStartTime(e) {
    if (this.data.form.endTime && this.data.form.endTime <= e.detail){
      this.setData({
        'form.startTime': e.detail,
        'form.endTime':'',
        'validates.startTime.validate': true,
        'validates.endTime.validate': false,
        'validates.endTime.errMessage': '*要晚于开始时间',
      })
    }else{
      this.setData({
        'form.startTime': e.detail,
        'validates.startTime.validate': true
        
      })
    }
   

  },
  changeEndTime(e) {
    if (this.data.form.startTime && this.data.form.startTime >= e.detail){
      this.setData({
        'form.endTime': '',
        'validates.endTime.validate': false,
        'validates.endTime.errMessage': '*要晚于开始时间',
      })
    }else{
      this.setData({
        'form.endTime': e.detail,
        'validates.endTime.validate': true
      })
    }
    
  },
  changeEndEnrol(e) {
    this.setData({
      'form.endEnrol': e.detail,
      'validates.endEnrol.validate': true
    })
  },
  pickerChange(e) {   
    this.setData({
      "form.insuranceType": e.detail.value
    })
  },
  onChangeSwitch(e){
    let value = e.detail.value
    let key = e.currentTarget.dataset.key
    this.data.form[key] = value?'1':'0'
    console.log(this.data.form)
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
              'validates.poster.validate':true
            })

          }
        })
      }
    });
  },
  doSubmit() {
    
    if (this.validateAll()){
      this.data.form.enrolWriteOpts = this.data.enrolWriteOpts.filter((item)=>{
        return item.value === '1'
      })
      console.log(this.data.form)
    }else{
      this.setData({
        form: this.data.form
      })
    }
  },
  onTeamSizeBlur(e){
    let value = e.detail.value.trim()
    if (value){
      this.setData({
        'form.teamSize': value,
        'validates.teamSize.validate':true,
      })
    }else{
      this.setData({
        
        'validates.teamSize.validate': false,

      })
    }
  },
  validateAll(){
    if(this.data.form.enrolWay === '1'){
      this.data.validates.teamSize.required = true
      this.data.validates.teamSize.errMessage = '*必须填写队伍数量'     }
   
    for(let index in this.data.validates){
      if(this.data.validates[index].required){
        if (this.data.form[index]) {
          this.data.validates[index].validate = true
        }else{
          if(index === 'endTime'){
            this.data.validates[index].errMessage = '*必须填写结束时间'
          }
          this.data.validates[index].validate = false
         
        }
      }
    }
    if (this.data.form.enrolWay === '1' && parseInt(this.data.form.teamSize) == 0){
      console.log(this.data.form.teamSize)
      this.data.validates.teamSize.validate = false
      this.data.validates.teamSize.errMessage = '*不能为0'
      this.setData({
        'form.teamSize':''
      })
    }
    this.setData({
      validates:this.data.validates
    })
    for(let index in this.data.validates){
      if(!this.data.validates[index].validate){
        return false
      }
    }
    console.log(this.data.validates)
    return true
  },
  formReset(e) {
    this.setData({
      form: {
        name: '',
        detail: '',
        startTime: '',
        endTime: '',
        address: '',
        poster: '',
      }
    })
  },
  goLocationMap() {
    wx.navigateTo({
      url: '/pages/locationMap/locationMap',
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