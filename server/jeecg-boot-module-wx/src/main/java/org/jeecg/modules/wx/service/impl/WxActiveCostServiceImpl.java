package org.jeecg.modules.wx.service.impl;

import org.jeecg.modules.wx.entity.WxActiveCost;
import org.jeecg.modules.wx.mapper.WxActiveCostMapper;
import org.jeecg.modules.wx.service.IWxActiveCostService;
import org.springframework.stereotype.Service;
import java.util.List;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Description: 活动费用表
 * @Author: jeecg-boot
 * @Date:   2020-02-23
 * @Version: V1.0
 */
@Service
public class WxActiveCostServiceImpl extends ServiceImpl<WxActiveCostMapper, WxActiveCost> implements IWxActiveCostService {
	
	@Autowired
	private WxActiveCostMapper wxActiveCostMapper;
	
	@Override
	public List<WxActiveCost> selectByMainId(String mainId) {
		return wxActiveCostMapper.selectByMainId(mainId);
	}
}
