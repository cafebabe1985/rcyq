
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class Active {

  /**
   * 获取景区小片Scenic列表
   */
  static async listActive(pageNo, pageSize, column, order, status, other) {
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
      url: 'wx/wxActive/list',
      data
    })
  }
  /**
   * 根据ID获取景区小片数据
   */
  static async getActiveById(id, other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxActive/queryById',
      data
    })
  }

}

export {
  Active
}