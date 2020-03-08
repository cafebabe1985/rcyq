package org.jeecg.modules.wx.controller;

import java.util.*;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.wx.entity.ApplyScenic;
import org.jeecg.modules.wx.entity.WxUser;
import org.jeecg.modules.wx.service.IApplyScenicService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecg.modules.wx.service.IWxUserService;
import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;

 /**
 * @Description: 景区管理员
 * @Author: jeecg-boot
 * @Date:   2020-03-07
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/applyScenic")
@Slf4j
public class ApplyScenicController extends JeecgController<ApplyScenic, IApplyScenicService> {
	@Autowired
	private IApplyScenicService applyScenicService;
	@Autowired
	private IWxUserService wxUserService;
	
	/**
	 * 分页列表查询
	 *
	 * @param applyScenic
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(ApplyScenic applyScenic,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<ApplyScenic> queryWrapper = QueryGenerator.initQueryWrapper(applyScenic, req.getParameterMap());
		Page<ApplyScenic> page = new Page<ApplyScenic>(pageNo, pageSize);
		IPage<ApplyScenic> pageList = applyScenicService.page(page, queryWrapper);
		return Result.ok(pageList);
	}

	 /**
	  *
	  * @param applyScenic
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listAll")
	 public Result<?> listAll(ApplyScenic applyScenic,

									HttpServletRequest req) {
		 QueryWrapper<ApplyScenic> queryWrapper = QueryGenerator.initQueryWrapper(applyScenic, req.getParameterMap());

		 List<ApplyScenic> list = applyScenicService.list(queryWrapper);
		 List<Map<String,Object>> listMap = new ArrayList<>();
		 for (ApplyScenic as:list
			  ) {
			 HashMap<String,Object> map = new HashMap<>();
			 WxUser wxUser = new WxUser();
			 wxUser.setOpenId(as.getUserOpenId());
			 QueryWrapper<WxUser> queryWrapperUser = new QueryWrapper<>(wxUser);
			 WxUser one = wxUserService.getOne(queryWrapperUser);
			 map.put("userInfo", one);
			 map.put("applyInfo",as);
			 listMap.add(map);
		 }
		 return Result.ok(listMap);
	 }
	 /**
	  *
	  * @param applyScenic
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/getByOpenId")
	 public Result<?> getByOpenId(ApplyScenic applyScenic,
							  HttpServletRequest req) {
		 QueryWrapper<ApplyScenic> queryWrapper = QueryGenerator.initQueryWrapper(applyScenic, req.getParameterMap());
		 ApplyScenic apply = applyScenicService.getOne(queryWrapper);
		 HashMap<String,Object> map = new HashMap<>();
			 WxUser wxUser = new WxUser();
			 wxUser.setOpenId(apply.getUserOpenId());
			 QueryWrapper<WxUser> queryWrapperUser = new QueryWrapper<>(wxUser);
			 WxUser one = wxUserService.getOne(queryWrapperUser);
			 map.put("userInfo", one);
			 map.put("applyInfo",apply);
		 return Result.ok(map);
	 }
	/**
	 *   添加
	 *
	 * @param applyScenic
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody ApplyScenic applyScenic) {
		applyScenicService.save(applyScenic);
		return Result.ok("添加成功！");
	}
	 /**
	  *  授权更新用户状态
	  *
	  * @param applyScenic
	  * @return
	  */
	 @Transactional
	 @PutMapping(value = "/editAndUpdateUser")
	 public Result<?> editAndUpdateUser(@RequestBody ApplyScenic applyScenic) {
		 boolean b = applyScenicService.updateById(applyScenic);
		String msg="";
		 if(b){
			 WxUser wxUser = new WxUser();
			 wxUser.setOpenId(applyScenic.getUserOpenId());
			 QueryWrapper<WxUser> queryWrapper = new QueryWrapper<>(wxUser);
			 WxUser one = wxUserService.getOne(queryWrapper);
			 System.out.println(applyScenic.getStatus());
			 if(null!=one){
			 	if("1".equals(applyScenic.getStatus())){
					one.setVipLevel("1");
					msg = "授权成功！";
				}else{
					one.setVipLevel("0");
					msg = "授权已撤销！";
				}
			 	wxUserService.update(one, queryWrapper);
			 }else{
			 	return Result.error("授权失败");
			 }
		 }else{
			 return Result.error("用户已不存在,授权失败");
		 }
		 return Result.ok(msg);
	 }
	/**
	 *  编辑
	 *
	 * @param applyScenic
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody ApplyScenic applyScenic) {
		applyScenicService.updateById(applyScenic);
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
		applyScenicService.removeById(id);
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
		this.applyScenicService.removeByIds(Arrays.asList(ids.split(",")));
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
		ApplyScenic applyScenic = applyScenicService.getById(id);
		if(applyScenic==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(applyScenic);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param applyScenic
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ApplyScenic applyScenic) {
        return super.exportXls(request, applyScenic, ApplyScenic.class, "景区管理员");
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
        return super.importExcel(request, response, ApplyScenic.class);
    }

}
