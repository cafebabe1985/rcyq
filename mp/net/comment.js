
import { Http } from "../utils/http"

/**
 * 编写评论请求业务类
 */
class Comment {

  /**
   * 获取评论列表
   */
  static async listComment(pageNo, pageSize, column, order, other) {
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
      url: 'wx/wxComment/listInner',
      data
    })
  }
  /**
   * 根据ID获取评论
   */
  static async getCommentById(id, other) {
    let data = {
      id: id
    }
    if (other) {
      Object.assign(data, other)
    }

    return await Http.wxGet({
      url: 'wx/wxComment/queryById',
      data
    })
  }

  /**
   * 添加评论
   */
  static async addComment(data) {
   
    return await Http.wxPost({
      url: 'wx/wxComment/add',
      data
    })
  }

}

export {
  Comment
}