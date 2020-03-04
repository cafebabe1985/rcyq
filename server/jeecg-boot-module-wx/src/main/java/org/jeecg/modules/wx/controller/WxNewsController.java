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
import org.jeecg.modules.wx.entity.WxNews;
import org.jeecg.modules.wx.service.IWxNewsService;

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
 * @Description: 快讯表
 * @Author: jeecg-boot
 * @Date:   2020-02-15
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxNews")
@Slf4j
public class WxNewsController extends JeecgController<WxNews, IWxNewsService> {
	@Autowired
	private IWxNewsService wxNewsService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxNews
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxNews wxNews,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxNews> queryWrapper = QueryGenerator.initQueryWrapper(wxNews, req.getParameterMap());
		Page<WxNews> page = new Page<WxNews>(pageNo, pageSize);
		IPage<WxNews> pageList = wxNewsService.page(page, queryWrapper);
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
	 public Result<?> queryPageListInfo(WxNews wxNews,
										@RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
										@RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
										HttpServletRequest req) {
		 QueryWrapper<WxNews> queryWrapper = QueryGenerator.initQueryWrapper(wxNews, req.getParameterMap());
		 Page<WxNews> page = new Page<WxNews>(pageNo, pageSize);
		 IPage<WxNews> pageList = wxNewsService.page(page, queryWrapper);
		 List<WxNews> records = pageList.getRecords();
		 for (WxNews o:records
		 ) {
			 o.setContent("");
		 }
		 pageList.setRecords(records);
		 return Result.ok(pageList);
	 }
	/**
	 *   添加
	 *
	 * @param wxNews
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxNews wxNews) {
		wxNewsService.save(wxNews);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxNews
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxNews wxNews) {
		wxNewsService.updateById(wxNews);
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
		wxNewsService.removeById(id);
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
		this.wxNewsService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxNews wxNews = wxNewsService.getById(id);
		if(wxNews==null) {
			return Result.error("未找到对应数据");
		}
		wxNews.setHit(wxNews.getHit()+1);
		wxNewsService.updateById(wxNews);
		return Result.ok(wxNews);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxNews
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxNews wxNews) {
        return super.exportXls(request, wxNews, WxNews.class, "快讯表");
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
        return super.importExcel(request, response, WxNews.class);
    }

}
