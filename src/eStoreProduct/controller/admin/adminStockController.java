package eStoreProduct.controller.admin;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import eStoreProduct.DAO.admin.stockSummaryDAO;
import eStoreProduct.DAO.common.ProductDAO;
import eStoreProduct.model.admin.input.Category;
import eStoreProduct.model.admin.output.stockSummaryModel;

@Controller
public class adminStockController {
	private stockSummaryDAO ssd;
	ProductDAO pdaoimp;
	private static final Logger logger = LoggerFactory.getLogger(adminOrderController.class);

	@Autowired
	adminStockController(stockSummaryDAO stockdao, ProductDAO pdao) {
		ssd = stockdao;
		pdaoimp = pdao;
	}

	// get products categories list controller method
	@GetMapping("/CategoriesDropdownList")
	@ResponseBody
	public String displayCategories(Model model) {
		logger.info("eStoreProduct:Product Controller:displaying all the categories");
		List<Category> categories = pdaoimp.getAllCategories();
		StringBuilder htmlContent = new StringBuilder();
		htmlContent.append("<option disabled selected>Select Product category</option>");
		for (Category category : categories) {
			htmlContent.append("<option value='").append(category.getPrct_id()).append("'>")
					.append(category.getPrct_title()).append("</option>");
		}

		return htmlContent.toString();
	}

	@GetMapping("/CategorySpecificRecords")
	public String getCategorySpecificRecords(Model model, @RequestParam(value = "catg") long categoryId,
			@RequestParam(defaultValue = "0") int page) {
		List<stockSummaryModel> stocks = ssd.getCategoryWiseStocks(categoryId);
		for (stockSummaryModel s : stocks) {
			System.out.println(s + "\ndtggggggggggggggggggggggggggggggggggggggg");
		}
		model.addAttribute("page", page);
		model.addAttribute("stocks", stocks);
		return "stockSummary"; // Return the name of a new view file that will render only the table data
	}

	// listing the stocks for viewing
	@GetMapping("/listStock")
	public String showStocks(Model model, @RequestParam(defaultValue = "0") int page) {
		logger.info("adminStockController url: listStock returns: stockSummary.jsp ");
		System.out.println("\n page:" + page);
		int pageSize = 5; // Number of records per page
		List<stockSummaryModel> stocks = ssd.getStocks(page, pageSize);
		int totalPages = (int) Math.ceil(ssd.getTotalStocks() / (double) pageSize); // Calculate total pages
		System.out.println("totalpages:\n" + totalPages);
		model.addAttribute("stocks", stocks);
		model.addAttribute("page", page);
		model.addAttribute("totalPages", totalPages); // Add totalPages to the model

		return "stockSummary";
	}

	// listing stocks for pagination
	@GetMapping("/listStocksForPagination")
	public String showStocksForPagination(Model model, @RequestParam(value = "nextPage") Integer page) {
		logger.info("adminStockController url: listStocksForPagination returns: stockSummary.jsp ");
		System.out.println("\n page:" + page);
		int pageSize = 5; // Number of records per page
		List<stockSummaryModel> stocks = ssd.getStocks(page, pageSize);
		int totalPages = (int) Math.ceil(ssd.getTotalStocks() / (double) pageSize); // Calculate total pages
		System.out.println("totalpages:\n" + totalPages);
		model.addAttribute("stocks", stocks);
		model.addAttribute("page", page);
		model.addAttribute("totalPages", totalPages); // Add totalPages to the model

		return "stockSummary";
	}

	// displaying statistics for clear understanding between stocks and reorderLevel
	@GetMapping("/stocksForStatistics")
	@ResponseBody
	public List<stockSummaryModel> showStatistics(Model model) {
		logger.info("adminStockController url: stocksForStatistics  returns: stocks as responseBody ");

		List<stockSummaryModel> stocks = ssd.getStocks();
		for (stockSummaryModel s : stocks) {
			System.out.println(s + "\n");
		}
		model.addAttribute("stocks", stocks);
		return stocks;
	}

}
