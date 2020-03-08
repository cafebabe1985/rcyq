
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class User {

  
  /**
   * 根据openId获取登录用户信息
   */
  static async getByOpenId(openId, other) {
    let data = {
      openId: openId
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxUser/queryByOpenId',
      data
    })
  }
  /**
   * 根据openId获取景区管理员信息
   */
  static async getScenicManagerByOpenId(openId, other) {
    let data = {
      openId: openId
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/applyScenic/getByOpenId',
      data
    })
  }
  /**
   * 添加景区管理员申请
   */
  static async addScenicApply(data) {
   
    return await Http.wxPost({
      url: 'wx/applyScenic/add',
      data
    })
  }

  /**
   * 通过openId查询用户信息
   */
  static async addScenicApply(data) {

    return await Http.wxPost({
      url: 'wx/applyScenic/add',
      data
    })
  }
}

export {
  User
}