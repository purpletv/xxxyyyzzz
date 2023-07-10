
function totalGST(){
	 $.ajax({
	      url: "categoryReportFilter",
	      method: 'GET',
	      data:{
	    	 filterVal:"GST"
	      },
	      success: function(response) {
	      $('#content').html(response); 
	      
	      console.log(response);
	      	// Set the response HTML as the inner HTML of the select element
	     // dis();
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    }); 

}
function totalSales(){
	 $.ajax({
	      url: "categoryReportFilter",
	      method: 'GET',
	      data:{
	    	 filterVal:"SALES"
	      },
	      success: function(response) {
	      $('#content').html(response); 
	      
	      console.log(response);
	      	// Set the response HTML as the inner HTML of the select element
	     // dis();
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    }); 

}
function totalAmount(){
	 $.ajax({
	      url: "categoryReportFilter",
	      method: 'GET',
	      data:{
	    	 filterVal:"AMOUNT"
	      },
	      success: function(response) {
	      $('#content').html(response); 
	      
	      console.log(response);
	      	// Set the response HTML as the inner HTML of the select element
	     // dis();
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    }); 

}

function totProd(){
	 $.ajax({
	      url: "categoryReportFilter",
	      method: 'GET',
	      data:{
	    	 filterVal:"PRODUCTS"
	      },
	      success: function(response) {
	      $('#content').html(response); 
	      
	      console.log(response);
	      	// Set the response HTML as the inner HTML of the select element
	     // dis();
	      },
	      error: function(xhr, status, error) {
	        console.log('AJAX Error: ' + error);
	      }
	    }); 

}
function sortBy(filter){
if(filter=="GST"){
totalGST();}
if(filter=="Sales"){
totalSales();}
if(filter=="Amount"){
totalAmount();}
if(filter=="totalProd"){
totProd();}
}

