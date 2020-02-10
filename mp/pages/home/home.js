// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    scrollLeft: 0,
    navCur: 0,
    activeNavCur:0,
    isFixedTop: false,
    navbarInitTop: 0,
    navbarHeight: 0,
    fixedViewWrapHeight: 0,
    swiperList: [{
      id: 0,
      type: 'image',

      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  tabSelect(e) {
    console.log(this)
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        fixedViewWrapHeight: this.data.navbarHeight
        // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    } else {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
       
      })
    }

  },
  navSelect(e) {
    this.setData({
      navCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  activeNavCurSelect(e){
    this.setData({
      activeNavCur: e.currentTarget.dataset.id,
      
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
    wx.createSelectorQuery().select('#fixedViewWrap').boundingClientRect((rect) => {

      this.setData({
        fixedViewWrapHeight: rect.height + 1
      });

    }).exec();
    if (this.data.navbarInitTop == 0) {

      //获取节点距离顶部的距离
      wx.createSelectorQuery().select('#navbar').boundingClientRect((rect) => {

        if (rect && rect.top > 0) {
          let navbarInitTop = parseInt(rect.top);
          this.setData({
            navbarInitTop: navbarInitTop,
            navbarHeight: rect.height
          });
        }
      }).exec();

    }
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

  },
  /**
   * 监听页面滑动事件
   */
  onPageScroll: function (e) {

    let scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度

    //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
    let isSatisfy = (scrollTop >= this.data.navbarInitTop)
    //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
    if (this.data.isFixedTop === isSatisfy) {
      return false;
    }

    this.setData({
      isFixedTop: isSatisfy,

    });
  }

})