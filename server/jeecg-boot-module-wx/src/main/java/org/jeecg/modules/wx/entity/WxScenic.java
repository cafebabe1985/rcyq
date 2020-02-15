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
 * @Description: 景区小片信息表
 * @Author: jeecg-boot
 * @Date:   2020-02-12
 * @Version: V1.0
 */
@Data
@TableName("wx_scenic")
public class WxScenic implements Serializable {
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
	/**标题*/
	@Excel(name = "标题", width = 15)
    private java.lang.String title;
	/**副标题*/
	@Excel(name = "副标题", width = 15)
    private java.lang.String subTitle;
	/**封面图*/
	@Excel(name = "封面图", width = 15)
    private java.lang.String poster;
	/**点击数*/
	@Excel(name = "点击数", width = 15)
    private java.lang.Integer hit;
	/**内容*/
	@Excel(name = "内容", width = 15)
    private java.lang.String content;
	/**编辑*/
	@Excel(name = "编辑", width = 15)
    private java.lang.String author;
	/**小片名称*/
	@Excel(name = "小片名称", width = 15)
    private java.lang.String scenicName;
	/**所在城市*/
	@Excel(name = "所在城市", width = 15)
    private java.lang.String city;
	/**展示类型*/
	@Excel(name = "展示类型", width = 15)
    private java.lang.String displayType;
	/**跳转地址*/
	@Excel(name = "跳转地址", width = 15)
    private java.lang.String targetUrl;
	/**内容类型*/
	@Excel(name = "内容类型", width = 15)
    private java.lang.String newsType;
}
