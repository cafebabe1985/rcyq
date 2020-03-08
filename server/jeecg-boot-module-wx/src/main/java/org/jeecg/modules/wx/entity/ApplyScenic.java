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
 * @Description: 景区管理员
 * @Author: jeecg-boot
 * @Date:   2020-03-07
 * @Version: V1.0
 */
@Data
@TableName("apply_scenic")
public class ApplyScenic implements Serializable {
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
	/**真实姓名*/
	@Excel(name = "真实姓名", width = 15)
    private java.lang.String realName;
	/**微信openID*/
	@Excel(name = "微信openID", width = 15)
    private java.lang.String userOpenId;
	/**身份证号*/
	@Excel(name = "身份证号", width = 15)
    private java.lang.String cid;
	/**手机号*/
	@Excel(name = "手机号", width = 15)
	private java.lang.String phone;
	/**地区*/
	@Excel(name = "手机号", width = 15)
	private java.lang.String city;
	/**身份证正面照*/
	@Excel(name = "身份证正面照", width = 15)
    private java.lang.String cidfront;
	/**身份证背面照*/
	@Excel(name = "身份证背面照", width = 15)
    private java.lang.String cidback;
	/**授权状态*/
	@Excel(name = "授权状态", width = 15)
    private java.lang.String status;
}
