package org.jeecg.modules.wx.service;

import org.jeecg.modules.wx.entity.WxNews;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @Description: 快讯表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
public interface IWxNewsService extends IService<WxNews> {

    void updateHit(String id);
}
