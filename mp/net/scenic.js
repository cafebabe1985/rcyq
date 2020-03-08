
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
      displayType: '1',
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
  * 获取景区全部Scenic列表
  */
  static async listAllScenic(pageNo, pageSize, column, order, status, other) {
    let data = {
      pageNo: pageNo,
      pageSize: pageSize,
      column: column,
      order: order
    }
    if (other) {
      Object.assign(data, other)
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
  /**
   * 增加
   */
  static async addScenic(data) {
   
    return await Http.wxPost({
      url: 'wx/wxScenic/add',
      data
    })
  }
  /**
   * 修改景区资料
   */
  static async editScenic(data) {

    return await Http.wxPut({
      url: 'wx/wxScenic/edit',
      data
    })
  }
  /**
    * 修改景区负责人申请
    */
  static async editScenicApply(data) {

    return await Http.wxPut({
      url: 'wx/applyScenic/editAndUpdateUser',
      data
    })
  }

  /**
   * 获取申请列表
   */
  static async listScenicApply(column, order, other) {
    let data = {
     
      column: column,
      order: order
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/applyScenic/listAll',
      data
    })
  }
}

export {
  Scenic
}