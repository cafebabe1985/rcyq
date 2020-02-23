package org.jeecg.modules.wx.service;

import org.jeecg.modules.wx.entity.WxActiveCost;
import org.jeecg.modules.wx.entity.WxActive;
import com.baomidou.mybatisplus.extension.service.IService;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-23
 * @Version: V1.0
 */
public interface IWxActiveService extends IService<WxActive> {

	/**
	 * 添加一对多
	 * 
	 */
	public void saveMain(WxActive wxActive,List<WxActiveCost> wxActiveCostList) ;
	
	/**
	 * 修改一对多
	 * 
	 */
	public void updateMain(WxActive wxActive,List<WxActiveCost> wxActiveCostList);
	
	/**
	 * 删除一对多
	 */
	public void delMain (String id);
	
	/**
	 * 批量删除一对多
	 */
	public void delBatchMain (Collection<? extends Serializable> idList);
	
}
