package org.jeecg.modules.wx.entity;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.jeecg.common.aspect.annotation.Dict;

/**
 * @Description: 微信用户
 * @Author: jeecg-boot
 * @Date:   2020-02-14
 * @Version: V1.0
 */
@Data
@TableName("wx_user")
public class WxUser implements Serializable {
    private static final long serialVersionUID = 1L;
    
	/**主键*/
	@TableId(type = IdType.ID_WORKER_STR)
    private java.lang.String id;
	/**创建人*/
	@Excel(name = "创建人", width = 15)
    private java.lang.String createBy;
	/**创建日期*/
	@Excel(name = "创建日期", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date createTime;
	/**更新人*/
	@Excel(name = "更新人", width = 15)
    private java.lang.String updateBy;
	/**更新日期*/
	@Excel(name = "更新日期", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date updateTime;
	/**所属部门*/
	@Excel(name = "所属部门", width = 15)
    private java.lang.String sysOrgCode;
	/**微信ID*/
	@Excel(name = "微信ID", width = 15)
    private java.lang.String openId;
	/**微信昵称*/
	@Excel(name = "微信昵称", width = 15)
    private java.lang.String nickName;
	/**城市*/
	@Excel(name = "城市", width = 15)
    private java.lang.String city;
	/**国家*/
	@Excel(name = "国家", width = 15)
    private java.lang.String country;
	/**性别*/
	@Excel(name = "性别", width = 15)
    private java.lang.String gender;
	/**语言*/
	@Excel(name = "语言", width = 15)
    private java.lang.String language;
	/**省份*/
	@Excel(name = "省份", width = 15)
    private java.lang.String province;
	/**头像*/
	@Excel(name = "头像", width = 15)
    private java.lang.String avatarUrl;
	/**会员等级*/
	@Excel(name = "会员等级", width = 15)
    private java.lang.String vipLevel;
	/**积分*/
	@Excel(name = "积分", width = 15)
    private java.lang.Integer accumulatePoint;
	/**手机*/
	@Excel(name = "手机", width = 15)
    private java.lang.String phone;
}
