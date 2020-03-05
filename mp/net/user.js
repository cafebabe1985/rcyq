
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class User {

  /**
   * 获取景区小片Scenic列表
   */
  // static async listActive(pageNo, pageSize, column, order, status, other) {
  //   let data = {
  //     pageNo: pageNo,
  //     pageSize: pageSize,
  //     status: status || 1,
  //     column: column,
  //     order: order
  //   }
  //   if (other) {
  //     Object.assign(data, other)
  //   }

  //   return await Http.wxGet({
  //     url: 'wx/wxActive/listVO0d',
  //     data
  //   })
  // }
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


  
}

export {
  User
}