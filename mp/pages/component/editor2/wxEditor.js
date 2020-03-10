// pages/component/editor/wxEditor.js
//<p><video controls="controls" width="300" height="150">
// <source src="files/20200310/1_1583821650059.mp4" type="video/mp4" /></video ></p >
import {
  config
} from '../../../config/config.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value: '开始输入...'
    },
    initText:{
      type:String,
      value:""
    },
    editorHeight:{
      type:Number,
      value: 100
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    formats: {},
    readOnly: false,
    // placeholder: '开始输入...',
    // editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    editorCtx: null
  },
  /**
   * 生命周期
   */
  lifetimes: {
    attached() {
      
      const platform = wx.getSystemInfoSync().platform
      const isIOS = platform === 'ios'
      this.setData({ isIOS })
      
      const that = this
      this.updatePosition(0)
      let keyboardHeight = 0
      wx.onKeyboardHeightChange(res => {
        if (res.height === keyboardHeight) return
        const duration = res.height > 0 ? res.duration * 1000 : 0
        keyboardHeight = res.height
        setTimeout(() => {
          wx.pageScrollTo({
            scrollTop: 0,
            success() {              
              that.updatePosition(keyboardHeight)
              that.data.editorCtx.scrollIntoView()
            }
          })
        }, duration)

      })
    },
    ready(){
     this.onEditorReady()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updatePosition(keyboardHeight) {
      const toolbarHeight = 50
      const { windowHeight, platform } = wx.getSystemInfoSync()
      let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
      this.setData({ editorHeight, keyboardHeight })
    },
    calNavigationBarAndStatusBar() {
      const systemInfo = wx.getSystemInfoSync()
      const { statusBarHeight, platform } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady() {
    this.createSelectorQuery().select('#editor').context((res) => {
        
        this.data.editorCtx = res.context
         this.data.editorCtx.setContents({
          html: this.data.initText
        }
          
          )
      }).exec()
    },
    blur(e) {
      this.triggerEvent('GetEditorContents', e.detail)
    },
    onFocus(){
      this.triggerEvent('GetFocus', true)
    },
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.data.editorCtx.format(name, value)

    },
    onStatusChange(e) {
      const formats = e.detail
      this.setData({ formats })
    },
    insertDivider() {
      this.data.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    clear() {
      this.data.editorCtx.clear({
        success: function (res) {
          console.log("clear success")
        }
      })
    },
    removeFormat() {
      this.data.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.data.editorCtx.insertText({
        text: formatDate
      })
    },
    insertImage() {
      wx.showLoading({
        title: '图片上传中',
      })
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
              
              this.data.editorCtx.insertImage({
                src: this.data.apiBaseUrl+ data.message,
                width: '30%',
                success: ()=> {
                  // console.log('insert image success')
                  wx.hideLoading()
                }
              })
            }
          })
        }
      })
    },
    insertVideo(){
      wx.chooseVideo({
        sourceType: ['album', 'camera'],        
        success:(res)=> {
          wx.showLoading({
            title: '上传视频',
          })
          console.log(res.tempFilePath)
          let file = res.tempFilePath
          wx.uploadFile({
            url: this.data.apiBaseUrl + '/sys/common/upload', //仅为示例，非真实的接口地址
            filePath: file,
            name: 'file',
            success: (res) => {
              const data = JSON.parse(res.data)
              console.log(data)
              this.data.editorCtx.insertImage({
                src: '',
                alt: '视频文件上传完毕',
                width: '100%',
                data: {
                  src: data.message
                } ,
                extClass:'the_video',
                success: () => {
                  console.log('insert image success')
                  wx.hideLoading()
                }
              })
            }
          })
        }
      })
      
    }, 
    //insertVideo end
    saveContent(){
      wx.showLoading({
        title: '正在保存编辑内容',
      })
      this.data.editorCtx.getContents({
        success:(e)=>{    
              
         this.triggerEvent('GetContents',e)        
        }
      })
      
    },
   
    }
  
})
