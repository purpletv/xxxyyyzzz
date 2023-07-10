<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="eStoreProduct.utility.dashboardUtilityClass" %>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Example</title>
	  <link rel="stylesheet" type="text/css" href="./css/admin.css">
	
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/admin.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    
</head>
<body>
<div id="spinner-container">
  <div id="spinner"></div>
</div>
    <div class="dashboard" id="dashboard">
        <h2>Dashboard</h2>
        <ul>
        <li class="dropdown">
            <a href="#" class="dropdown-toggle " onclick="toggleDropdown_profile()" style="text-decoration:none;">profile</a>
				 <ul class="dropdown-menu"  id="profileDropdown"  style="background-color: #212529" >
	                <li onclick="toggleMenu()"><a href="#" class="profile-link" style="text-decoration:none;">My Profile</a></li>
	                <li onclick="toggleMenu()"><a  href="#" class="changePassword" style="text-decoration:none;">Change Password</a></li>
	                
            	</ul>
			</li>
           
            <li onclick="toggleMenu()"><a href="#" class="orders-link" style="text-decoration:none;">Orders</a></li>
			<li class="dropdown">
			<a href="#" class="dropdown-toggle " onclick="toggleDropdown_shipments()" style="text-decoration:none;">Shipments</a>
				 <ul class="dropdown-menu"  id="ShipmentsDropdown"  style="background-color: #212529" >
	                <li onclick="toggleMenu()"><a href="#" class="see-shipping-orders" style="text-decoration:none;">In Progress</a></li>
	                <li onclick="toggleMenu()"><a  href="#" class="track-shipments" style="text-decoration:none;">Shipped</a></li>
            	</ul>
			</li>
			
			<li class="dropdown">
			<a href="#"  class="dropdown-toggle " onclick="toggleDropdown_masterentry()" style="text-decoration:none;">Master Entry</a>  
            <ul class="dropdown-menu"  id="MasterEntryDropdown"  style="background-color: #212529">
                <li onclick="toggleMenu()"><a href="#" class="Master-Entry-Link" style="text-decoration:none;">Update Stocks</a></li>
                <li onclick="toggleMenu()"><a href="#" class="price-review-Link" style="text-decoration:none;">Price Review</a></li>
                <li onclick="toggleMenu()"><a  href=# class="add-new-product-link" style="text-decoration:none;">Add New Product</a></li>
                <li onclick="toggleMenu()"><a href="#" id="add-new-category-link" style="text-decoration:none;">Add New Category</a></li>
            </ul>
			</li>
			
			<li onclick="toggleMenu()"><a href="#" class="stocks-Link" style="text-decoration:none;">Stocks</a></li>
            <li onclick="toggleMenu()"><a href="#" class="payments-link" style="text-decoration:none;">payments</a></li>
            
             <li class="dropdown">
	            <a href="#" class="dropdown-toggle" onclick="toggleDropdown()" style="text-decoration:none;">Settings</a>
	            <ul class="dropdown-menu" id="settingsDropdown" style="background-color: #212529">
	                <li onclick="toggleMenu()"><a href="#" class="Email-Configuration" style="text-decoration:none;">Email Configuration</a></li>
	                <li onclick="toggleMenu()"><a href="#" class="Shipping-Config" style="text-decoration:none;">Shipping Area Config</a></li>
	                <li onclick="toggleMenu()"><a href="#" class="OrderValueWise" style="text-decoration:none;">OrderValueWise Shipping charges</a></li>
                         
			</li>
            </ul>
        </li>
        	 <li onclick="toggleMenu()"><a href="#" class="GST-Report" style="text-decoration:none;">GST Report</a></li>
        <li onclick="toggleMenu()"><a href="#" class="CAT-Report" style="text-decoration:none;">Category wise Report</a></li>
            <li><a href="#" style="text-decoration:none;">Logout</a></li>
        </ul>
    </div>
    
    <div class="menu-icon" onclick="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
    </div>
    
    <div class="content" id="content">
    <div class="dashboard-mine">
        <h1>DashBoard</h1>
        <p>view Stocks and sales</p>
        <% dashboardUtilityClass dash = (dashboardUtilityClass) session.getAttribute("dash"); %>
        <div class="data-visualization">
            <div class="item orders-link" >
                <h3>Orders</h3>
                <p><%=dash.getNoOfOrders() %></p>
            </div>
            <div class="item stocks-Link">
                <h3>Products</h3>
                <p><%=dash.getNoOfProducts() %></p>
            </div>
            <div class="item">
                <h3>Registered Customers</h3>
                <p><%=dash.getNoOfCustomers() %></p>
            </div>
        </div>
        </div>
        <div class="graph-container">
  <canvas id="productGraph"></canvas>
</div>
        
    </div>
</body>
</html>