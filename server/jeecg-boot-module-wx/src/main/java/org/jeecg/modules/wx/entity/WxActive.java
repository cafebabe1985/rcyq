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
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-26
 * @Version: V1.0
 */
@Data
@TableName("wx_active")
public class WxActive implements Serializable {
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
	/**活动名称*/
	@Excel(name = "活动名称", width = 15)
    private java.lang.String name;
	/**活动开始时间*/
	@Excel(name = "活动开始时间", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date startTime;
	/**活动结束时间*/
	@Excel(name = "活动结束时间", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date endTime;
	/**报名截止时间*/
	@Excel(name = "报名截止时间", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date endEnrol;
	/**封面图*/
	@Excel(name = "封面图", width = 15)
    private java.lang.String poster;
	/**详细说明*/
	@Excel(name = "详细说明", width = 15)
    private java.lang.String detail;
	/**发布状态*/
	@Excel(name = "发布状态", width = 15)
    private java.lang.String displayType;
	/**队伍数量*/
	@Excel(name = "队伍数量", width = 15)
    private java.lang.Integer teamSize;
	/**活动地点*/
	@Excel(name = "活动地点", width = 15)
    private java.lang.String address;
	/**报名方式*/
	@Excel(name = "报名方式", width = 15)
    private java.lang.String enrolWay;
	/**需要审核报名*/
	@Excel(name = "需要审核报名", width = 15)
    private java.lang.String needExamineEnrol;
	/**允许代替报名*/
	@Excel(name = "允许代替报名", width = 15)
    private java.lang.String allowEnrolAgent;
	/**报名须知*/
	@Excel(name = "报名须知", width = 15)
    private java.lang.String notice;
	/**保险类型*/
	@Excel(name = "保险类型", width = 15)
    private java.lang.String insuranceType;
	/**每队人数上限*/
	@Excel(name = "每队人数上限", width = 15)
    private java.lang.Integer everyTeamMax;
	/**每队人数下限*/
	@Excel(name = "每队人数下限", width = 15)
    private java.lang.Integer everyTeamMin;
}
