<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="eStoreProduct.model.admin.output.stockSummaryModel,java.util.List" %>
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="ISO-8859-1">
<title>Price Review</title>
<link rel="stylesheet" type="text/css" href="./css/editablePrice.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
</head>
<body>

 <div class="container mt-5">
            <div class="text-left mb-3">
                <select   id="categoryDropdown" class="form-control">
                    <!-- Options for categories -->
                </select>
            </div>
  </div>

<table id="tableData" class="table table-bordered table-hover">
    <thead class="thead-dark">
        <tr>
            <th>Product ID</th>
            <th>Product Title</th>
            <th>Product Category ID</th>
            <th>Product GST Category ID</th>
            <th>Product Brand</th>
            <th>Product MRP</th>
            <th>Product Price</th>
            <th>EDIT</th>
        </tr>
    </thead>
    <tbody>
        <% List<stockSummaryModel> stock2=(List<stockSummaryModel>)request.getAttribute("stocks1"); %>
        <% for (stockSummaryModel stock : stock2) { %>
         <tr <% if (stock.getPrice() > stock.getMrp()) { %>class="warning" <% } %>>
            <td name="prod_id"><%=stock.getId()%></td>
            <td><%= stock.getTitle() %></td>
            <td><%= stock.getProductCategory() %></td>
            <td id="prodGstcId-input" name="prod_gstc_id">
                <%= stock.getHsnCode() %>
            </td>
            <td><%= stock.getBrand() %></td>
            <td id="prodMrp-input"  name="prod_mrp">
               <%= stock.getMrp() %>
            </td>
             <td>
                <input type="text" id="prodPrice-input-<%= stock.getId() %>"  name="prod_price" value="<%= stock.getPrice() %>">
            </td>
            <td>
            	 <% if (stock.getPrice() < stock.getMrp()) { %>
                <button id="editprice-button" class="btn btn-success"  
                        data-price-id="<%= stock.getPrice() %>"
                        data-prod-id="<%= stock.getId() %>"
                        data-mrp-id="<%= stock.getMrp() %>">UPDATE</button>
                        <%}
            	 else{
                        	%>
                        	   <button id="editprice-button" class="btn btn-danger"  
                        data-price-id="<%= stock.getPrice() %>"
                        data-prod-id="<%= stock.getId() %>"
                        data-mrp-id="<%= stock.getMrp() %>">UPDATE</button>
                      <%} %>  
            </td>
        </tr>
        <% } %>
    </tbody>
</table>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script>
/* $(document).on('change', '#categoryDropdown', function(event) {
    event.preventDefault();
    var ctg_id = document.getElementById("categoryDropdown").value;
    console.log(ctg_id);
    document.getElementById("prod_prct_id").value = parseInt(ctg_id);
    retriveCategoryWisePrices(ctg_id);
});

function retriveCategoryWisePrices(ctg_id) {
    $.ajax({
      url: "retriveCategoryWisePrices",
      method: 'GET',
      data: {
    	  ctg_id:ctg_id
      },
      success: function(response) {
        $('#content').html(response);
        console.log('In the updation of master entry function');
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
  }
 */
$(document).ready(function() {
  $(document).on('click', '#editprice-button', function(event) {
    event.preventDefault();
    toastr.options = {
    		  "closeButton": false,
    		  "debug": false,
    		  "newestOnTop": false,
    		  "progressBar": false,
    		  "positionClass": "toast-top-center",
    		  "preventDuplicates": false,
    		  "onclick": null,
    		  "showDuration": "300",
    		  "hideDuration": "1000",
    		  "timeOut": "5000",
    		  "extendedTimeOut": "1000",
    		  "showEasing": "swing",
    		  "hideEasing": "linear",
    		  "showMethod": "fadeIn",
    		  "hideMethod": "fadeOut"
    		}; 
    var $row = $(this).closest('tr');
    var prod_id = $(this).data('prod-id');
    var prod_gstc_id = $(this).data('gstc-id');

    var prod_mrp = parseFloat($(this).data('mrp-id'));
    var prod_price2=parseFloat($(this).data('price-id'));
    var prod_price = parseFloat($('#prodPrice-input-' + prod_id).val());

    if (prod_price > prod_mrp) {
      $row.addClass('warning');
      toastr.error("Price cannot be greater than MRP!");
     prod_price=prod_price2;	
    }

    updatePriceReview(prod_id, prod_mrp, prod_price);
  });

  function updatePriceReview(prod_id, prod_mrp, prod_price) {
    $.ajax({
      url: "updatePriceReview",
      method: 'GET',
      data: {
        id: prod_id,
        price: prod_price,
        mrp: prod_mrp
      },
      success: function(response) {
        $('#content').html(response);
        console.log('In the updation of master entry function');
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
  }
});
</script>

</body>
</html>
