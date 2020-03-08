package org.jeecg.modules.wx.controller;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import me.chanjar.weixin.common.error.WxErrorException;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.system.util.JwtUtil;
import org.jeecg.modules.wx.config.WxMaConfiguration;
import org.jeecg.modules.wx.entity.WxUser;
import org.jeecg.modules.wx.service.IWxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/wx")
public class WxLoginController {
    @Value("${wxAppId}")
    private String appid;

    @Autowired
    private IWxUserService wxUserService;

    /**
     * 登陆接口
     */
    @GetMapping("/login")
    public Result<?> login(@RequestParam("code") String code) {
        if (StringUtils.isBlank(code)) {
            return  Result.error("授权码为空") ;
        }
        final WxMaService wxService = WxMaConfiguration.getMaService(appid);

        try {
            WxMaJscode2SessionResult session = wxService.getUserService().getSessionInfo(code);

            return Result.ok( JSON.toJSONString(session));
        } catch (WxErrorException e) {

            return Result.error(e.toString()) ;
        }
    }

    /**
     * <pre>
     * 获取用户信息接口
     * </pre>
     */
    @GetMapping("/info")
    public String info(String sessionKey,
                       String signature, String rawData, String encryptedData, String iv) {
        final WxMaService wxService = WxMaConfiguration.getMaService(appid);

        // 用户信息校验
        if (!wxService.getUserService().checkUserInfo(sessionKey, rawData, signature)) {
            return "user check failed";
        }
        // 解密用户信息
        WxMaUserInfo userInfo = wxService.getUserService().getUserInfo(sessionKey, encryptedData, iv);
        WxUser wxUser = new WxUser();
        wxUser.setNickName(userInfo.getNickName());
        wxUser.setAvatarUrl(userInfo.getAvatarUrl());
        wxUser.setCity(userInfo.getCity());
        wxUser.setCountry(userInfo.getCountry());
        wxUser.setGender(userInfo.getGender());
        wxUser.setLanguage(userInfo.getLanguage());
        wxUser.setOpenId(userInfo.getOpenId());
        wxUser.setProvince(userInfo.getProvince());
        Map<String, String[]> parameterMap = new HashMap<>();
        parameterMap.put("openId", new String[]{userInfo.getOpenId()});
        QueryWrapper<WxUser> queryWrapper = QueryGenerator.initQueryWrapper(wxUser, parameterMap);
        WxUser one = wxUserService.getOne(queryWrapper);
        System.out.println(one);
        if (null == one) {
            try {
                wxUserService.save(wxUser);
            }catch (Exception e){
                System.out.println(e.getMessage());
                return JSON.toJSONString(userInfo);
            }

        }
        return JSON.toJSONString(userInfo);
    }

    /**
     * <pre>
     * 获取用户绑定手机号信息
     * </pre>
     */
    @GetMapping("/phone")
    public String phone(String sessionKey, String signature,
                        String rawData, String encryptedData, String iv) {
        System.out.println("getphone");
        final WxMaService wxService = WxMaConfiguration.getMaService(appid);

        // 用户信息校验
        if (!wxService.getUserService().checkUserInfo(sessionKey, rawData, signature)) {
            return "user check failed";
        }

        // 解密
        WxMaPhoneNumberInfo phoneNoInfo = wxService.getUserService().getPhoneNoInfo(sessionKey, encryptedData, iv);

        return JSON.toJSONString(phoneNoInfo);
    }

}
