// pages/home/home.js
import { WxSys } from '../../net/wxSys.js'
import {
  Scenic
} from '../../net/scenic.js'
import {
  Active
} from '../../net/active.js'
import {
  News
} from '../../net/news.js'
import {
  Article
} from '../../net/article.js'
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
    StatusBar:0,
    Custom:0,
    CustomBar:0,
    interval:30000,
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
    scenicsBak:null,
    swiperList: null,
    news: null,
    actives:null,
    articles:null,
    scenicPageNo: 1,
    newsPageNo: 1,
    activePageNo:1,
    articlePageNo:1,
    finishScenic: false,
    finishActive: false,
    finishNews: false,
    finishLoad:false,
    finishArticle:false
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  async navSelect(e) {
    let index = e.currentTarget.dataset.id
    let resScenicData
    if (index == 0) {
     
      resScenicData = this.data.scenicsBak
    } else {
     let city = parseInt(e.currentTarget.dataset.id) -1
    
      resScenicData = this.data.scenicsBak.filter( 
        (item)=>{
          
          return parseInt(item.city)===  city
        }
        )
    }
    this.setData({
      navCur: index,
      scrollLeft: (index - 1) * 60,
      scenics: resScenicData,
    })
  },
  activeNavCurSelect(e) {
    this.setData({
      activeNavCur: e.currentTarget.dataset.id,
    })
    if (e.currentTarget.dataset.id == 1){
      wx.navigateTo({
        url: '/pages/createActive/createActive',
      })
    }
  },
 async getPhoneNumber(e){
   
    
wx.navigateTo({
  url: '/pages/createActive/createActive',
})
  },
  cardSwiper(e) { 
  
    if(e.detail.current == 0){
      this.setData({
        interval:25000
      })
    }else{
      this.setData({
        interval: 3000
      })
    }
  },
  handleFilePath(path) {
    return config.apiBaseUrl + path
  },
  previewImage(e) {
   
    if(e.currentTarget.dataset.index === 0){
      return
    }
    wx.navigateTo({
      url: `/pages/webpage/webpage?id=${e.currentTarget.dataset.id}`,      
    })   
    
  },
  goActiveDetail(e){
    wx.navigateTo({
      url: `/pages/activeDetail/activeDetail?id=${e.currentTarget.dataset.id}`,

    })
  },
  goArticleDetail(e){
    wx.navigateTo({
      url: `/pages/articleDetail/articleDetail?id=${e.currentTarget.dataset.item.id}&type=${this.data.TabCur}`,

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
     
    } else if (this.data.canIUse) {
     
        app.userInfoReadyCallback = res => {
          
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
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

    if (this.data.TabCur == 0) {
      if (this.data.finishScenic) {
        return
      } else {
        this.data.scenicPageNo++
        this.loadScenic(this.data.scenicPageNo, 10)

      }
    } else if (this.data.TabCur == 1) {
      if (this.data.finishActive) {
        return
      } else {
        this.data.activePageNo++
        this.loadActive(this.data.activePageNo, 10)

      }

    } else if (this.data.TabCur == 2) {
      if (this.data.finishNews) {

        return
      } else {
        
        this.data.newsPageNo++
        this.loadNews(this.data.newsPageNo, 10)

      }
    } else if (this.data.TabCur == 3) {
      if (this.data.finishArticle) {

        return
      } else {

        this.data.articlePageNo++
        this.loadArticle(this.data.articlePageNo, 10)

      }
    }

  },
  //加载新的景区
  async loadScenic(pageNo, pageSize) {
    const resScenicData = await Scenic.listScenic(pageNo, pageSize, 'createTime', 'desc', 1)
    let newScenic = resScenicData.result.records
    let totalScenic = resScenicData.result.total
    this.data.scenicsBak.push(...newScenic)
   
    this.setData({
      navCur:0,
      scrollLeft:0,
      scenics: this.data.scenicsBak,
      finishScenic: newScenic.length == 0 ? true : newScenic.length == totalScenic
    })

  },
  //加载新的活动
  async loadActive(pageNo, pageSize) {
    const resActiveData = await Active.listActive(pageNo, pageSize, 'createTime', 'desc', 1,{displayType:'1'})
    let newActive = resActiveData.result.records
    let totalActive = resActiveData.result.total
    this.data.actives.push(...newActive)
    this.setData({
      navCur: 0,
      scrollLeft: 0,
      actives: this.data.actives,
      finishActive: newActive.length == 0 ? true : newActive.length == totalActive
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
  //加载新的文化杂谈
  async loadArticle(pageNo, pageSize) {
    const resArticleData = await Article.listArticle(pageNo, pageSize, 'createTime', 'desc', 1)
    console.log(resArticleData)
    let newArticle = resArticleData.result.records
    let totalArticle = resArticleData.result.total
    this.data.articles.push(...newArticle)
    this.setData({
      articles: this.data.articles,
      finishArticle: newArticle.length == 0 ? true : newArticle.length == totalArticle
    })
  },
  //初始化页面数据
  async initPage() {
    // this.handleUserInfo()
    this.data.scenicPageNo = 1
    this.data.newsPageNo = 1
    this.data.activePageNo = 1
    this.data.articlePageNo = 1
    const resSwiperData = await Swiper.listSwiper(1, 6, 'displayOrder', 'asc', 1)
    this.setData({
      swiperList: resSwiperData.result.records,
    })
    const resScenicData = await Scenic.listScenic(this.data.scenicPageNo, 15, 'createTime', 'desc', 1)
    this.data.scenicsBak = resScenicData.result.records
    this.data.finishScenic = false
    // this.setData({
    //   navCur: 0,
    //   scrollLeft: 0,
    //   scenics: resScenicData.result.records,
      
    // })

    const resActiveData = await Active.listActive(this.data.activePageNo, 10, 'createTime', 'desc', 1,{displayType:'1'})
    const resArticleData = await Article.listArticle(this.data.articlePageNo, 10, 'createTime', 'desc', 1)
    const resNewsData = await News.listNews(this.data.newsPageNo, 20, 'createTime', 'desc', 1)       
    this.data.finishNews = false    
    this.data.finishActive = false    
    this.data.finishArticle = false 
    this.setData({
      navCur: 0,
      scrollLeft: 0,
      scenics: resScenicData.result.records,
      news: resNewsData.result.records,
      articles: resArticleData.result.records,
      actives: resActiveData.result.records,
     
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // wx.getSystemInfo({
    //   success: e => {
    //     this.data.StatusBar = e.statusBarHeight;
    //     let capsule = wx.getMenuButtonBoundingClientRect();
    //     if (capsule) {
    //       this.data.Custom = capsule;
    //       this.data.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
    //     } else {
    //       this.data.CustomBar = e.statusBarHeight + 50;
    //     }
    //     console.log(this.data.StatusBar, this.data.CustomBar)
    //     this.setData({
    //       CustomBar: this.data.CustomBar
    //     })
    //   }
    // })
    wx.showLoading({
      title: '内容加载中',
    })
    const resCityTabData = await CityTab.listCityTab('displayOrder', 'asc')
this.setData({
  cityTabs: this.data.cityTabs.concat(resCityTabData.result.records)
})
    wx.createSelectorQuery().select('#fixedViewWrap').boundingClientRect((rect) => {

      this.setData({
        fixedViewWrapHeight: rect.height + 1
      });

    }).exec()
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
    this.data.finishLoad = true

    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
  //  if(!this.data.finishLoad){
     this.initPage()
  //  }  
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.finishLoad = false
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
   
    this.initPage()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

    this.doLoadPageData()
    setTimeout(() => { wx.hideLoading() }, 1000)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    return{
      title:'儒此有趣',
      path:'/pages/home/home',
      
    }
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