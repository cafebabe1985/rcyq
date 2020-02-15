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
import org.jeecg.modules.wx.entity.ScenicCityTab;
import org.jeecg.modules.wx.service.IScenicCityTabService;

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
 * @Description: 城市标签
 * @Author: jeecg-boot
 * @Date:   2020-02-11
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/scenicCityTab")
@Slf4j
public class ScenicCityTabController extends JeecgController<ScenicCityTab, IScenicCityTabService> {
	@Autowired
	private IScenicCityTabService scenicCityTabService;
	
	/**
	 * 分页列表查询
	 *
	 * @param scenicCityTab
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(ScenicCityTab scenicCityTab,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="1000") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<ScenicCityTab> queryWrapper = QueryGenerator.initQueryWrapper(scenicCityTab, req.getParameterMap());
		Page<ScenicCityTab> page = new Page<ScenicCityTab>(pageNo, pageSize);
		IPage<ScenicCityTab> pageList = scenicCityTabService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param scenicCityTab
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody ScenicCityTab scenicCityTab) {
		scenicCityTabService.save(scenicCityTab);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param scenicCityTab
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody ScenicCityTab scenicCityTab) {
		scenicCityTabService.updateById(scenicCityTab);
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
		scenicCityTabService.removeById(id);
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
		this.scenicCityTabService.removeByIds(Arrays.asList(ids.split(",")));
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
		ScenicCityTab scenicCityTab = scenicCityTabService.getById(id);
		if(scenicCityTab==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(scenicCityTab);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param scenicCityTab
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScenicCityTab scenicCityTab) {
        return super.exportXls(request, scenicCityTab, ScenicCityTab.class, "城市标签");
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
        return super.importExcel(request, response, ScenicCityTab.class);
    }

}
