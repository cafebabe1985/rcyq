function checkUserInfo(){
let userInfo =  wx.getStorageSync("userInfo")
if(userInfo){
  return 
}else{
  wx.navigateTo({
    url: '/pages/index/index',
  })
}
}