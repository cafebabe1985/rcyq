package org.jeecg.modules.wx.service;

import org.jeecg.modules.wx.entity.WxActiveCost;
import com.baomidou.mybatisplus.extension.service.IService;
import java.util.List;

/**
 * @Description: 活动费用表
 * @Author: jeecg-boot
 * @Date:   2020-02-23
 * @Version: V1.0
 */
public interface IWxActiveCostService extends IService<WxActiveCost> {

	public List<WxActiveCost> selectByMainId(String mainId);
}
