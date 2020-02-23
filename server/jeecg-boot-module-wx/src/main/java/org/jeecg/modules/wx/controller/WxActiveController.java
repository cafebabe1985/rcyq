package org.jeecg.modules.wx.controller;

import java.io.UnsupportedEncodingException;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.vo.LoginUser;
import org.apache.shiro.SecurityUtils;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.wx.entity.WxActiveCost;
import org.jeecg.modules.wx.entity.WxActive;
import org.jeecg.modules.wx.vo.WxActivePage;
import org.jeecg.modules.wx.service.IWxActiveService;
import org.jeecg.modules.wx.service.IWxActiveCostService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import com.alibaba.fastjson.JSON;

 /**
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-23
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxActive")
@Slf4j
public class WxActiveController {
	@Autowired
	private IWxActiveService wxActiveService;
	@Autowired
	private IWxActiveCostService wxActiveCostService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxActive
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxActive wxActive,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxActive> queryWrapper = QueryGenerator.initQueryWrapper(wxActive, req.getParameterMap());
		Page<WxActive> page = new Page<WxActive>(pageNo, pageSize);
		IPage<WxActive> pageList = wxActiveService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param wxActivePage
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxActivePage wxActivePage) {
		WxActive wxActive = new WxActive();
		BeanUtils.copyProperties(wxActivePage, wxActive);
		wxActiveService.saveMain(wxActive, wxActivePage.getWxActiveCostList());
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxActivePage
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxActivePage wxActivePage) {
		WxActive wxActive = new WxActive();
		BeanUtils.copyProperties(wxActivePage, wxActive);
		WxActive wxActiveEntity = wxActiveService.getById(wxActive.getId());
		if(wxActiveEntity==null) {
			return Result.error("未找到对应数据");
		}
		wxActiveService.updateMain(wxActive, wxActivePage.getWxActiveCostList());
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
		wxActiveService.delMain(id);
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
		this.wxActiveService.delBatchMain(Arrays.asList(ids.split(",")));
		return Result.ok("批量删除成功！");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/queryById")
	public Result<?> queryById(@RequestParam(name="id",required=true) String id) {
		WxActive wxActive = wxActiveService.getById(id);
		if(wxActive==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxActive);

	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/queryWxActiveCostByMainId")
	public Result<?> queryWxActiveCostListByMainId(@RequestParam(name="id",required=true) String id) {
		List<WxActiveCost> wxActiveCostList = wxActiveCostService.selectByMainId(id);
		return Result.ok(wxActiveCostList);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxActive
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxActive wxActive) {
      // Step.1 组装查询条件查询数据
      QueryWrapper<WxActive> queryWrapper = QueryGenerator.initQueryWrapper(wxActive, request.getParameterMap());
      LoginUser sysUser = (LoginUser) SecurityUtils.getSubject().getPrincipal();

      //Step.2 获取导出数据
      List<WxActive> queryList = wxActiveService.list(queryWrapper);
      // 过滤选中数据
      String selections = request.getParameter("selections");
      List<WxActive> wxActiveList = new ArrayList<WxActive>();
      if(oConvertUtils.isEmpty(selections)) {
          wxActiveList = queryList;
      }else {
          List<String> selectionList = Arrays.asList(selections.split(","));
          wxActiveList = queryList.stream().filter(item -> selectionList.contains(item.getId())).collect(Collectors.toList());
      }

      // Step.3 组装pageList
      List<WxActivePage> pageList = new ArrayList<WxActivePage>();
      for (WxActive main : wxActiveList) {
          WxActivePage vo = new WxActivePage();
          BeanUtils.copyProperties(main, vo);
          List<WxActiveCost> wxActiveCostList = wxActiveCostService.selectByMainId(main.getId());
          vo.setWxActiveCostList(wxActiveCostList);
          pageList.add(vo);
      }

      // Step.4 AutoPoi 导出Excel
      ModelAndView mv = new ModelAndView(new JeecgEntityExcelView());
      mv.addObject(NormalExcelConstants.FILE_NAME, "活动列表");
      mv.addObject(NormalExcelConstants.CLASS, WxActivePage.class);
      mv.addObject(NormalExcelConstants.PARAMS, new ExportParams("活动数据", "导出人:"+sysUser.getRealname(), "活动"));
      mv.addObject(NormalExcelConstants.DATA_LIST, pageList);
      return mv;
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
      MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
      Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
      for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
          MultipartFile file = entity.getValue();// 获取上传文件对象
          ImportParams params = new ImportParams();
          params.setTitleRows(2);
          params.setHeadRows(1);
          params.setNeedSave(true);
          try {
              List<WxActivePage> list = ExcelImportUtil.importExcel(file.getInputStream(), WxActivePage.class, params);
              for (WxActivePage page : list) {
                  WxActive po = new WxActive();
                  BeanUtils.copyProperties(page, po);
                  wxActiveService.saveMain(po, page.getWxActiveCostList());
              }
              return Result.ok("文件导入成功！数据行数:" + list.size());
          } catch (Exception e) {
              log.error(e.getMessage(),e);
              return Result.error("文件导入失败:"+e.getMessage());
          } finally {
              try {
                  file.getInputStream().close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }
      return Result.ok("文件导入失败！");
    }

}
