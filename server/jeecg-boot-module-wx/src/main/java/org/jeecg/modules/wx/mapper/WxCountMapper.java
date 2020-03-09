package org.jeecg.modules.wx.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface WxCountMapper {
    @Select("select count(*) from wx_user")
    int countUserTotal();
    @Select("select count(*) from wx_user where (TO_DAYS( NOW( )) - TO_DAYS( create_time ) <= 1)")
    int countYestDayUser();
    @Select("SELECT SUM(hit) FROM wx_news")
    int countNewsHit();
    @Select("select SUM(hit) from wx_news where (TO_DAYS( NOW( )) - TO_DAYS( create_time ) <= 1)")
    int countYestDayNewsHit();
    @Select("SELECT SUM(hit) FROM wx_scenic")
    int countScenicHit();
    @Select("select SUM(hit) from wx_scenic where (TO_DAYS( NOW( )) - TO_DAYS( create_time ) <= 1)")
    int countYestDayScenicHit();
    @Select("SELECT SUM(hit) FROM wx_active")
    int countActiveHit();
    @Select("select SUM(hit) from wx_active where (TO_DAYS( NOW( )) - TO_DAYS( create_time ) <= 1)")
    int countYestDayActiveHit();
}
