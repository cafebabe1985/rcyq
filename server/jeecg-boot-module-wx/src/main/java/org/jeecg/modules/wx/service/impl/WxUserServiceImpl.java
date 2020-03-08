package org.jeecg.modules.wx.service.impl;

import org.jeecg.modules.wx.entity.WxUser;
import org.jeecg.modules.wx.mapper.WxUserMapper;
import org.jeecg.modules.wx.service.IWxUserService;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * @Description: 微信用户
 * @Author: jeecg-boot
 * @Date:   2020-03-07
 * @Version: V1.0
 */
@Service
public class WxUserServiceImpl extends ServiceImpl<WxUserMapper, WxUser> implements IWxUserService {

}
