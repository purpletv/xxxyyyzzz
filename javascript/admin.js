
/*function showSpinner() {
  var spinnerContainer = document.getElementById('spinner-container');
  spinnerContainer.style.display = 'flex';
}

function hideSpinner() {
  var spinnerContainer = document.getElementById('spinner-container');
  spinnerContainer.style.display = 'none';
}*/
        // JavaScript for hamburger menu toggle
     function toggleMenu() {
		  var dashboard = document.getElementById('dashboard');
		  var menuIcon = document.querySelector('.menu-icon');
		  var dropdown = document.querySelector('.dropdown-toggle');
		  var dropdownMenu = document.querySelector('.dropdown-menu.show');
		  
		  if (dashboard.style.left === '-200px') {
		    dashboard.style.left = '0';
		    menuIcon.classList.add('active');
		  } else {
		    dashboard.style.left = '-200px';
		    menuIcon.classList.remove('active');
		    if (dropdownMenu) {
		      dropdownMenu.classList.remove('show');
		    }
		  }
		}
$(document).ready(function() {
    $('.dropdown').hover(
        function() {
            $(this).addClass('show');
            $(this).find('.dropdown-menu').addClass('show');
        },
        function() {
            $(this).removeClass('show');
            $(this).find('.dropdown-menu').removeClass('show');
        }
    );
});

        function toggleDropdown_masterentry() {
    var dropdown = document.getElementById('MasterEntryDropdown');
    dropdown.classList.toggle('show');
}

     
      
      function toggleDropdown() {
          var dropdown = document.getElementById('settingsDropdown');
          dropdown.classList.toggle('show');
      }
      
  	
      
       function toggleDropdown_shipments() {
          var dropdown = document.getElementById('ShipmentsDropdown');
          dropdown.classList.toggle('show');
      }
  	 function toggleDropdown_profile() {
          var dropdown = document.getElementById('profileDropdown');
          dropdown.classList.toggle('show');
      }
   
    
    $(document).on('click', '.payments-link', function(event) {
	    event.preventDefault();
	   console.log("entered admin profile");
	   displayPayments();
    });
    
    function displayPayments(){
    //showSpinner();
    	 $.ajax({
    	      url: "viewPayments",
    	      method: 'GET',
    	      success: function(response) {
    	        //hideSpinner();
    	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
    	      },
    	      error: function(xhr, status, error) {
    	        console.log('AJAX Error: ' + error);
    	      }
    	    });
    }
    
    
 /*   <!-- ADMIN PROFILE -->*/
    
    $(document).on('click', '.profile-link', function(event) {
	    event.preventDefault();
	   console.log("entered admin profile");
	   displayProfile();
    });
    
    function displayProfile(){
    //showSpinner();
    	 $.ajax({
    	      url: "displayAdminProfile",
    	      method: 'GET',
    	      success: function(response) {
    	        //hideSpinner();
    	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
    	      },
    	      error: function(xhr, status, error) {
    	        console.log('AJAX Error: ' + error);
    	      }
    	    });
    }
    
    
    
    $(document).on('click', '.changePassword', function(event) {
	    event.preventDefault();
	   console.log("entered admin profile");
	   changePassword();
    });
    
    function changePassword(){
    //showSpinner();
    	 $.ajax({
    	      url: "changePassword",
    	      method: 'GET',
    	      success: function(response) {
    	        //hideSpinner();
    	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
    	      },
    	      error: function(xhr, status, error) {
    	        console.log('AJAX Error: ' + error);
    	      }
    	    });
    }
    
    
    /*
  <!--OrdersLink--> 
    
*/    
 	
 	$(document).on('click', '.orders-link', function(event) {
	    event.preventDefault();
	   console.log("entered orders");
	    displayOrders();
    });
    
    function displayOrders(){
    //showSpinner();
    	 $.ajax({
    	      url: "listOrders",
    	      method: 'GET',
    	      success: function(response) {
    	        //hideSpinner();
    	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
    	      },
    	      error: function(xhr, status, error) {
    	        console.log('AJAX Error: ' + error);
    	      }
    	    });
    }
    
    
    
	
	 	
	 
	 function processedStatusFilter(){
	 //showSpinner();
		 console.log("working filter");
	      var selectVal = $("#processedStatusFilter").val();
	      console.log('filterDate: ');
	      $.ajax({
	        url: "loadOrdersByDate",
	        method: 'GET',
	        data: { selectDateFilter: selectVal },
	        success: function(response) {
	          //hideSpinner();
	          $('#tableData').html(response);
	        },
	        error: function(xhr, status, error) {
	          console.log('AJAX Error: ' + error);
	        }
	      });
	    
	 }
	 
	 function changeByDate(){
	 //showSpinner();
		 console.log("working filter");
	      var selectVal = $("#dateRangeFilter").val();
	      console.log('filterDate: ');
	      if(selectVal!=="All"){
	      $.ajax({
	        url: "loadOrdersByDate",
	        method: 'GET',
	        data: { selectDateFilter: selectVal },
	        success: function(response) {
	          //hideSpinner();
	          $('#tableData').html(response);
	        },
	        error: function(xhr, status, error) {
	          console.log('AJAX Error: ' + error);
	        }
	      });
	      }
	      else{
	    	  $.ajax({
	    	      url: "listOrders",
	    	      method: 'GET',
	    	      success: function(response) {
	    	      	         // //hideSpinner();
	    	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
	    	      },
	    	      error: function(xhr, status, error) {
	    	        console.log('AJAX Error: ' + error);
	    	      }
	    	    });
	      }
	    
	 }
	 
	 
	
	 
	$(document).on('click', '.stocks-Link', function(event) {
		    event.preventDefault();
		   console.log("entered Stocks");
		    displayStocks();
	    });
	    
	function  displayStocks(){
	//showSpinner();
		 $.ajax({
   	      url: "listStock",
   	      method: 'GET',
   	      success: function(response) {
   	        //hideSpinner();
   	         console.log('ho');
   	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
   	        console.log('ho');
   	        
   	        showCategoriesCatalog();
   	               console.log('hii');
   	      },
   	      error: function(xhr, status, error) {
   	        console.log('AJAX Error: ' + error);
   	      }
   	    });
	}
	
	

	
 
        //MASTER ENTRY CALLSS-----------------------------------
        
     
	
       $(document).on('click', '.price-review-Link', function(event) {
		    event.preventDefault();
		   console.log("entered Master Entry");
		    displayEditablePrice();
	    });
	 
	 
	function  displayEditablePrice(){
	//showSpinner();
		 $.ajax({
	      url: "showEditablePrice",
	      method: 'GET',
	      success: function(response) {
	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
	        //hideSpinner();
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    });
	}
       
       
	 $(document).on('click', '.Master-Entry-Link', function(event) {
		    event.preventDefault();
		   console.log("entered Master Entry");
		    displayEditableStocks();
	    });
	 
	 
	function  displayEditableStocks(){
	//showSpinner();
		 $.ajax({
	      url: "showEditableStocks",
	      method: 'GET',
	      success: function(response) {
	        //hideSpinner();
	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    });
	}
	
$(document).on('click', '#edit-button', function(event) {
    event.preventDefault();

    var prod_id = $(this).data('prod-id');

    var image_url = $('#imageUrl-input-' + prod_id).val();
        var dhd = $('#sdsd-input-' + prod_id).val();
        console.log("dhd",dhd);
    

    var prodDesc = $('#prodDesc-input-' + prod_id).val();
    var reorderlevel = $('#reorderlevel-input-' + prod_id).val();
    var prod_stock = parseFloat($('#prodStock-input-' + prod_id).val());
    var prod_price = parseFloat($('#prodPrice-input-' + prod_id).val());
    console.log("stock",prod_stock);
	    console.log("reorderlevel",reorderlevel);
	    
	
  /*  // Check if the values are valid numbers
    if (isNaN(prod_stock) || isNaN(prod_price)) {
        // Handle the error case, display an error message, or take appropriate action
        console.log('Invalid input values');
        return;
    }*/

    updateMasterEntry(prodDesc, image_url, prod_id, reorderlevel, prod_stock, prod_price);
});



	function updateMasterEntry(prodDesc, image_url, prod_id, reorderlevel, prod_stock,prod_price) {
	//showSpinner();
	   toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-right",
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
	    $.ajax({
	        url: "updateMasterEntryTables",
	        method: 'GET',
	        data: {
	        	description: prodDesc,
	        	imageUrl: image_url,
	        	id: prod_id,
	            reorderLevel: reorderlevel,
	            stock: prod_stock,
	            price:prod_price
	        },
	        success: function(response) {
	          //  //hideSpinner();
	            $('#content').html(response);
	            toastr.success('Updated Stocks Successfully');
	        },
	        error: function(xhr, status, error) {
	            console.log('AJAX Error: ' + error);
	        }
	    });
	}
	
	
	
	$(document).on('click', '#editprice-button', function(event) {
    event.preventDefault();

    var prod_id = $(this).data('prod-id');
    var prod_gstc_id = $('#prodGstcId-input').val();

    var prod_mrp = parseFloat($('#prodMrp-input').text().trim());
    var prod_price = parseFloat($('#prodPrice-input').val());
	console.log("price to be updated is",prod_price);
    if (prod_price > prod_mrp) {
        alert("Price cannot be greater than MRP!");
        return;
    }

    updatePriceReview(prod_id, prod_mrp, prod_price);
});

function updatePriceReview(prod_id, prod_mrp, prod_price) {
//showSpinner();
   toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-right",
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
    $.ajax({
        url: "updatePriceReview",
        method: 'GET',
        data: {
            id: prod_id,
            price: prod_price,
            mrp: prod_mrp
        },
        success: function(response) {
            //hideSpinner();
            $('#content').html(response);
            toastr.success('Updated the Price Successfully');
        },
        error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
        }
    });
}

	
	
	
	 $(document).on('click', '.add-new-product-link', function(event) {
		    event.preventDefault();
		   console.log("entered add new product in master  Entry");
		   addNewProduct();
	    });
	 

		function addNewProduct() {
		   toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-right",
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
		//showSpinner();
		    $.ajax({
		        url: "addNewProductInTheMasterEntry",
		        method: 'GET',
		        success: function(response) {
		           // //hideSpinner();
		            $('#content').html(response);
		            showCategoriesCatalog();
		            toastr.success('New Product is Added Successfully');
		        },
		        error: function(xhr, status, error) {
		            console.log('AJAX Error: ' + error);
		        }
		    });
		}
	
	
	 

	 
	 $(document).on('click', '#add-new-category-link', function(event) {
		    event.preventDefault();
		   console.log("entered add new Category in master  Entry");
		   addNewCategory();
	    });
	 

		function addNewCategory() {
		//showSpinner();
		   toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-right",
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
		    $.ajax({
		        url: "addNewCategorytInTheMasterEntry",
		        method: 'GET',
		        success: function(response) {
		          //  //hideSpinner();
		            $('#content').html(response);
		            showCategoriesCatalog();
		            toastr.success('New Category is Added Successfully');
		        },
		        error: function(xhr, status, error) {
		            console.log('AJAX Error: ' + error);
		        }
		    });
		}
	 
		
		
		
		//Settings AJAX CALLS
		
		
		
			$(document).on('click', '.Email-Configuration', function(event) {
	    event.preventDefault();
	   console.log("entered Email-Configuration");
	    displayEmailPage();
    });
 function displayEmailPage(){
 //showSpinner();
	 $.ajax({
	      url: "EmailConfigurationPage",
	      method: 'GET',
	      success: function(response) {
	        //hideSpinner();
	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    });
 }
	 $(document).on('click', '.Shipping-Config', function(event) {
	    event.preventDefault();
	   console.log("enteredShipping-Config");
	    displayShippingConfig();
 });
function displayShippingConfig(){
//showSpinner();
	console.log("in displayShippingConfig");
	 $.ajax({
	      url: "ShippingRedirect",
	      method: 'GET',
	      success: function(response) {
	        //hideSpinner();
	        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    });
}
	

$(document).on('click', '.OrderValueWise', function(event) {
    event.preventDefault();
   console.log("Entered shipemnents Space ");
    dischar();
});
function dischar(){
//showSpinner();
console.log("in viewing OrderValueWisePage");
 $.ajax({
      url: "OrderValueWisePage",
      method: 'GET',
      success: function(response) {
        //hideSpinner();
        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
}


$(document).on('click', '.ProductWise', function(event) {
    event.preventDefault();
   console.log("Entered shipemnents Space ");
    dispr();
});
function dispr(){
//showSpinner();
console.log("in viewing ProductWise");
 $.ajax({
      url: "productWisePage",
      method: 'GET',
      success: function(response) {
        //hideSpinner();
        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
}


	
//<!-- Shipments Methods      -->

$(document).on('click', '.see-shipping-orders', function(event) {
    event.preventDefault();
   console.log("Entered shipemnents Space ");
    displayProcessedOrders();
});


function displayProcessedOrders(){
//showSpinner();
console.log("in viewing Orders");
 $.ajax({
      url: "displayProcessedOrdersInShipments",
      method: 'GET',
      success: function(response) {
        //hideSpinner();
        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
}

$(document).on('click', '.track-shipments', function(event) {
    event.preventDefault();
   console.log("Entered to see shipped orders  ");
    displayShippedOrders();
});


function displayShippedOrders(){
//showSpinner();
console.log("in viewing  shipped Orders");
 $.ajax({
      url: "displayShippedOrders",
      method: 'GET',
      success: function(response) {
        //hideSpinner();
        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
}



$(document).on('click', '.GST-Report', function(event) {
    event.preventDefault();
   console.log("Entered GST-Report ");
    generateGSTReport();
});
function generateGSTReport(){
//showSpinner();
console.log("in generateReport");
 $.ajax({
      url: "generateGSTReport",
      method: 'GET',
      success: function(response) {
        //hideSpinner();
        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
}

$(document).on('click', '.CAT-Report', function(event) {
    event.preventDefault();
   console.log("Entered CAT-Report ");
    CATReport();
});
function CATReport(){
//showSpinner();
console.log("in generateReport");
 $.ajax({
      url: "categoryReport",
      method: 'GET',
      success: function(response) {
        //hideSpinner();
        $('#content').html(response); // Set the response HTML as the inner HTML of the select element
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
}
	


