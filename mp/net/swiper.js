
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class Swiper {

  /**
   * 获取景区小片Scenic列表
   */
  static async listSwiper(pageNo, pageSize, column, order, display) {
    return await Http.wxGet({
      url: 'wx/wxSwiper/list2',
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        display: display,
        column: column,
        order: order
        }
    })
  }
  /**
  * 根据ID获取轮播图
  */
  static async getById(id, other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxSwiper/queryById',
      data
    })
  }

}

export {
  Swiper
}