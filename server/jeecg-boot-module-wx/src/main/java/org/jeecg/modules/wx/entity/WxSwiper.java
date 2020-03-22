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
 * @Description: 首页轮播图管理
 * @Author: jeecg-boot
 * @Date:   2020-03-20
 * @Version: V1.0
 */
@Data
@TableName("wx_swiper")
public class WxSwiper implements Serializable {
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
	/**广告图*/
	@Excel(name = "广告图", width = 15)
    private java.lang.String img;
	/**跳转地址*/
	@Excel(name = "跳转地址", width = 15)
    private java.lang.String targetHref;
	/**类型*/
	@Excel(name = "类型", width = 15)
    private java.lang.String type;
	/**名称*/
	@Excel(name = "名称", width = 15)
    private java.lang.String name;
	/**轮播顺序*/
	@Excel(name = "轮播顺序", width = 15)
    private java.lang.Integer displayOrder;
	/**是否展示*/
	@Excel(name = "是否展示", width = 15)
    private java.lang.String display;
	/**内容*/
	@Excel(name = "内容", width = 15)
    private java.lang.String content;
}
