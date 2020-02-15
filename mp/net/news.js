
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class News {

  /**
   * 获取快讯news列表
   */
  static async listNews(pageNo, pageSize, column, order, status, other) {
    let data = {
      pageNo: pageNo,
      pageSize: pageSize,
      status: status || 1,
      column: column,
      order: order
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxNews/listInfo',
      data
    })
  }
  /**
   * 根据ID获取快讯数据
   */
  static async getNewsById(id, other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxNews/queryById',
      data
    })
  }
}

export {
  News
}