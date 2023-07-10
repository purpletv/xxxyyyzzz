$(document).ready(function() {
  $('#dateRangeFilter, #processedStatusFilter').change(function() {
    applyFilters();
  });
});

function applyFilters() {
  var dateRangeFilter = $('#dateRangeFilter').val();
  var processedStatusFilter = $('#processedStatusFilter').val();

  $('.order-row').each(function() {
    var orderRow = $(this);
    var orderDate = orderRow.find('td:eq(3)').text();
    var processedStatus = orderRow.find('td:eq(12) button').text();

    var showRow = true;

    if (dateRangeFilter !== 'All') {
      var currentDate = new Date();
      var orderDateObj = new Date(orderDate);

      if (dateRangeFilter === 'daily' && !isSameDate(currentDate, orderDateObj)) {
        showRow = false;
      } else if (dateRangeFilter === 'weekly' && !isSameWeek(currentDate, orderDateObj)) {
        showRow = false;
      } else if (dateRangeFilter === 'monthly' && !isSameMonth(currentDate, orderDateObj)) {
        showRow = false;
      }
    }

    if (processedStatusFilter !== '') {
      if (processedStatusFilter === 'processed' && processedStatus !== 'Unprocessed') {
        showRow = false;
      } else if (processedStatusFilter === 'unprocessed' && processedStatus === 'Unprocessed') {
        showRow = false;
      }
    }

    if (showRow) {
      orderRow.show();
    } else {
      orderRow.hide();
    }
  });
}

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameWeek(date1, date2) {
  var oneDay = 24 * 60 * 60 * 1000;
  var firstDayOfWeek = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() - date1.getDay());
  var firstDayOfNextWeek = new Date(firstDayOfWeek.getTime() + 7 * oneDay);
  return date2 >= firstDayOfWeek && date2 < firstDayOfNextWeek;
}

function isSameMonth(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}
