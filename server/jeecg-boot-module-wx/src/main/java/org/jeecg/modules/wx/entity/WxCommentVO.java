package org.jeecg.modules.wx.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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
 * @Description: 内容评论
 * @Author: jeecg-boot
 * @Date:   2020-02-14
 * @Version: V1.0
 */
@Data
@TableName("wx_comment")
public class WxCommentVO implements Serializable {
    private static final long serialVersionUID = 1L;

	/**主键*/
	@TableId(type = IdType.ID_WORKER_STR)
    private String id;
	/**创建人*/
	@Excel(name = "创建人", width = 15)
    private String createBy;
	/**创建日期*/
	@Excel(name = "创建日期", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date createTime;
	/**更新人*/
	@Excel(name = "更新人", width = 15)
    private String updateBy;
	/**更新日期*/
	@Excel(name = "更新日期", width = 20, format = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
	/**所属部门*/
	@Excel(name = "所属部门", width = 15)
    private String sysOrgCode;
	/**内容ID*/
	@Excel(name = "内容ID", width = 15)
    private String contentId;
	/**内容类别*/
	@Excel(name = "内容类别", width = 15)
    private String contentType;
	/**被评论ID*/
	@Excel(name = "被评论ID", width = 15)
    private List<WxCommentVO> wxCommentVOs;
	/**微信ID*/
	@Excel(name = "微信ID", width = 15)
	private java.lang.String openId;
	/**微信昵称*/
	@Excel(name = "微信昵称", width = 15)
	private java.lang.String nickName;
	/**头像*/
	@Excel(name = "头像", width = 15)
	private java.lang.String avatarUrl;
	/**评论内容*/
	@Excel(name = "评论内容", width = 15)
    private String commentContent;
	/**被评论ID*/
	@Excel(name = "被评论ID", width = 15)
	private java.lang.String atCommentId;
}
