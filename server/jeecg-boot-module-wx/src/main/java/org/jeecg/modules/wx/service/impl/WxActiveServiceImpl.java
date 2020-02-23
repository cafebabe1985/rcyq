package org.jeecg.modules.wx.service.impl;

import org.jeecg.modules.wx.entity.WxActive;
import org.jeecg.modules.wx.entity.WxActiveCost;
import org.jeecg.modules.wx.mapper.WxActiveCostMapper;
import org.jeecg.modules.wx.mapper.WxActiveMapper;
import org.jeecg.modules.wx.service.IWxActiveService;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.io.Serializable;
import java.util.List;
import java.util.Collection;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-23
 * @Version: V1.0
 */
@Service
public class WxActiveServiceImpl extends ServiceImpl<WxActiveMapper, WxActive> implements IWxActiveService {

	@Autowired
	private WxActiveMapper wxActiveMapper;
	@Autowired
	private WxActiveCostMapper wxActiveCostMapper;
	
	@Override
	@Transactional
	public void saveMain(WxActive wxActive, List<WxActiveCost> wxActiveCostList) {
		wxActiveMapper.insert(wxActive);
		if(wxActiveCostList!=null && wxActiveCostList.size()>0) {
			for(WxActiveCost entity:wxActiveCostList) {
				//外键设置
				entity.setActiveId(wxActive.getId());
				wxActiveCostMapper.insert(entity);
			}
		}
	}

	@Override
	@Transactional
	public void updateMain(WxActive wxActive,List<WxActiveCost> wxActiveCostList) {
		wxActiveMapper.updateById(wxActive);
		
		//1.先删除子表数据
		wxActiveCostMapper.deleteByMainId(wxActive.getId());
		
		//2.子表数据重新插入
		if(wxActiveCostList!=null && wxActiveCostList.size()>0) {
			for(WxActiveCost entity:wxActiveCostList) {
				//外键设置
				entity.setActiveId(wxActive.getId());
				wxActiveCostMapper.insert(entity);
			}
		}
	}

	@Override
	@Transactional
	public void delMain(String id) {
		wxActiveCostMapper.deleteByMainId(id);
		wxActiveMapper.deleteById(id);
	}

	@Override
	@Transactional
	public void delBatchMain(Collection<? extends Serializable> idList) {
		for(Serializable id:idList) {
			wxActiveCostMapper.deleteByMainId(id.toString());
			wxActiveMapper.deleteById(id);
		}
	}
	
}
