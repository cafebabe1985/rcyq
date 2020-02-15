
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class Scenic {

  /**
   * 获取景区小片Scenic列表
   */
  static async listScenic(pageNo, pageSize,column,order,status,other) {
    let data = {
      pageNo: pageNo,
      pageSize: pageSize,
      status: status || 1,
      column: column,
      order: order
    }
    if(other){
      Object.assign(data,other)
    }

    return await Http.wxGet({
      url: 'wx/wxScenic/listInfo',
      data 
    })
  }
/**
 * 根据ID获取景区小片数据
 */
  static async getScenicById(id,other) {
    let data = {
      id:id
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxScenic/queryById',
      data
    })
  }

}

export {
  Scenic
}