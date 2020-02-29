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
import org.jeecg.modules.wx.entity.*;
import org.jeecg.modules.wx.service.*;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecg.modules.wx.service.impl.WxEnrolWriteItemServiceImpl;
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
 * @Description: 活动
 * @Author: jeecg-boot
 * @Date:   2020-02-26
 * @Version: V1.0
 */
@RestController
@RequestMapping("/wx/wxActive")
@Slf4j
public class WxActiveController extends JeecgController<WxActive, IWxActiveService> {
	@Autowired
	private IWxActiveService wxActiveService;
	@Autowired
	private IWxActiveCostService wxActiveCostService;
	 @Autowired
	 private IWxActiveCostVOService wxActiveCostVOService;
	@Autowired
	private IWxActiveCostItemService wxActiveCostItemService;
	@Autowired
	private IWxActiveEnrolWriteService wxActiveEnrolWriteService;
	@Autowired
	private  IWxActiveEnrolWriteVOService wxActiveEnrolWriteVOService;
	@Autowired
	private IWxEnrolWriteItemService wxEnrolWriteItemService;
	@Autowired
	private IWxActiveVOService wxActiveVOService;

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
	  *
	  * @param wxActive
	  * @param pageNo
	  * @param pageSize
	  * @param req
	  * @return
	  */
	 @GetMapping(value = "/listVO")
	 public Result<?> queryPageListVO(WxActiveVO wxActive,
									  @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
									@RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
									HttpServletRequest req) {

		 Map<String, String[]> parameterMap = req.getParameterMap();
		 QueryWrapper<WxActiveVO> queryWrapper = QueryGenerator.initQueryWrapper(wxActive, req.getParameterMap());
		 Page<WxActiveVO> page = new Page<WxActiveVO>(pageNo, pageSize);
		 IPage<WxActiveVO> pageList = wxActiveVOService.page(page, queryWrapper);
		 List<WxActiveVO> records = pageList.getRecords();
		 for (WxActiveVO avo:records
			  ) {
			 String activeId = avo.getId();
			 avo.setDetail("");
			 WxActiveCostVO wxActiveCost = new WxActiveCostVO();
			 wxActiveCost.setActiveId(activeId);
			 Wrapper<WxActiveCostVO> costMapQuery = new QueryWrapper<>(wxActiveCost);
			 WxActiveCostVO one = wxActiveCostVOService.getOne(costMapQuery);
			 WxActiveCostItem item = new WxActiveCostItem();
			if(null != one){
				item.setCostId(one.getId());
				Wrapper<WxActiveCostItem> costItemMapQuery = new QueryWrapper<>(item);
				one.setOpts(wxActiveCostItemService.list(costItemMapQuery));
				avo.setCost(one);
			}

			 WxActiveEnrolWriteVO wxActiveEnrolWriteVO = new WxActiveEnrolWriteVO();
			 wxActiveEnrolWriteVO.setActiveId(activeId);
			 Wrapper<WxActiveEnrolWriteVO> enrolWriteVOWrapper = new QueryWrapper<>(wxActiveEnrolWriteVO);
			 List<WxActiveEnrolWriteVO> enrolWriteOpts = wxActiveEnrolWriteVOService.list(enrolWriteVOWrapper);
			 for (WxActiveEnrolWriteVO v:enrolWriteOpts
				  ) {
				 String vId = v.getId();
				 WxEnrolWriteItem item1 = new WxEnrolWriteItem();
				 item1.setEnrolWriteId(vId);
				 Wrapper<WxEnrolWriteItem> ewWrapper = new QueryWrapper<>(item1);
				 List<WxEnrolWriteItem> list = wxEnrolWriteItemService.list(ewWrapper);
				 ArrayList<String> sl = new ArrayList<>();
				 for (WxEnrolWriteItem i:list
					  ) {
					 sl.add(i.getName());
				 }
				v.setOpts(sl);
			 }
			 avo.setEnrolWriteOpts(enrolWriteOpts);
//			System.out.println(wxActiveCostService.list(costMapQuery));
		 }
		 return Result.ok(pageList);
	 }

