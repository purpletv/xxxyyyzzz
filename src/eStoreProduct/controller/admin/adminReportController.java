package eStoreProduct.controller.admin;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import eStoreProduct.DAO.admin.CategoryReportDAO;
import eStoreProduct.DAO.admin.OrderRepDAO;
import eStoreProduct.DAO.admin.orderProductDAO;
import eStoreProduct.DAO.common.OrderDAO;
import eStoreProduct.model.admin.entities.orderModel;
import eStoreProduct.model.admin.output.CategoryReportViewModel;
import eStoreProduct.model.admin.output.orderProductsModel;

@Controller

public class adminReportController {

	private OrderRepDAO odao;
	private CategoryReportDAO crd;
	OrderDAO od;
	orderProductDAO op;
	private static final Logger logger = LoggerFactory.getLogger(adminReportController.class);

	@Autowired
	public adminReportController(OrderRepDAO odao, CategoryReportDAO crd, OrderDAO od, orderProductDAO op) {
		this.odao = odao;
		this.crd = crd;
		this.od = od;
		this.op = op;

	}

	/* generate gst report */
	@GetMapping("/generateGSTReport")
	public String generateGSTReport(Model model) {
		logger.info("adminReportController  url: generateGSTReport  returns: GSTReports.jsp ");
		logger.info("generating the gst report");
		List<orderModel> orders = od.getAllOrders();
		model.addAttribute("orders", orders);
		// model.addAttribute("orderReport", som);
		return "GSTReports";
	}

	/* generate gst reports using filters */

	@PostMapping("/generateGSTReportFilter")
	public String generateGSTReportFilter(@RequestParam(value = "startDate") String sdate,
			@RequestParam(value = "endDate") String edate, Model model) {
		logger.info("adminReportController  url: generateGSTReport  returns: GSTReports.jsp ");
		logger.info("generating the gst report");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Timestamp startTime = null;
		Timestamp endTime = null;
		try {
			// Parse the string date to a Date object
			Date startdate = sdf.parse(sdate);
			Date enddate = sdf.parse(edate);

			// Create a Timestamp object using the getTime() method of the Date object
			startTime = new Timestamp(startdate.getTime());
			endTime = new Timestamp(enddate.getTime());
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<orderModel> orders = od.loadOrdersByDate(startTime, endTime);
		model.addAttribute("orders", orders);
		// model.addAttribute("orderReport", som);
		return "GSTReports";
	}

	@GetMapping("/categoryReport")
	public String categoryReport(Model model) {
		logger.info("adminReportController  url: categoryReport  returns: catReports.jsp ");
		logger.info("getting the category wise report");
		// List<orderModel> om=odao.getAllOrders();
		List<CategoryReportViewModel> cl = crd.getCatRep();
		model.addAttribute("categoryReport", cl);
		return "catReports";
	}

	@GetMapping("/displayProcessedOrderProducts")
	public String showProcessedOrderProducts(@RequestParam(value = "orderId") int o_id, Model model) {

		logger.info("adminReportController  url: displayProcessedOrderProducts  returns: orderProductsTable.jsp ");
		logger.info("diaplaying processedOrders");
		System.out.println("show OrderProducts");
		List<orderProductsModel> orderproducts = op.getOrderWiseOrderProducts(o_id);
		model.addAttribute("orderproducts", orderproducts);
		return "orderProductsTable";
	}

	@GetMapping("/categoryReportFilter")
	public String categoryReportFilter(@RequestParam(value = "filterVal") String filter, Model model) {
		List<CategoryReportViewModel> cl = crd.getCatRep();
		if (filter.equals("GST")) {
			Collections.sort(cl, new Comparator<CategoryReportViewModel>() {
				@Override
				public int compare(CategoryReportViewModel o1, CategoryReportViewModel o2) {
					// Compare by total_gst
					return Double.compare(o1.getTotal_gst(), o2.getTotal_gst());
				}
			});
		} else if (filter.equals("SALES")) {
			Collections.sort(cl, new Comparator<CategoryReportViewModel>() {
				@Override
				public int compare(CategoryReportViewModel o1, CategoryReportViewModel o2) {
					// Compare by total_gst
					return Double.compare(o1.getTotal_sales(), o2.getTotal_sales());
				}
			});
		} else if (filter.equals("AMOUNT")) {
			Collections.sort(cl, new Comparator<CategoryReportViewModel>() {
				@Override
				public int compare(CategoryReportViewModel o1, CategoryReportViewModel o2) {
					// Compare by total_gst
					return Double.compare(o1.getTotal_amount(), o2.getTotal_amount());
				}
			});
		} else if (filter.equals("PRODUCTS")) {
			Collections.sort(cl, new Comparator<CategoryReportViewModel>() {
				@Override
				public int compare(CategoryReportViewModel o1, CategoryReportViewModel o2) {
					// Compare by total_gst
					return Double.compare(o1.getTotal_products(), o2.getTotal_products());
				}
			});
		}
		model.addAttribute("categoryReport", cl);
		return "catReports";
	}

	/*
	 * @GetMapping("/categoryReportSort") public String categoryReportSort(Model model) { //List<orderModel>
	 * om=odao.getAllOrders(); List<CategoryReportViewModel> cl= model.addAttribute("categoryReport", cl); return
	 * "catReports"; }
	 */
}
