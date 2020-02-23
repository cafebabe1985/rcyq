// pages/component/editor/wxEditor.js
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
                  console.log('insert image success')
                }
              })
            }
          })
        }
      })
    }
  }
})
