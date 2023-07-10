$(document).ready(function() {
  $(document).on('click', '#editprice-button', function(event) {
    event.preventDefault();

    var $row = $(this).closest('tr');
    var prod_id = $(this).data('prod-id');
    var prod_gstc_id = $(this).data('gstc-id');

    var prod_mrp = parseFloat($(this).data('mrp-id'));
    var prod_price = parseFloat($(this).data('price-id'));

    if (prod_price > prod_mrp) {
      $row.addClass('warning');
      toastr.error("Price cannot be greater than MRP!");
    }
else{
    updatePriceReview(prod_id, prod_mrp, prod_price);
}  });

  function updatePriceReview(prod_id, prod_mrp, prod_price) {
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
        $('#content').html(response);
        toastr.success('Updated Price Successfully');
      },
      error: function(xhr, status, error) {
        console.log('AJAX Error: ' + error);
      }
    });
  }
});
