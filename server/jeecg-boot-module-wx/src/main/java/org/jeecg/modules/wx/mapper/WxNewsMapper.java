package org.jeecg.modules.wx.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.jeecg.modules.wx.entity.WxNews;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * @Description: 快讯表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
public interface WxNewsMapper extends BaseMapper<WxNews> {
    @Update("update wx_news set hit=hit+1 where id = #{id}")
    int updateHit(String id);
}
