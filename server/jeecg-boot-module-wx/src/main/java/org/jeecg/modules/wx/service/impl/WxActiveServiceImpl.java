package org.jeecg.modules.wx.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.jeecg.modules.wx.entity.WxActive;
import org.jeecg.modules.wx.entity.WxActiveVO;
import org.jeecg.modules.wx.mapper.WxActiveMapper;
import org.jeecg.modules.wx.service.IWxActiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-26
 * @Version: V1.0
 */
@Service
public class WxActiveServiceImpl extends ServiceImpl<WxActiveMapper, WxActive> implements IWxActiveService {
    @Autowired
    WxActiveMapper wxActiveMapper;
    @Override
    public String saveVO(WxActiveVO wxActive) {
        return wxActiveMapper.saveVO(wxActive);
    }


}
