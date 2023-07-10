
package eStoreProduct.controller.admin;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import eStoreProduct.DAO.admin.adminDAO;
import eStoreProduct.externalServices.passwordHashing;
import eStoreProduct.model.admin.entities.adminModel;
import eStoreProduct.model.admin.input.adminLogin;

@Controller
public class adminProfileController {
	adminDAO adao;
	private static final Logger logger = LoggerFactory.getLogger(adminProfileController.class);

	@Autowired
	public adminProfileController(adminDAO admindao) {
		adao = admindao;

	}

	//getting the adminProfile page to edit
	@RequestMapping(value = "/displayAdminProfile", method = RequestMethod.GET)
	public String getAdminLogin(Model model, HttpSession session) {
		logger.info("adminProfileController  url: displayAdminProfile  returns: adminProfile.jsp ");

		System.out.println("Admin Profile Page");
		adminModel am = (adminModel) session.getAttribute("admin");
		model.addAttribute("am", am);
		// call the view
		return "adminProfile";
	}
	
	//for changing admin password to check is it same or not
	@RequestMapping(value = "/hashEnteredPassword", method = RequestMethod.POST)
	@ResponseBody
	public String getOldPassword(Model model,@RequestParam("password") String hashEnteredpassword, HttpSession session) {
		logger.info("adminProfileController  url: hashEnteredPassword  ");
		System.out.println("Admin Profile Page");
		hashEnteredpassword=passwordHashing.hashString(hashEnteredpassword);
		model.addAttribute("hashEnteredpassword", hashEnteredpassword);
		// call the view
		return hashEnteredpassword;
	}
	
	//retreive the old hashed password
	@RequestMapping(value = "/getOldHashPassword", method = RequestMethod.POST)
	@ResponseBody
	public String getOldHashPassword(Model model, HttpSession session) {
		logger.info("adminProfileController  url: changePassword  returns: changePassword.jsp ");

		System.out.println("Admin Profile Page");
		adminModel am = (adminModel) session.getAttribute("admin");
		String hashedoldpassword=am.getPassword();
		model.addAttribute("hashedoldpassword", hashedoldpassword);
		// call the view
		return hashedoldpassword;
	}
	
	//calling page to update password
	@RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
	@ResponseBody
	public String updatePassword(Model model, HttpSession session, @RequestParam("newPassword") String newPassword) {
	    logger.info("adminProfileController  url: updatePassword  returns: changePassword.jsp ");

	    System.out.println("Admin Profile Page");
	    adminModel am = (adminModel) session.getAttribute("admin");

	    if (am != null) {
	        am.setPassword(newPassword);
	        String email = am.getEmail();
	        newPassword = am.getPassword();
	        adao.updatePassword(newPassword, email);
	        return "updated Password Successfully";
	    } else {
	        return "Error: Admin not found";
	    }
	}

	
	@RequestMapping(value = "/changePassword", method = RequestMethod.GET)
	public String changePassword(Model model, HttpSession session) {
		logger.info("adminProfileController  url: changePassword  returns: changePassword.jsp ");

		System.out.println("Admin Profile Page");
		adminModel am = (adminModel) session.getAttribute("admin");
		String password=am.getPassword();
		model.addAttribute("password", password);
		// call the view
		return "changePassword";
	}

	//on clicking edit button allowing admin to edit his details
	@RequestMapping(value = "/editAdminProfile", method = RequestMethod.GET)
	public String editAdminDetails(Model model) {
		System.out.println("editable Admin Profile Page");
		logger.info("adminProfileController  url: editAdminProfile  returns: editableAdminProfile.jsp ");

		// call the view
		return "editableAdminProfile";
	}

	//on clicking update his details are updated
	@RequestMapping(value = "/updateAdminDetails", method = RequestMethod.GET)
	public String updateAdminDetails(@Validated adminLogin al, Model model) {
		logger.info("adminProfileController  url: updateAdminDetails  returns: adminProfile.jsp ");

		System.out.println("updating Admin Profile Page");
		adminModel am = adao.getAdmin(al.getEmail(), al.getPassword());
		adao.updateAdmin(am);
		// call the view
		return "adminProfile";
	}

}