<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="eStoreProduct.externalServices.passwordHashing,java.util.List" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Change Password</title>
<script>
function checkOldPassword() {
  var oldPassword = document.getElementById('oldPassword').value;
  hashedOldPassword=null;
  // Send an AJAX request to the server to hash the old password
  $.ajax({
    url: "hashEnteredPassword",
    method: "POST",
    data: { password: oldPassword },
    async: false,
    success: function(response) {
    	console.log(response);
      hashedOldPassword = response;
    },
    error: function(xhr, status, error) {
      console.log('AJAX Error: ' + error);
    }});
    
  var originalPassword = null; // Replace with the actual original password
  $.ajax({
	    url: "getOldHashPassword",
	    method: "POST",
	    
	    async: false,
	    success: function(response) {
	    	originalPassword = response;
	    },
	    error: function(xhr, status, error) {
	      console.log('AJAX Error: ' + error);
	    }});
	    
  
  if (hashedOldPassword === originalPassword) {
    document.getElementById('newPasswordDiv').style.display = 'block';
  } else {
    alert("Invalid old password!");
  }
}



function changePassword() {
  var newPassword = document.getElementById('newPassword').value;
  $.ajax({
	    url: "updatePassword",
	    method: "POST",
	    data: { newPassword: newPassword },

	    async: false,
	    success: function(response) {
	    	console.log('updated successfully');
	    },
	    error: function(xhr, status, error) {
	      console.log('AJAX Error: ' + error);
	    }});
	    
  // Perform the password change logic here (e.g., send an AJAX request to update the password in the backend)
  alert("Password changed successfully!");
}
</script>
</head>
<body>
  <h1>Change Password</h1>
  
  <label for="oldPassword">Old Password:</label>
  <input type="password" id="oldPassword" name="oldPassword">
  <button onclick="checkOldPassword()">Submit</button>
  
  <div id="newPasswordDiv" style="display: none;">
    <label for="newPassword">New Password:</label>
    <input type="password" id="newPassword" name="newPassword">
    <button onclick="changePassword()">Change Password</button>
  </div>
</body>
</html>
