package org.jeecg.modules.wx.service.impl;

import org.jeecg.modules.wx.entity.WxScenic;
import org.jeecg.modules.wx.mapper.WxScenicMapper;
import org.jeecg.modules.wx.service.IWxScenicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * @Description: 景区小片信息表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
@Service
public class WxScenicServiceImpl extends ServiceImpl<WxScenicMapper, WxScenic> implements IWxScenicService {
@Autowired
private WxScenicMapper wxScenicMapper;
    @Override
    public void updateHit(String id) {
        wxScenicMapper.updateHit(id);
    }
}
