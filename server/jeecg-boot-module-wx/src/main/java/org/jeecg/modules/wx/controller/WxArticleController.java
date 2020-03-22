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
import org.jeecg.modules.wx.entity.WxArticle;
import org.jeecg.modules.wx.service.IWxArticleService;

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
 * @Description: 文章杂谈
 * @Author: jeecg-boot
 * @Date:   2020-03-22
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxArticle")
@Slf4j
public class WxArticleController extends JeecgController<WxArticle, IWxArticleService> {
	@Autowired
	private IWxArticleService wxArticleService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxArticle
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxArticle wxArticle,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxArticle> queryWrapper = QueryGenerator.initQueryWrapper(wxArticle, req.getParameterMap());
		Page<WxArticle> page = new Page<WxArticle>(pageNo, pageSize);
		IPage<WxArticle> pageList = wxArticleService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	 /**
	  * 分页列表查询
	  *
	  * @param wxNews
	  * @param pageNo
	  * @param pageSize
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listInfo")
	 public Result<?> queryPageListInfo(WxArticle wxNews,
										@RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
										@RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
										HttpServletRequest req) {
		 QueryWrapper<WxArticle> queryWrapper = QueryGenerator.initQueryWrapper(wxNews, req.getParameterMap());
		 Page<WxArticle> page = new Page<WxArticle>(pageNo, pageSize);
		 IPage<WxArticle> pageList = wxArticleService.page(page, queryWrapper);
		 List<WxArticle> records = pageList.getRecords();
		 for (WxArticle o:records
		 ) {
			 o.setContent("");
		 }
		 pageList.setRecords(records);
		 return Result.ok(pageList);
	 }
	/**
	 *   添加
	 *
	 * @param wxArticle
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxArticle wxArticle) {
		wxArticleService.save(wxArticle);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxArticle
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxArticle wxArticle) {
		wxArticleService.updateById(wxArticle);
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
		wxArticleService.removeById(id);
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
		this.wxArticleService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxArticle wxArticle = wxArticleService.getById(id);
		if(wxArticle==null) {
			return Result.error("未找到对应数据");
		}
		if(null == wxArticle.getHit()){
			wxArticle.setHit(1);
		}else{
			wxArticle.setHit(wxArticle.getHit()+1);
		}

		wxArticleService.updateById(wxArticle);
		return Result.ok(wxArticle);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxArticle
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxArticle wxArticle) {
        return super.exportXls(request, wxArticle, WxArticle.class, "文章杂谈");
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
        return super.importExcel(request, response, WxArticle.class);
    }

}
