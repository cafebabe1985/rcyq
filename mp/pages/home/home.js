// pages/home/home.js
import {
  Scenic
} from '../../net/scenic.js'
import {
  News
} from '../../net/news.js'
import {
  Swiper
} from '../../net/swiper.js'
import {
  CityTab
} from '../../net/cityTab.js'
import {
  config
} from '../../config/config.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    apiBaseUrl: config.apiBaseUrl,
    TabCur: 0,
    scrollLeft: 0,
    navCur: 0,
    cityTabs: [{
      name: '所有'
    }],
    activeNavCur: 0,
    isFixedTop: false,
    navbarInitTop: 0,
    navbarHeight: 0,
    fixedViewWrapHeight: 0,
    scenics: null,
    swiperList: null,
    news: null,
    scenicPageNo: 1,
    newsPageNo: 1,
   
    finishScenic:false,
    finishNews:false
  },
  tabSelect(e) {
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        fixedViewWrapHeight: this.data.navbarHeight

      })
    } else {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
    }

  },
  async navSelect(e) {
    let index = e.currentTarget.dataset.id
    let resScenicData
    if (index == 0) {
      resScenicData = await Scenic.listScenic(1, 10, 'createTime', 'desc', 1)
    } else {
      resScenicData = await Scenic.listScenic(1, 10, 'createTime', 'desc', 1, {
        city: e.currentTarget.dataset.name
      })
    }
    this.setData({
      navCur: index,
      scrollLeft: (index - 1) * 60,
      scenics: resScenicData.result.records,
      
    })
  },
  activeNavCurSelect(e) {
    this.setData({
      activeNavCur: e.currentTarget.dataset.id,
    })
  },
  cardSwiper() { },
  handleFilePath(path) {
    return config.apiBaseUrl + path
  },
  previewImage(e) {
    let imgs = []
    for (let i in e.currentTarget.dataset.imgs) {
      imgs.push(this.data.apiBaseUrl +
        e.currentTarget.dataset.imgs[i].img)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.index, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  goNewsDetail(e) {
    let url
    if (e.currentTarget.dataset.item.newsType == '0') {
      if (e.currentTarget.dataset.item.targetUrl) {
        url = e.currentTarget.dataset.item.targetUrl
      } else {
        return
      }

    } else {
      url = ''
    }
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.item.id}&type=${this.data.TabCur}&path=${url}`,

    })

  },
  handleUserInfo() {
    let storageUser = wx.getStorageSync('userInfo')
    if (storageUser) {
      this.setData({
        userInfo: storageUser,
        hasUserInfo: true
      })
      wx.switchTab('/pages/home/home')
    } else if (this.data.canIUse) {
      if (app.userInfoReadyCallback) {
        app.userInfoReadyCallback = res => {
         
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      } else {
        wx.navigateTo({
          url: `/pages/index/index`,
        })
      }

    } else {

      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync("userInfo", res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },
  doLoadPageData() {
    
    if(this.data.TabCur == 0) {
       if(this.data.finishScenic){
         
       return
      }else{
         wx.showLoading({
           title: '加载中',
         })
        this.data.scenicPageNo++
        this.loadScenic(this.data.scenicPageNo, 10)
        
      }        
    } else if (this.data.TabCur == 1){

      
    } else if (this.data.TabCur == 2){
      if (this.data.finishNews) {
       
        return
      } else {
        wx.showLoading({
          title: '加载中',
        })
        this.data.newsPageNo++
        this.loadNews(this.data.newsPageNo, 10)
        
      }    
    }
    
  },
  //加载新的景区
  async loadScenic(pageNo,pageSize){

    const resScenicData = await Scenic.listScenic(pageNo, pageSize, 'createTime', 'desc', 1)
    let newScenic = resScenicData.result.records
    let totalScenic = resScenicData.result.total
    this.data.scenics.push(...newScenic)
    this.setData({
      scenics:this.data.scenics,
      finishScenic: newScenic.length == 0 ? true : newScenic.length==totalScenic
    })
    
  },
  //加载新的快讯
  async loadNews(pageNo, pageSize) {
    const resNewsData = await News.listNews(pageNo, pageSize, 'createTime', 'desc', 1)
    let newNews = resNewsData.result.records
    let totalNews = resNewsData.result.total
    this.data.news.push(...newNews)
    this.setData({
      news: this.data.news,
      finishNews: newNews.length == 0 ? true : newNews.length == totalNews
    })
  },
  async initPage(){
    this.handleUserInfo()
    const resScenicData = await Scenic.listScenic(1, 10, 'createTime', 'desc', 1)

    const resNewsData = await News.listNews(1, 10, 'createTime', 'desc', 1)
    const resSwiperData = await Swiper.listSwiper(1, 6, 'displayOrder', 'asc', 1)
    const resCityTabData = await CityTab.listCityTab('displayOrder', 'asc')

    this.setData({
      scenics: resScenicData.result.records,
      news: resNewsData.result.records,
      swiperList: resSwiperData.result.records,
      cityTabs: this.data.cityTabs.concat(resCityTabData.result.records)
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log("onLoad")
    wx.showLoading({
      title: '内容加载中',
    })
        
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow () {
    console.log("onShow")
    this.initPage()
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
  onHide () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    
    this.doLoadPageData()
    setTimeout(() => { wx.hideLoading()},1000)
    
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