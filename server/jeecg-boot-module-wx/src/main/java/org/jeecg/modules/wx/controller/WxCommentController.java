package org.jeecg.modules.wx.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.wx.entity.WxComment;
import org.jeecg.modules.wx.entity.WxCommentVO;
import org.jeecg.modules.wx.service.IWxCommentService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;

 /**
 * @Description: 内容评论
 * @Author: jeecg-boot
 * @Date:   2020-02-14
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxComment")
@Slf4j
public class WxCommentController extends JeecgController<WxComment, IWxCommentService> {
	@Autowired
	private IWxCommentService wxCommentService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxComment
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxComment wxComment,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxComment> queryWrapper = QueryGenerator.initQueryWrapper(wxComment, req.getParameterMap());
		Page<WxComment> page = new Page<WxComment>(pageNo, pageSize);
		IPage<WxComment> pageList = wxCommentService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	 /**
	  * 分页列表联合查询
	  *
	  * @param wxCommentVO
	  * @param pageNo
	  * @param pageSize
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listInner")
	 public Result<?> queryPageListInner(WxCommentVO wxCommentVO,
									@RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
									@RequestParam(name="pageSize", defaultValue="1000") Integer pageSize,
									@RequestParam("id") String id,
									HttpServletRequest req) {
//		 QueryWrapper<WxCommentVO> queryWrapper = QueryGenerator.initQueryWrapper(wxCommentVO, req.getParameterMap());
		 Page<WxCommentVO> page = new Page<WxCommentVO>(pageNo, pageSize);
		 IPage<WxCommentVO> pageList = wxCommentService.selectPageMain(page, id);

		 List<WxCommentVO> records = pageList.getRecords();
		 for (WxCommentVO vo:records
			  ) {
			 vo.setWxCommentVOs(wxCommentService.listSub(vo.getId()));
		 }
		 pageList.setRecords(records);
		 return Result.ok(pageList);
	 }
	/**
	 *   添加
	 *
	 * @param wxComment
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxComment wxComment) {
		wxCommentService.save(wxComment);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxComment
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxComment wxComment) {
		wxCommentService.updateById(wxComment);
		return Result.ok("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@DeleteMapping(value = "/delete")
	public Result<?> delete(@RequestParam(name="id",required=true) String id) {
		wxCommentService.removeById(id);
		return Result.ok("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@DeleteMapping(value = "/deleteBatch")
	public Result<?> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.wxCommentService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.ok("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/queryById")
	public Result<?> queryById(@RequestParam(name="id",required=true) String id) {
		WxComment wxComment = wxCommentService.getById(id);
		if(wxComment==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxComment);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxComment
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxComment wxComment) {
        return super.exportXls(request, wxComment, WxComment.class, "内容评论");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, WxComment.class);
    }

}
