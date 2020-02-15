
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class CityTab {

  /**
   * 获取景区小片Scenic列表
   */
  static async listCityTab(column, order) {
    return await Http.wxGet({
      url: 'wx/scenicCityTab/list',
      data: {
        column: column,
        order: order
      }
    })
  }

}

export {
  CityTab
}