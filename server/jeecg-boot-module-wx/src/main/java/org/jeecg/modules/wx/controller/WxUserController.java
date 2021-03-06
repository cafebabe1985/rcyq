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

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.wx.entity.WxUser;
import org.jeecg.modules.wx.service.IWxUserService;

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
 * @Description: 微信用户
 * @Author: jeecg-boot
 * @Date:   2020-03-08
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxUser")
@Slf4j
public class WxUserController extends JeecgController<WxUser, IWxUserService> {
	@Autowired
	private IWxUserService wxUserService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxUser
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxUser wxUser,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxUser> queryWrapper = QueryGenerator.initQueryWrapper(wxUser, req.getParameterMap());
		Page<WxUser> page = new Page<WxUser>(pageNo, pageSize);
		IPage<WxUser> pageList = wxUserService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param wxUser
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxUser wxUser) {
		wxUserService.save(wxUser);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param wxUser
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxUser wxUser) {
		wxUserService.updateById(wxUser);
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
		wxUserService.removeById(id);
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
		this.wxUserService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxUser wxUser = wxUserService.getById(id);
		if(wxUser==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxUser);
	}
	 /**
	  * 通过openId查询
	  *
	  * @param openId
	  * @return
	  */
	 @GetMapping(value = "/queryByOpenId")
	 public Result<?> queryByOpenId(@RequestParam(name="openId",required=true) String openId) {
		 WxUser user = new WxUser();
		 user.setOpenId(openId);
		 Wrapper<WxUser> userQuery = new QueryWrapper<>(user);
		 WxUser wxUser = wxUserService.getOne(userQuery);
		 if(wxUser==null) {
			 return Result.error("未找到对应数据");
		 }
		 return Result.ok(wxUser);
	 }
    /**
    * 导出excel
    *
    * @param request
    * @param wxUser
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxUser wxUser) {
        return super.exportXls(request, wxUser, WxUser.class, "微信用户");
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
        return super.importExcel(request, response, WxUser.class);
    }

}
