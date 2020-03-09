package org.jeecg.modules.wx.controller;

import org.jeecg.common.api.vo.Result;

import org.jeecg.modules.wx.service.impl.WxCountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("wx/count")
public class WxCountController  {
    @Autowired
    private WxCountServiceImpl wxCountService;
    @RequestMapping("/index")
    public Result<?> indexCount(){
        Result<Map<String,Integer>> result = new Result();
        result.setResult( wxCountService.countIndexData());
        result.setSuccess(true);
        return result;
    }
}