	 /**
	 *   添加
	 *
	 * @param wxActive
	 * @return
	 */
	@PostMapping(value = "/add")
	public Result<?> add(@RequestBody WxActive wxActive) {
		wxActiveService.save(wxActive);
		return Result.ok("添加成功！");
	}

	 /**
	  *
	  * @param wxActive
	  * @return
	  */
	 @Transactional
	 @PostMapping(value = "/addVO")
	 public Result<?> addVO(@RequestBody WxActiveVO wxActive) {
System.out.println(wxActive);
	 	WxActive wa = new WxActive();
	 	wa.setName(wxActive.getName());
	 	wa.setDetail(wxActive.getDetail());
	 	wa.setAddress(wxActive.getAddress());
	 	wa.setAllowEnrolAgent(wxActive.getAllowEnrolAgent());
	 	wa.setEndEnrol(wxActive.getEndEnrol());
	 	wa.setStartTime(wxActive.getStartTime());
	 	wa.setEndTime(wxActive.getEndTime());
	 	wa.setEnrolWay(wxActive.getEnrolWay());
	 	wa.setDisplayType(wxActive.getDisplayType());
	 	wa.setEveryTeamMax(wxActive.getEveryTeamMax());
	 	wa.setEveryTeamMin(wxActive.getEveryTeamMin());
	 	wa.setInsuranceType(wxActive.getInsuranceType());
	 	wa.setPoster(wxActive.getPoster());
	 	wa.setNeedExamineEnrol(wxActive.getNeedExamineEnrol());
	 	wa.setTeamSize(wxActive.getTeamSize());
	 	wa.setNotice(wxActive.getNotice());
		 wxActiveService.save(wa);
		String activeId = wa.getId();
		 WxActiveCostVO costVO = wxActive.getCost();
		 WxActiveCost cost = new WxActiveCost();
		 cost.setActiveId(activeId);
		 cost.setNumber(costVO.getNumber());
		 cost.setType(costVO.getType());
		 cost.setRefundType(costVO.getRefundType());
		 wxActiveCostService.save(cost);
		 String costId = cost.getId();
		 List<WxActiveCostItem> opts = costVO.getOpts();
		 if(null != opts){
			 for (WxActiveCostItem item:
					 opts ) {
				 item.setCostId(costId);
			 }
			 wxActiveCostItemService.saveBatch(opts);
		 }
		 List<WxActiveEnrolWriteVO> enrolWriteOptsVO = wxActive.getEnrolWriteOpts();

		 for(int i = 0;i<enrolWriteOptsVO.size();i++){
			 WxActiveEnrolWrite waew = new WxActiveEnrolWrite();
			 waew.setDiy(enrolWriteOptsVO.get(i).getDiy());
			 waew.setName(enrolWriteOptsVO.get(i).getName());
			 waew.setType(enrolWriteOptsVO.get(i).getType());
			 waew.setValue(enrolWriteOptsVO.get(i).getValue());
			 waew.setActiveId(activeId);
			wxActiveEnrolWriteService.save(waew);
			String weaId = waew.getId();
			 List<String> opts1 = enrolWriteOptsVO.get(i).getOpts();
			 if(null != opts1){
				 List<WxEnrolWriteItem> enrolWriteItems = new ArrayList<>();
				 for (String s:opts1
				 ) {
					 WxEnrolWriteItem wew = new WxEnrolWriteItem();
					 wew.setName(s);
					 wew.setEnrolWriteId(weaId);
					 enrolWriteItems.add(wew);
				 }
				 wxEnrolWriteItemService.saveBatch(enrolWriteItems);
			 }
		 }
		 return Result.ok("添加成功！");
	 }
	/**
	 *  编辑
	 *
	 * @param wxActive
	 * @return
	 */
	@PutMapping(value = "/edit")
	public Result<?> edit(@RequestBody WxActive wxActive) {
		wxActiveService.updateById(wxActive);
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
		wxActiveService.removeById(id);
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
		this.wxActiveService.removeByIds(Arrays.asList(ids.split(",")));
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
		WxActive wxActive = wxActiveService.getById(id);
		if(wxActive==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(wxActive);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param wxActive
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, WxActive wxActive) {
        return super.exportXls(request, wxActive, WxActive.class, "活动");
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
        return super.importExcel(request, response, WxActive.class);
    }

}
