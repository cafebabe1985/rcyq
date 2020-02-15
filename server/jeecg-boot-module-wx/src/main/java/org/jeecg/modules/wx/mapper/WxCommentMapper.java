package org.jeecg.modules.wx.mapper;

import java.util.List;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.jeecg.modules.wx.entity.WxComment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.jeecg.modules.wx.entity.WxCommentVO;

/**
 * @Description: 内容评论
 * @Author: jeecg-boot
 * @Date:   2020-02-14
 * @Version: V1.0
 */
public interface WxCommentMapper extends BaseMapper<WxComment> {
@Select("SELECT wx_comment.*,wx_user.open_id,wx_user.avatar_url,wx_user.nick_name " +
        " FROM rcyq.wx_comment,rcyq.wx_user " +
        " where wx_comment.user_open_id = wx_user.open_id " +
        "AND wx_comment.at_comment_id = 0 " +
        "AND wx_comment.content_id = #{id} ORDER BY wx_comment.create_time DESC")
    IPage<WxCommentVO> selectPageMain(Page<WxCommentVO> page, @Param("id") String id);

@Select("SELECT wx_comment.*,wx_user.open_id,wx_user.avatar_url,wx_user.nick_name " +
            " FROM rcyq.wx_comment,rcyq.wx_user " +
            " where wx_comment.user_open_id = wx_user.open_id " +
            "AND wx_comment.at_comment_id = #{id} ORDER BY wx_comment.create_time DESC" )
    List<WxCommentVO> listSub(@Param("id") String id);
}
