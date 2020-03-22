
import { Http } from "../utils/http"

/**
 * 编写主题请求业务类
 */
class Article {

  /**
   * 获取快讯news列表
   */
  static async listArticle(pageNo, pageSize, column, order, status, other) {
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
      url: 'wx/wxArticle/listInfo',
      data
    })
  }
  /**
  * 获取全部
  */
  static async listAllArticle(pageNo, pageSize, column, order, other) {
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
      url: 'wx/wxArticle/listInfo',
      data
    })
  }
  /**
   * 增加
   */
  static async addArticle(data) {

    return await Http.wxPost({
      url: 'wx/wxArticle/add',
      data
    })
  }
  /**
   * 修改快讯
   */
  static async editArticle(data) {

    return await Http.wxPut({
      url: 'wx/wxArticle/edit',
      data
    })
  }
  /**
   * 根据ID获取快讯数据
   */
  static async getArticleById(id, other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxArticle/queryById',
      data
    })
  }
}

export {
  Article
}