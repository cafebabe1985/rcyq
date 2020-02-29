package org.jeecg.modules.wx.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.jeecg.modules.wx.entity.WxActive;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.jeecg.modules.wx.entity.WxActiveVO;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-26
 * @Version: V1.0
 */
public interface WxActiveMapper extends BaseMapper<WxActive> {
@Insert(" insert into wx_active (name,start_time,end_time,end_enrol,poster,detail,display_type,team_size" +
        ",address,enrol_way,need_examine_enrol,allow_enrol_agent,notice,insurance_type,every_team_max,every_team_min) values (" +
        "#{wxActive.name},#{wxActive.startTime},#{wxActive.endTime},#{wxActive.endEnrol}" +
        ",#{wxActive.poster},#{wxActive.detail},#{wxActive.displayType}" +
        ",#{wxActive.teamSize},#{wxActive.address},#{wxActive.enrolWay}" +
        ",#{wxActive.needExamineEnrol},#{wxActive.allowEnrolAgent},#{wxActive.notice}" +
        ",#{wxActive.insuranceType},#{wxActive.everyTeamMax},#{wxActive.everyTeamMin})")

    String saveVO(@Param("wxActive") WxActiveVO wxActive);
}
