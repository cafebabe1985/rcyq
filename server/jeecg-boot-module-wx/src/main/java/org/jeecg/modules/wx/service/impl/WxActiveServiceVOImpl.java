package org.jeecg.modules.wx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.jeecg.modules.wx.entity.WxActive;
import org.jeecg.modules.wx.entity.WxActiveVO;
import org.jeecg.modules.wx.mapper.WxActiveMapper;
import org.jeecg.modules.wx.mapper.WxActiveVOMapper;
import org.jeecg.modules.wx.service.IWxActiveService;
import org.jeecg.modules.wx.service.IWxActiveVOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-26
 * @Version: V1.0
 */
@Service
public class WxActiveServiceVOImpl extends ServiceImpl<WxActiveVOMapper, WxActiveVO> implements IWxActiveVOService {
    @Autowired
    WxActiveVOMapper wxActiveVOMapper;

}
