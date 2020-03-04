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
import org.jeecg.modules.wx.entity.WxScenic;
import org.jeecg.modules.wx.service.IWxScenicService;

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
 * @Description: 景区小片信息表
 * @Author: jeecg-boot
 * @Date:   2020-02-15
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxScenic")
@Slf4j
public class WxScenicController extends JeecgController<WxScenic, IWxScenicService> {
	@Autowired
	private IWxScenicService wxScenicService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxScenic
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxScenic wxScenic,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxScenic> queryWrapper = QueryGenerator.initQueryWrapper(wxScenic, req.getParameterMap());
		Page<WxScenic> page = new Page<WxScenic>(pageNo, pageSize);
		IPage<WxScenic> pageList = wxScenicService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	 /**
	  * 分页列表查询列表信息
	  *
	  * @param wxScenic
	  * @param pageNo
	  * @param pageSize
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listInfo")
	 public Result<?> queryPageListInfo(WxScenic wxScenic,
										@RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
										@RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
										HttpServletRequest req) {
		 QueryWrapper<WxScenic> queryWrapper = QueryGenerator.initQueryWrapper(wxScenic, req.getParameterMap());
		 Page<WxScenic> page = new Page<WxScenic>(pageNo, pageSize);
		 IPage<WxScenic> pageList = wxScenicService.page(page, queryWrapper);
		 List<WxScenic> records = pageList.getRecords();
		 for (WxScenic o:records
		 ) {
			 o.setContent("");
		 }
		 pageList.setRecords(records);
		 return Result.ok(pageList);
	 }
	/**
	 *   添加
	 *
	 * @param wxScenic
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxScenic wxScenic) {
		wxScenicService.save(wxScenic);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxScenic
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxScenic wxScenic) {
		wxScenicService.updateById(wxScenic);
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
		wxScenicService.removeById(id);
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
		this.wxScenicService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxScenic wxScenic = wxScenicService.getById(id);
		if(wxScenic==null) {
			return Result.error("未找到对应数据");
		}
		wxScenic.setHit(wxScenic.getHit()+1);
		wxScenicService.updateById(wxScenic);
		return Result.ok(wxScenic);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxScenic
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxScenic wxScenic) {
        return super.exportXls(request, wxScenic, WxScenic.class, "景区小片信息表");
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
        return super.importExcel(request, response, WxScenic.class);
    }

}
