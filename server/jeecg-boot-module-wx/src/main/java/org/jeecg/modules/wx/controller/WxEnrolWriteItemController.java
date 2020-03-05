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
import org.jeecg.modules.wx.entity.WxEnrolWriteItem;
import org.jeecg.modules.wx.service.IWxEnrolWriteItemService;

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
 * @Description: 报名填写候选项
 * @Author: jeecg-boot
 * @Date:   2020-02-28
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxEnrolWriteItem")
@Slf4j
public class WxEnrolWriteItemController extends JeecgController<WxEnrolWriteItem, IWxEnrolWriteItemService> {
	@Autowired
	private IWxEnrolWriteItemService wxEnrolWriteItemService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxEnrolWriteItem
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxEnrolWriteItem wxEnrolWriteItem,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxEnrolWriteItem> queryWrapper = QueryGenerator.initQueryWrapper(wxEnrolWriteItem, req.getParameterMap());
		Page<WxEnrolWriteItem> page = new Page<WxEnrolWriteItem>(pageNo, pageSize);
		IPage<WxEnrolWriteItem> pageList = wxEnrolWriteItemService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param wxEnrolWriteItem
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxEnrolWriteItem wxEnrolWriteItem) {
		wxEnrolWriteItemService.save(wxEnrolWriteItem);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxEnrolWriteItem
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxEnrolWriteItem wxEnrolWriteItem) {
		wxEnrolWriteItemService.updateById(wxEnrolWriteItem);
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
		wxEnrolWriteItemService.removeById(id);
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
		this.wxEnrolWriteItemService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxEnrolWriteItem wxEnrolWriteItem = wxEnrolWriteItemService.getById(id);
		if(wxEnrolWriteItem==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxEnrolWriteItem);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxEnrolWriteItem
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxEnrolWriteItem wxEnrolWriteItem) {
        return super.exportXls(request, wxEnrolWriteItem, WxEnrolWriteItem.class, "报名填写候选项");
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
        return super.importExcel(request, response, WxEnrolWriteItem.class);
    }

}
