package org.jeecg.modules.wx.service.impl;

import org.jeecg.modules.wx.entity.WxNews;
import org.jeecg.modules.wx.mapper.WxNewsMapper;
import org.jeecg.modules.wx.service.IWxNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * @Description: 快讯表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
@Service
public class WxNewsServiceImpl extends ServiceImpl<WxNewsMapper, WxNews> implements IWxNewsService {
@Autowired
private WxNewsMapper wxNewsMapper;
    @Override
    public void updateHit(String id) {
        int i = wxNewsMapper.updateHit(id);
    }
}
