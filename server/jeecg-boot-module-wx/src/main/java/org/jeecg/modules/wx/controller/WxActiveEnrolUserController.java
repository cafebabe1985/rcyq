package org.jeecg.modules.wx.controller;

import java.util.*;
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
import org.jeecg.modules.wx.WxSysConst;
import org.jeecg.modules.wx.entity.WxActive;
import org.jeecg.modules.wx.entity.WxActiveEnrolUser;
import org.jeecg.modules.wx.entity.WxUser;
import org.jeecg.modules.wx.service.IWxActiveEnrolUserService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecg.modules.wx.service.IWxActiveService;
import org.jeecg.modules.wx.service.IWxUserService;
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
 * @Description: 活动报名表
 * @Author: jeecg-boot
 * @Date:   2020-03-03
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxActiveEnrolUser")
@Slf4j
public class WxActiveEnrolUserController extends JeecgController<WxActiveEnrolUser, IWxActiveEnrolUserService> {
	@Autowired
	private IWxActiveEnrolUserService wxActiveEnrolUserService;
	@Autowired
	private IWxUserService wxUserService;
	@Autowired
	private IWxActiveService wxActiveService;
	
	/**
	 * 分页列表查询
	 *
	 * @param wxActiveEnrolUser
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@GetMapping(value = "/list")
	public Result<?> queryPageList(WxActiveEnrolUser wxActiveEnrolUser,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<WxActiveEnrolUser> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveEnrolUser, req.getParameterMap());
		Page<WxActiveEnrolUser> page = new Page<WxActiveEnrolUser>(pageNo, pageSize);
		IPage<WxActiveEnrolUser> pageList = wxActiveEnrolUserService.page(page, queryWrapper);
		return Result.ok(pageList);
	}
	 /**
	  * 分页列表查询
	  *
	  * @param wxActiveEnrolUser
	  * @param pageNo
	  * @param pageSize
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listPageUser")
	 public Result<?> listPageUser(WxActiveEnrolUser wxActiveEnrolUser,
									@RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
									@RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
									HttpServletRequest req) {
		 QueryWrapper<WxActiveEnrolUser> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveEnrolUser, req.getParameterMap());
		 Page<WxActiveEnrolUser> page = new Page<WxActiveEnrolUser>(pageNo, pageSize);
		 IPage<WxActiveEnrolUser> pageList = wxActiveEnrolUserService.page(page, queryWrapper);
		 List<WxActiveEnrolUser> records = pageList.getRecords();
		 List<Map<String,Object>> listObj = new ArrayList<>();
		 for (WxActiveEnrolUser wxeu:records
		 ) {
			 HashMap<String,Object> map = new HashMap<>();
			 map.put("enrolInfo", wxeu);
			 WxUser wxUser = new WxUser();
			 String openId = wxeu.getUserOpneId();
			 if(null!=openId){
				 wxUser.setOpenId(openId);
				 Wrapper<WxUser> aeu = new QueryWrapper<>(wxUser);
				 map.put("userInfo",wxUserService.getOne(aeu));
			 }else{
				 String agentId = wxeu.getEnrolAgentOpenId();
				 wxUser.setOpenId(agentId);
				 Wrapper<WxUser> aeu = new QueryWrapper<>(wxUser);
				 map.put("agentInfo",wxUserService.getOne(aeu));
			 }
			 listObj.add(map);
		 }
		 Page<Map<String,Object>> newPage = new Page<Map<String,Object>>(pageNo, pageSize);
		 newPage.setRecords(listObj);
		 newPage.setTotal(pageList.getTotal());
		 newPage.setCurrent(pageList.getCurrent());
		 newPage.setSize(pageList.getSize());

		 return Result.ok(newPage);
	 }
	 /**
	  * 全部查询
	  *
	  * @param wxActiveEnrolUser
	  *
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listAll")
	 public Result<?> queryPageList(WxActiveEnrolUser wxActiveEnrolUser,

									HttpServletRequest req) {
		 QueryWrapper<WxActiveEnrolUser> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveEnrolUser, req.getParameterMap());
		 List<WxActiveEnrolUser> list = wxActiveEnrolUserService.list(queryWrapper);
		 List<Map<String,Object>> listObj = new ArrayList<>();
		 for (WxActiveEnrolUser wxeu:list
			  ) {
			 HashMap<String,Object> map = new HashMap<>();
			 map.put("enrolInfo", wxeu);
			 WxUser wxUser = new WxUser();
			 String openId = wxeu.getUserOpneId();
			 if(null!=openId){
				 wxUser.setOpenId(openId);
				 Wrapper<WxUser> aeu = new QueryWrapper<>(wxUser);
				 map.put("userInfo",wxUserService.getOne(aeu));
			 }else{
			 	String agentId = wxeu.getEnrolAgentOpenId();
				 wxUser.setOpenId(agentId);
				 Wrapper<WxUser> aeu = new QueryWrapper<>(wxUser);
				 map.put("agentInfo",wxUserService.getOne(aeu));
			 }
			 listObj.add(map);
		 }
		 return Result.ok(listObj);
	 }

	 /**
	  * 根据openID查询报名及活动
	  *
	  * @param wxActiveEnrolUser
	  *
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listEnrolAndActive")
	 public Result<?> listEnrolAndActive(WxActiveEnrolUser wxActiveEnrolUser,
									HttpServletRequest req) {
		 QueryWrapper<WxActiveEnrolUser> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveEnrolUser, req.getParameterMap());
		 List<WxActiveEnrolUser> list = wxActiveEnrolUserService.list(queryWrapper);
		 List<Map<String,Object>> listObj = new ArrayList<>();
		 for (WxActiveEnrolUser wxeu:list
		 ) {
			 HashMap<String,Object> map = new HashMap<>();
			 map.put("enrolInfo", wxeu);
			 WxUser wxUser = new WxUser();
			 String openId = wxeu.getUserOpneId();
			 if(null!=openId){
				 wxUser.setOpenId(openId);
				 Wrapper<WxUser> aeu = new QueryWrapper<>(wxUser);
				 map.put("userInfo",wxUserService.getOne(aeu));
			 }
			 String activeId = wxeu.getActiveId();
			 map.put("activeInfo", wxActiveService.getById(activeId));

			 listObj.add(map);
		 }
		 return Result.ok(listObj);
	 }
	/**
	 *   添加
	 *
	 * @param wxActiveEnrolUser
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxActiveEnrolUser wxActiveEnrolUser) {

		wxActiveEnrolUserService.save(wxActiveEnrolUser);
		String userOpneId = wxActiveEnrolUser.getUserOpneId();
		WxUser wxUser = new WxUser();

		int delt =0;
		if(null!= userOpneId){

			wxUser.setOpenId(userOpneId);
			delt = WxSysConst.ENROL_SELF_SCORE;
		}else{
			wxUser.setOpenId(wxActiveEnrolUser.getEnrolAgentOpenId());
			delt = WxSysConst.ENROL_AGENT_SCORE;
		}
		QueryWrapper<WxUser> queryWrapper = new QueryWrapper<>(wxUser);
		WxUser one = wxUserService.getOne(queryWrapper);
		if(null!= one){
			Integer accumulatePoint = one.getAccumulatePoint();
			if( null != accumulatePoint){
				one.setAccumulatePoint(accumulatePoint + delt);
			}else{
				one.setAccumulatePoint(delt);
			}
			wxUserService.update(one, queryWrapper);
		}
		return Result.ok("添加成功！");
	}

	@GetMapping(value = "/checkDouble")
	public Result<?> checkDouble(WxActiveEnrolUser wxActiveEnrolUser,HttpServletRequest req){
		 QueryWrapper<WxActiveEnrolUser> queryWrapper = QueryGenerator.initQueryWrapper(wxActiveEnrolUser, req.getParameterMap());

		 int count = wxActiveEnrolUserService.count(queryWrapper);
		String sqlSelect = queryWrapper.getSqlSelect();

		if(count>0){
			 return Result.error(2020, "无需重复报名！");
		 }else{
		 	return Result.ok("可以报名！");
		 }

	}

	/**
	 *  编辑
	 *
	 * @param wxActiveEnrolUser
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxActiveEnrolUser wxActiveEnrolUser) {
		wxActiveEnrolUserService.updateById(wxActiveEnrolUser);

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
		wxActiveEnrolUserService.removeById(id);

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
		this.wxActiveEnrolUserService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxActiveEnrolUser wxActiveEnrolUser = wxActiveEnrolUserService.getById(id);
		if(wxActiveEnrolUser==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxActiveEnrolUser);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxActiveEnrolUser
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxActiveEnrolUser wxActiveEnrolUser) {
        return super.exportXls(request, wxActiveEnrolUser, WxActiveEnrolUser.class, "活动报名表");
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
        return super.importExcel(request, response, WxActiveEnrolUser.class);
    }

}
