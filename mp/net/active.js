
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class Active {

  /**
   * 获取活动列表
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
      url: 'wx/wxActive/listVO0d',
      data
    })
  }
  /**
   * 根据ID获取活动
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
  /**
     * 添加活动
     */
  static async addActive(data) {

    return await Http.wxPost({
      url: 'wx/wxActive/addVO',
      data
    })
  }

  /**
     * 更改活动
     */
  static async editActive(data) {

    return await Http.wxPut({
      url: 'wx/wxActive/edit',
      data
    })
  }

  /**
   * 删除活动
    */
  static async deleteById(id,other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }
    return await Http.wxDelete({
      url: 'wx/wxActive/delete',
      data
    })
  }
  /**
     * 活动报名
     */
  static async addActiveEnrol(data) {
    return await Http.wxPost({
      url: 'wx/wxActiveEnrolUser/add',
      data
    })
  }
  /**
    * 更新报名
    */
  static async editActiveEnrol(data) {
    return await Http.wxPut({
      url: 'wx/wxActiveEnrolUser/edit',
      data
    })
  }
  /**
     * 删除报名
      */
  static async deleteEnrolById(id,other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }
    return await Http.wxDelete({
      url: `wx/wxActiveEnrolUser/delete?id=${id}`,
      data
    })
  }
  /**
     * 报名查重
     */
  static async checkReEnrol(data) {
    return await Http.wxGet({
      url: 'wx/wxActiveEnrolUser/checkDouble',
      data
    })
  }

  /**
     * 活动报名列表
     */
  static async listActiveEnrol(other) {
    let data = {
     enrolStatus:'1'
    }
    if (other) {
      Object.assign(data, other)
    }
    return await Http.wxGet({
      url: 'wx/wxActiveEnrolUser/listAll',
      data
    })
  }
  /**
      * 根据ID查询活动报名列表
      */
  static async listActiveEnrolById(data) {
    
    return await Http.wxGet({
      url: 'wx/wxActiveEnrolUser/listAll',
      data
    })
  }
  /**
   * 活动收藏列表
   */
  static async listActiveFavorite(data) {   
   
    return await Http.wxGet({
      url: 'wx/wxActiveFavorite/listAllAndActive',
      data
    })
  }
  /**
    * 检查是否已经收藏
    */
  static async checkActiveFavorite(data) {

    return await Http.wxGet({
      url: 'wx/wxActiveFavorite/count',
      data
    })
  }
  /**
   * 添加活动收藏
   */
  static async addActiveFavorite(data) {

    return await Http.wxPost({
      url: 'wx/wxActiveFavorite/add',
      data
    })
  }

  /**
   * 用户创建活动列表
   * listVOall
   */
  static async listUserCreate(id,other) {
    let data = {
      createBy: id
    }
    if (other) {
      Object.assign(data, other)
    }
    return await Http.wxGet({
      url: 'wx/wxActive/listVOall',
      data
    })
  }

  /**
   * 用户报名活动列表
   * 
   */
  static async listUserEnrol(id, other) {
    let data = {
      userOpneId: id
    }
    if (other) {
      Object.assign(data, other)
    }
    return await Http.wxGet({
      url: 'wx/wxActiveEnrolUser/listEnrolAndActive',
      data
    })
  }
}

export {
  Active
}