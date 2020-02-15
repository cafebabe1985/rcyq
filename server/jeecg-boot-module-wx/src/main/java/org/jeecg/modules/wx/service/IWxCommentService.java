package org.jeecg.modules.wx.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.jeecg.modules.wx.entity.WxComment;
import com.baomidou.mybatisplus.extension.service.IService;
import org.jeecg.modules.wx.entity.WxCommentVO;

import java.util.List;

/**
 * @Description: 内容评论
 * @Author: jeecg-boot
 * @Date:   2020-02-14
 * @Version: V1.0
 */
public interface IWxCommentService extends IService<WxComment> {

    IPage<WxCommentVO> selectPageMain(Page<WxCommentVO> page, String id);

    List<WxCommentVO> listSub(String id);
}
