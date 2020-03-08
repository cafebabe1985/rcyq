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
 * @Description: 活动报名表
 * @Author: jeecg-boot
 * @Date:   2020-03-03
 * @Version: V1.0
 */
@Data
@TableName("wx_active_enrol_user")
public class WxActiveEnrolUser implements Serializable {
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
	/**活动ID*/
	@Excel(name = "活动ID", width = 15)
    private java.lang.String activeId;
	/**用户openID*/
	@Excel(name = "用户openID", width = 15)
    private java.lang.String userOpneId;
	/**用户类型*/
	@Excel(name = "用户类型", width = 15)
    private java.lang.String userType;
	/**用户电话*/
	@Excel(name = "用户电话", width = 15)
    private java.lang.String userPhone;
	/**活动期间昵称*/
	@Excel(name = "活动期间昵称", width = 15)
    private java.lang.String userNickName;
	/**真实姓名*/
	@Excel(name = "真实姓名", width = 15)
    private java.lang.String userRealName;
	/**身份证号*/
	@Excel(name = "身份证号", width = 15)
    private java.lang.String userCid;
	/**性别*/
	@Excel(name = "性别", width = 15)
    private java.lang.String userGender;
	/**自定义选项*/
	@Excel(name = "自定义选项", width = 15)
    private java.lang.String metaInfo;
	/**帮助报名人ID*/
	@Excel(name = "帮助报名人ID", width = 15)
    private java.lang.String enrolAgentOpenId;

	/**报名状态*/
	@Excel(name = "帮助状态", width = 15)
	private java.lang.String enrolStatus;
}
