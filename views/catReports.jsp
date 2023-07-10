<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="eStoreProduct.model.admin.entities.*,java.util.*,eStoreProduct.model.admin.output.*"
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="./css/catReports.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="./js/catReports.js"></script>
</head>
<body>
<% List<CategoryReportViewModel> report = (List<CategoryReportViewModel>) request.getAttribute("categoryReport"); %>
<% 
    int totalProducts = 0;
    double totalGST = 0.0;
    long totalSales = 0;
    double totalAmount = 0.0;
    for (CategoryReportViewModel viewModel : report) {
        totalProducts += viewModel.getTotal_products();
        totalGST += viewModel.getTotal_gst();
        totalSales += viewModel.getTotal_sales();
        totalAmount += viewModel.getTotal_amount();
    }
%>
<select id="catSorting" onchange="sortBy(this.value)">
    <option>Sort By</option>
    <option id="GST" value="GST">GST</option>
    <option id="Sales" value="Sales">Sales</option>
    <option id="Amount" value="Amount">Amount</option>
    <option id="totalProd" value="totalProd">Total Products</option>
</select>
<table>
    <thead>
        <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th onclick="totProd()">Total Products</th>
            <th onclick="totalGST()">Total GST</th>
            <th onclick="totalSales()">Total Sales</th>
            <th onclick="totalAmount()">Total Amount</th>
        </tr>
    </thead>
    <tbody>
        <% for (CategoryReportViewModel viewModel : report) { %>
            <tr>
                <td><%= viewModel.getPtct_id() %></td>
                <td><%= viewModel.getPtct_name() %></td>
                <td><%= viewModel.getTotal_products() %></td>
                <td><%= viewModel.getTotal_gst() %></td>
                <td><%= viewModel.getTotal_sales() %></td>
                <td><%= viewModel.getTotal_amount() %></td>
            </tr>
        <% } %>
        <tr class="total-row">
            <td colspan="2">Total</td>
            <td><%= totalProducts %></td>
            <td><%= totalGST %></td>
            <td><%= totalSales %></td>
            <td><%= totalAmount %></td>
        </tr>
    </tbody>
</table>

<script>
// Get the data for the bar graphs
var categoryNames = [];
var totalProductsData = [];
var totalGSTData = [];
var totalSalesData = [];
var totalAmountData = [];

<% for (CategoryReportViewModel viewModel : report) { %>
    categoryNames.push('<%= viewModel.getPtct_name() %>');
    totalProductsData.push(<%= viewModel.getTotal_products() %>);
    totalGSTData.push(<%= viewModel.getTotal_gst() %>);
    totalSalesData.push(<%= viewModel.getTotal_sales() %>);
    totalAmountData.push(<%= viewModel.getTotal_amount() %>);
<% } %>

// Create a bar graph for each column
var ctx = document.createElement("canvas").getContext("2d");

// Bar graph for Total Products
var totalProductsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categoryNames,
        datasets: [{
            label: 'Total Products',
            data: totalProductsData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Bar graph for Total GST
var totalGSTChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categoryNames,
        datasets: [{
            label: 'Total GST',
            data: totalGSTData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Bar graph for Total Sales
var totalSalesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categoryNames,
        datasets: [{
            label: 'Total Sales',
            data: totalSalesData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Bar graph for Total Amount
var totalAmountChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categoryNames,
        datasets: [{
            label: 'Total Amount',
            data: totalAmountData,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
</script>
</body>
</html>
