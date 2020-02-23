package org.jeecg.modules.wx.entity;

import java.io.Serializable;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-23
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
    private java.lang.String createBy;
	/**创建日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date createTime;
	/**更新人*/
    private java.lang.String updateBy;
	/**更新日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date updateTime;
	/**所属部门*/
    private java.lang.String sysOrgCode;
	/**活动名称*/
    private java.lang.String name;
	/**活动开始时间*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date startTime;
	/**活动结束时间*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date endTime;
	/**报名截止时间*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date endEnrol;
	/**封面图*/
    private java.lang.String poster;
	/**详细说明*/
    private java.lang.String detail;
	/**发布状态*/
    private java.lang.String displayType;
	/**队伍数量*/
    private java.lang.Integer teamSize;
	/**活动地点*/
    private java.lang.String address;
	/**报名方式*/
    private java.lang.String enrolWay;
	/**需要审核报名*/
    private java.lang.String needExamineEnrol;
	/**允许代替报名*/
    private java.lang.String allowEnrolAgent;
	/**报名须知*/
    private java.lang.String notice;
	/**保险类型*/
    private java.lang.String insuranceType;
	/**每队人数上限*/
    private java.lang.Integer everyTeamMax;
	/**每队人数下限*/
    private java.lang.Integer everyTeamMin;
}
