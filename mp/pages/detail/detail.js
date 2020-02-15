// pages/detail/detail.js
import {
  Scenic
} from '../../net/scenic.js'
import {
  News
} from '../../net/news.js'
import {
  Comment
} from '../../net/comment.js'
import { formatRichText, scanVideo } from '../../utils/formatHtml.js'
import {
  config
} from '../../config/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiBaseUrl: config.apiBaseUrl,
    pagePath: null,
    detailId: null,
    modelType: null,
    type: ['scenic', 'active', 'news'],
    detail: null,
    content: null,
    wxUser: null,
    comments: null,
    hadComments: false,
    isCommentAt: false,
    isComment: false,
    InputBottom: 0,
    myComment: {
      commentContent: ''
    },
    placeHolder: '输入评论内容',
    inputFocus: false,
    haveMore: false,
    pageNo: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(opt) {
    if (opt.path) {
      this.setData({
        pagePath: opt.path
      })
    } else {
      this.getDetail(opt.id, opt.type)
    }
    this.data.wxUser = wx.getStorageSync("userInfo")
    this.data.myComment = {
      contentId: opt.id,
      contentType: opt.type,
      atCommentId: '',
      userOpenId: this.data.wxUser.openId,
      commentContent: ''

    }
    this.listComment(opt.id)
  },
  async listComment(id) {
    const resdata = await Comment.listComment(this.data.pageNo, 5, 'createTime', 'desc', {
      id: id
    })

    this.setData({
      comments: resdata.result.records,
      haveMore: (resdata.result.total == 0) ? false : (resdata.result.records.length < resdata.result.total)
    })
  },
  async getDetail(id, type) {

    let detail
    if (type === '2') {
      detail = await News.getNewsById(id)

    } else {
      detail = await Scenic.getScenicById(id)

    }
    detail.result.content = formatRichText(detail.result.content)
    let cstr = detail.result.content
    if (!cstr) {
      this.setData({
        detail: detail.result,
        content: []
      })
      return
    }
    let videoObj = scanVideo(cstr)
    let contents = []
    for (let i = 0; i < videoObj.srcList.length; i++) {
      let cellT = {
        type: 0,
        content: videoObj.richTexts[i]
      }
      let cellV = {
        type: 1,
        src: videoObj.srcList[i]
      }
      contents.push(cellT)
      contents.push(cellV)
    }
    contents.push({
      type: 0,
      content: videoObj.richTexts.pop()
    })

    this.setData({
      detail: detail.result,
      content: contents
    })
  },
  async getMoreComment(){
    if(this.data.haveMore){
      this.data.pageNo++
      const resdata = await Comment.listComment(this.data.pageNo, 5, 'createTime', 'desc', {
        id: this.data.detail.id
      })
      this.data.comments.push(...resdata.result.records)
      this.setData({
        comments: this.data.comments,
        haveMore: (resdata.result.total == 0) ? false : (this.data.comments < resdata.result.total)
      })
    }
    
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height,
      placeHolder: ''
    })
  },
  InputBlur(e) {
   
    this.data.myComment.commentContent = e.detail.value
    this.setData({
      InputBottom: 0
    })
  },
  Input(e) {
    
    this.data.myComment.commentContent = e.detail.value
  },
  async submitComment() {
    if (!this.data.myComment.commentContent){
      this.setData({
        inputFocus: false,
        isComment: false

      })
      return
    }
    wx.showLoading({
      title: '发表评论中',
    })
    this.data.myComment.commentContent = this.data.myComment.commentContent.replace(this.data.currentCommentPre, '')

    const resdata = await Comment.addComment(this.data.myComment)
    if(resdata.code!=200){
      wx.showToast({
        title: '网络故障',
        icon: 'none',
        duration: 1000
      })
      wx.hideLoading()
      this.setData({
        inputFocus: false,
        isComment: false

      })

      return
    }
    this.listComment(this.data.detail.id)
    this.setData({
      myComment: this.data.myComment,
      comments: this.data.comments
    })
    this.data.myComment.commentContent = ''
    this.setData({
      myComment: this.data.myComment,
      inputFocus: false,
      isComment: false

    })
    wx.showToast({
      title: '发表成功',
      icon:'success',
      duration:1000
    })
    wx.hideLoading()
  },
  commentAt(e) {
    this.data.isCommentAt = true
    let id = e.currentTarget.dataset.id
    this.data.myComment.atCommentId = id
    this.data.currentCommentPre = `@${e.currentTarget.dataset.parent} `
    this.setData({
      inputFocus: true,
      isComment: true,
      "myComment.commentContent": this.data.currentCommentPre
    })
  },
  enableInput() {
    this.data.currentCommentPre = ''
    this.data.isCommentAt = false
    this.data.myComment.atCommentId = '0'
    this.setData({
      inputFocus: true,
      isComment: true
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