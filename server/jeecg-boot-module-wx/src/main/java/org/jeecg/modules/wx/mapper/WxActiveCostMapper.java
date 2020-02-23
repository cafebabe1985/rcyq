package org.jeecg.modules.wx.mapper;

import java.util.List;
import org.jeecg.modules.wx.entity.WxActiveCost;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
 * @Description: 活动费用表
 * @Author: jeecg-boot
 * @Date:   2020-02-23
 * @Version: V1.0
 */
public interface WxActiveCostMapper extends BaseMapper<WxActiveCost> {

	public boolean deleteByMainId(@Param("mainId") String mainId);
    
	public List<WxActiveCost> selectByMainId(@Param("mainId") String mainId);
}
