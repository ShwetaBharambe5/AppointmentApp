document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("UserAppointmentForm");
    var userList = document.getElementById("userList");
    var editingUser = null;
  
    // Function to display user data in the list
    function displayUserData() {
      userList.innerHTML = "";
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key !== "usersData") {
          var user = JSON.parse(localStorage.getItem(key));
          var listItem = document.createElement("li");
          listItem.innerHTML = `
            <p>Name: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <button data-email="${user.email}" class="editBtn">Edit</button>
            <button data-email="${user.email}" class="deleteBtn">Delete</button>
          `;
          userList.appendChild(listItem);
        }
      }
    }
  
    // Function to store user data in local storage
    function storeUserData(userDetails) {
      var email = userDetails.email;
      localStorage.setItem(email, JSON.stringify(userDetails));
    }
  
    // Function to delete user data from local storage
    function deleteUser(email) {
      var user = JSON.parse(localStorage.getItem(email));
      editingUser = user; // Store the user data in the editingUser variable before deleting
      localStorage.removeItem(email);
    }
  
    // Function to populate form fields for editing
    function editUser(email) {
      // Remove the user data from the screen and local storage
      deleteUser(email);
      displayUserData();
  
      // Populate the form fields for editing with the deleted user's data
      document.getElementById("name").value = editingUser.name;
      document.getElementById("email").value = editingUser.email;
      document.getElementById("phone").value = editingUser.phone;
    }
  
    // Function to handle form submission
    function submitForm() {
      // Get form input values
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var phone = document.getElementById("phone").value;
  
      // Create an object to store the user details
      var userDetails = {
        name: name,
        email: email,
        phone: phone,
      };
  
      // If editing an existing user, store the email before deleting the old data
      if (editingUser) {
        var oldEmail = editingUser.email;
        editingUser = null; // Reset the editingUser variable
      }
  
      // Store the user details in local storage
      storeUserData(userDetails);
  
      // If editing an existing user, delete the old data from local storage
      if (oldEmail) {
        deleteUser(oldEmail);
      }
  
      // Clear the form fields after submission
      form.reset();
  
      // Display the updated user data in the list immediately after submission
      displayUserData();
  
      // Display a success message
      alert("User details submitted successfully!");
    }
  
    // Display existing user data on page load
    displayUserData();
  
    // Handle form submission when submit button is clicked
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm();
    });
  
    // Handle editing when the Edit button is clicked
    userList.addEventListener("click", function (e) {
      if (e.target.classList.contains("deleteBtn")) {
        var email = e.target.dataset.email;
        // Remove user data from local storage
        deleteUser(email);
        // Update the list to reflect the changes
        displayUserData();
      } else if (e.target.classList.contains("editBtn")) {
        var email = e.target.dataset.email;
        // Populate the form fields for editing
        editUser(email);
      }
    });
  });