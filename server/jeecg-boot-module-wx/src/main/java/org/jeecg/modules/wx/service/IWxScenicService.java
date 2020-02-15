package org.jeecg.modules.wx.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.jeecg.modules.wx.entity.WxScenic;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @Description: 景区小片信息表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
public interface IWxScenicService extends IService<WxScenic> {

    void updateHit(String id);

}
