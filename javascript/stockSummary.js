//Shpwing category doropdowm for filtering
 
	
 function showCategoriesCatalog(){
	 //showSpinner();
		 $.ajax({
			 url: "CategoriesDropdownList",
		        method: 'GET',
		        success: function(response) {
		           // //hideSpinner();
		            $('#categoryDropdown').html(response);
		            console.log('Categories are brought');
		          
		        },
		        error: function(xhr, status, error) {
		            console.log('AJAX Error: ' + error);
		        }
		 });
	 }
	
	 $(document).on('change', '#categoryDropdown', function(event) {
		    event.preventDefault();
		    var catg=document.getElementById("categoryDropdown").value;
		   console.log("selected categoryyyyyy"+ catg);
		   retriveCategorySpecificRecords(catg);
		    
	    });

function retriveCategorySpecificRecords(catg) {
  $.ajax({
    url: "CategorySpecificRecords",
    method: "GET",
    data: { catg: catg },
    success: function(response) {
      $('#content').html(response);
      showCategoriesCatalog();
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}


function navigateToPage(page) {
  var nextPage = parseInt(page) + 1;
  nextPage -= 1;
  console.log('in navigation next', nextPage);
  /*window.location.href = "/listOrders?page=" + nextPage;*/
 
  $.ajax({
    url: "listStocksForPagination",
    method: 'GET',
    data: { nextPage: nextPage },
    success: function(response) {
      $('#content').html(response);
         showCategoriesCatalog();
    },
  
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
}

$('#statisticsModal').on('shown.bs.modal', function() {
  // Retrieve the stock data from the server
  $.ajax({
    url: 'stocksForStatistics',
    method: 'GET',
    success: function(data) {
      // Create the stock statistics
      createStockStatistics(data);

      // Show the statistics modal
      $('#statisticsModal').modal('show');
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
});

$(document).on('click', '#viewStatisticsBtn', function() {
  // Retrieve the stock data from the server
  $.ajax({
    url: 'stocksForStatistics', // Replace with your actual server endpoint URL
    method: 'GET',
    success: function(data) {
      // Create the stock statistics
      console.log('statistics inside');
      createStockCharts(data);

      // Show the statistics modal
      $('#statisticsModal').modal('show');
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }
  });
});


function createStockCharts(data) {
  // Extract data for chart creation
  const productTitles = data.map(stock => stock.title);
  const stockLevels = data.map(stock => stock.stock);
  const reorderLevels = data.map(stock => stock.reorderLevel);

  // Create the stock histogram chart using Chart.js
  const stockHistogramCtx = document.getElementById('stockHistogramChart').getContext('2d');
  const stockHistogramChart = new Chart(stockHistogramCtx, {
    type: 'bar',
    data: {
      labels: productTitles,
      datasets: [
        {
          label: 'Stock Level',
          data: stockLevels,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Customize the colors as needed
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Create the reorder level histogram chart using Chart.js
  const reorderLevelHistogramCtx = document.getElementById('reorderLevelHistogramChart').getContext('2d');
  const reorderLevelHistogramChart = new Chart(reorderLevelHistogramCtx, {
    type: 'bar',
    data: {
      labels: productTitles,
      datasets: [
        {
          label: 'Reorder Level',
          data: reorderLevels,
          backgroundColor: 'rgba(192, 75, 192, 0.5)', // Customize the colors as needed
          borderColor: 'rgba(192, 75, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Create the difference between reorder level and stock level chart using Chart.js
  const diffChartCtx = document.getElementById('diffChart').getContext('2d');
  const diffChart = new Chart(diffChartCtx, {
    type: 'bar',
    data: {
      labels: productTitles,
      datasets: [
        {
          label: 'Reorder Level',
          data: reorderLevels,
          backgroundColor: 'rgba(192, 75, 192, 0.5)', // Customize the colors as needed
          borderColor: 'rgba(192, 75, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Stock Level',
          data: stockLevels,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Customize the colors as needed
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


function createStockStatistics(data) {
  // Extract the necessary data for stock statistics
  const productIds = data.map(stock => stock.id);
  const stockLevels = data.map(stock => stock.stock);
  const reorderLevels = data.map(stock => stock.reorderLevel);

  // Calculate the total number of products
  const totalProducts = data.length;

  // Calculate the average stock level
  const totalStockLevel = stockLevels.reduce((sum, level) => sum + level, 0);
  const averageStockLevel = totalStockLevel / totalProducts;

  // Calculate the number of products below reorder level
  const productsBelowReorderLevel = stockLevels.filter((level, index) => level < reorderLevels[index]).length;

  // Display the stock statistics in the modal
  $('#totalProducts').text(totalProducts);
  $('#averageStockLevel').text(averageStockLevel.toFixed(2));
  $('#productsBelowReorderLevel').text(productsBelowReorderLevel);

  // Create additional statistics or visualizations as needed
  // ...
}

