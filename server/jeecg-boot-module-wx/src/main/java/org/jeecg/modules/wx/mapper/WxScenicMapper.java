package org.jeecg.modules.wx.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.jeecg.modules.wx.entity.WxScenic;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * @Description: 景区小片信息表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
public interface WxScenicMapper extends BaseMapper<WxScenic> {
@Update("update wx_scenic set hit=hit+1 where id = #{id}")
int updateHit(@Param("id") String id);
}
