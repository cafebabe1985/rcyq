package org.jeecg.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date: 2020-02-26
 * @Version: V1.0
 */
@Data
@TableName("wx_active")
public class WxActiveVO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(type = IdType.ID_WORKER_STR)
    private String id;
    /**
     * 创建人
     */
    @Excel(name = "创建人", width = 15)
    private String createBy;
    /**
     * 创建日期
     */
    @Excel(name = "创建日期", width = 20, format = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    /**
     * 更新人
     */
    @Excel(name = "更新人", width = 15)
    private String updateBy;
    /**
     * 更新日期
     */
    @Excel(name = "更新日期", width = 20, format = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
    /**
     * 所属部门
     */
    @Excel(name = "所属部门", width = 15)
    private String sysOrgCode;
    /**
     * 活动名称
     */
    @Excel(name = "活动名称", width = 15)
    private String name;
    /**
     * 活动开始时间
     */
    @Excel(name = "活动开始时间", width = 20, format = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startTime;
    /**
     * 活动结束时间
     */
    @Excel(name = "活动结束时间", width = 20, format = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    /**
     * 报名截止时间
     */
    @Excel(name = "报名截止时间", width = 20, format = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endEnrol;
    /**
     * 封面图
     */
    @Excel(name = "封面图", width = 15)
    private String poster;
    /**
     * 详细说明
     */
    @Excel(name = "详细说明", width = 15)
    private String detail;
    /**
     * 发布状态
     */
    @Excel(name = "发布状态", width = 15)
    private String displayType;
    /**
     * 队伍数量
     */
    @Excel(name = "队伍数量", width = 15)
    private Integer teamSize;
    /**
     * 活动地点
     */
    @Excel(name = "活动地点", width = 15)
    private String address;
    /**
     * 报名方式
     */
    @Excel(name = "报名方式", width = 15)
    private String enrolWay;
    /**
     * 需要审核报名
     */
    @Excel(name = "需要审核报名", width = 15)
    private String needExamineEnrol;
    /**
     * 允许代替报名
     */
    @Excel(name = "允许代替报名", width = 15)
    private String allowEnrolAgent;
    /**
     * 报名须知
     */
    @Excel(name = "报名须知", width = 15)
    private String notice;
    /**
     * 保险类型
     */
    @Excel(name = "保险类型", width = 15)
    private String insuranceType;
    /**
     * 每队人数上限
     */
    @Excel(name = "每队人数上限", width = 15)
    private Integer everyTeamMax;
    /**
     * 每队人数下限
     */
    @Excel(name = "每队人数下限", width = 15)
    private Integer everyTeamMin;
    /**
     * 费用
     */
    @TableField(exist = false)
    private WxActiveCostVO cost;

    /**
     * 报名填写项
     */
    @TableField(exist = false)
    private List<WxActiveEnrolWriteVO> enrolWriteOpts;

    /**
     * 活动发起人信息
     */
    @TableField(exist = false)
    private WxUser createUserInfo;


    /**点击数*/
    @Excel(name = "点击数", width = 15)
    private java.lang.Integer hit;

    /**报名数*/
    @TableField(exist = false)
    private java.lang.Integer enrolTotal;

    /**剩余名额*/
    @TableField(exist = false)
    private java.lang.Integer remainNumber;
}
