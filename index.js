const eventAdminID = "ADM/000/0470";   // Event Admin
const mainAdminID  = "ADM/001/0470";   // Main Admin
const regex = /^(CSC)\/((1[89]|2[0-5])u)\/(0*[1-9][0-9]{0,3}|0*5000)$/;

document.getElementById("login-form").addEventListener("submit", function(e) {
   e.preventDefault();
   const id = document.getElementById("id-space").value.trim();

   // Main Admin
   if (id === mainAdminID) {
     alert("Welcome Main Admin!");
     localStorage.setItem("role", "mainAdmin");
     window.location.href = "admin.html";
     return;
   }

   // Event Admin
   if (id === eventAdminID) {
     alert("Welcome Event Admin!");
     localStorage.setItem("role", "eventAdmin");
     window.location.href = "event.html";
     return;
   }

   // Students
   if (!regex.test(id)) {
     alert("Invalid ID format!\nExample: CSC/20u/0034");
     return;
   }

   alert("Login successful with ID: " + id);
   localStorage.setItem("role", "student");
   window.location.href = "event.html"; 
});
