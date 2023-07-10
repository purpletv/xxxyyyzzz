
function loadOrderProductsContent(orderId) {
  showSpinner();
  console.log("In viewing Order's Products specific to order ID: ", orderId);
  $.ajax({
    url: "displayProcessedOrderProducts",
    method: 'GET',
    data: { orderId: orderId },
    success: function (response) {
      hideSpinner();
      $('#orderproducts-' + orderId).html(response);
    },
    error: function (xhr, status, error) {
      console.log('AJAX Error: ' + error);
      hideSpinner(); // Add this line to hide the spinner in case of an error
    }
  });
}

  

        function toggleDropdownGST(rowId) {
            var dropdown = document.getElementById('dropdown-' + rowId);
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            loadOrderProductsContent(rowId);
        } 
        function loadOrderProductsContent(orderId) {
            console.log("In viewing Order's Products specific to order ID: ", orderId);
            $.ajax({
                url: "displayProcessedOrderProducts",
                method: 'GET',
                data: { orderId: orderId }, // Pass the orderId as data
                success: function (response) {
                    $('#orderproducts-' + orderId).html(response); // Set the response HTML as the inner HTML of the orderproducts container
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error: ' + error);
                }
            });
        }
          function applyFilters() {
          console.log("kjkjwnb");
            var startDate = document.getElementById("startDate").value;
            var endDate = document.getElementById("endDate").value;
            $.ajax({
                url: "generateGSTReportFilter",
                method: 'POST',
                data: { startDate: startDate,
                		endDate: endDate
                	 }, // Pass the orderId as data
                success: function (response) {
                    $('#tab').html(response); // Set the response HTML as the inner HTML of the orderproducts container
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error: ' + error);
                }
            });

          
        }
        function setMinEndDate() {
    var startDate = document.getElementById("startDate").value;
    document.getElementById("endDate").min = startDate;
}
  
  