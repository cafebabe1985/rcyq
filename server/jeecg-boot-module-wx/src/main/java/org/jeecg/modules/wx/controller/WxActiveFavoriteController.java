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
import org.jeecg.modules.wx.entity.WxActiveFavorite;
import org.jeecg.modules.wx.service.IWxActiveFavoriteService;

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
 * @Description: 活动收藏
 * @Author: jeecg-boot
 * @Date:   2020-03-04
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxActiveFavorite")
@Slf4j
public class WxActiveFavoriteController extends JeecgController<WxActiveFavorite, IWxActiveFavoriteService> {
	@Autowired
	private IWxActiveFavoriteService wxActiveFavoriteService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxActiveFavorite
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxActiveFavorite wxActiveFavorite,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxActiveFavorite> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveFavorite, req.getParameterMap());
		Page<WxActiveFavorite> page = new Page<WxActiveFavorite>(pageNo, pageSize);
		IPage<WxActiveFavorite> pageList = wxActiveFavoriteService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	 /**
	  * 分页列表查询
	  *
	  * @param wxActiveFavorite
	  *
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listAll")
	 public Result<?> queryPageList(WxActiveFavorite wxActiveFavorite,

									HttpServletRequest req) {
		 QueryWrapper<WxActiveFavorite> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveFavorite, req.getParameterMap());

		 List<WxActiveFavorite> pageList = wxActiveFavoriteService.list(queryWrapper);
		 return Result.ok(pageList);
	 }
	 /**
	  * 计数
	  *
	  * @param wxActiveFavorite
	  *
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/count")
	 public Result<?> countByOpenID(WxActiveFavorite wxActiveFavorite,

									HttpServletRequest req) {
		 QueryWrapper<WxActiveFavorite> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveFavorite, req.getParameterMap());

		 int count = wxActiveFavoriteService.count(queryWrapper);
		 return Result.ok(count);
	 }
	/**
	 *   添加
	 *
	 * @param wxActiveFavorite
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxActiveFavorite wxActiveFavorite) {
		wxActiveFavoriteService.save(wxActiveFavorite);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxActiveFavorite
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxActiveFavorite wxActiveFavorite) {
		wxActiveFavoriteService.updateById(wxActiveFavorite);
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
		wxActiveFavoriteService.removeById(id);
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
		this.wxActiveFavoriteService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxActiveFavorite wxActiveFavorite = wxActiveFavoriteService.getById(id);
		if(wxActiveFavorite==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxActiveFavorite);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxActiveFavorite
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxActiveFavorite wxActiveFavorite) {
        return super.exportXls(request, wxActiveFavorite, WxActiveFavorite.class, "活动收藏");
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
        return super.importExcel(request, response, WxActiveFavorite.class);
    }

}
