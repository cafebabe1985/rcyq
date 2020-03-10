// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        content:null
  },
  getContents(e){
   
  //  console.log(this.fomatVideo(e))
  this.setData({
    content: this.fomatVideo(e)
  })
  },
  getHtml(){
   this.getContents()
    
  },
  fomatVideo(e) {
   
    let all = e.detail.html
    
    let pattern = /<img src=""(.*?)class="the_video" (.*?)>/g
    let patternDataCustom = /\bdata-custom="src\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/
    let videoDataArr = all.match(pattern)
    let rps = []
    let vtagP = `<video controls="controls" width="300" height="150"><source src="`
    let vtagS = `" type="video/mp4" /></video >`
    for (let i in videoDataArr) {
      let src = videoDataArr[i].match(patternDataCustom)[1]

      let target = vtagP + src + vtagS
      all = all.replace(pattern, target)
    }
    
    return all
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