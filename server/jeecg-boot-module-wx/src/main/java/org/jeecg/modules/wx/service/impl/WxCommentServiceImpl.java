package org.jeecg.modules.wx.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.jeecg.modules.wx.entity.WxComment;
import org.jeecg.modules.wx.entity.WxCommentVO;
import org.jeecg.modules.wx.mapper.WxCommentMapper;
import org.jeecg.modules.wx.service.IWxCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import java.util.List;

/**
 * @Description: 内容评论
 * @Author: jeecg-boot
 * @Date: 2020-02-14
 * @Version: V1.0
 */
@Service
public class WxCommentServiceImpl extends ServiceImpl<WxCommentMapper, WxComment> implements IWxCommentService {

    @Autowired
    private WxCommentMapper wxCommentMapper;

    @Override
    public IPage<WxCommentVO> selectPageMain(Page<WxCommentVO> page, String id) {
        return wxCommentMapper.selectPageMain(page, id);
    }

    @Override
    public List<WxCommentVO> listSub(String id) {
        return wxCommentMapper.listSub(id);
    }
}
