package org.jeecg.modules.wx.service.impl;

import org.jeecg.modules.wx.mapper.WxCountMapper;
import org.jeecg.modules.wx.service.IWxCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class WxCountServiceImpl implements IWxCountService {
    @Autowired
    private WxCountMapper wxCountMapper;

    public Map<String,Integer> countIndexData(){
        HashMap<String,Integer> map = new HashMap<>();
        map.put("userTotal", wxCountMapper.countUserTotal());
        map.put("userYestDay", wxCountMapper.countYestDayUser());
        map.put("newsTotal", wxCountMapper.countNewsHit());
        map.put("newsYestDay", wxCountMapper.countYestDayNewsHit());
        map.put("scenicTotal", wxCountMapper.countScenicHit());
        map.put("scenicYestDay", wxCountMapper.countYestDayScenicHit());
        map.put("activeTotal", wxCountMapper.countActiveHit());
        map.put("activeYestDay", wxCountMapper.countYestDayActiveHit());
        return map;
    }
}

