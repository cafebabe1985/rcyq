package org.jeecg.modules.wx.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.jeecg.modules.wx.entity.WxActive;
import com.baomidou.mybatisplus.extension.service.IService;
import org.jeecg.modules.wx.entity.WxActiveVO;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-26
 * @Version: V1.0
 */
public interface IWxActiveService extends IService<WxActive> {

    String saveVO(WxActiveVO wxActive);

}
