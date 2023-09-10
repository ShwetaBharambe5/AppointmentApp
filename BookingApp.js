document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("UserAppointmentForm");
  var userList = document.getElementById("userList");

  // Function to display user data in the list
  function displayUserData(userDetails) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `
      <p>Name: ${userDetails.name}</p>
      <p>Email: ${userDetails.email}</p>
      <p>Phone: ${userDetails.phone}</p>
    `;
    userList.appendChild(listItem);

    // Create a delete button for this user
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-id", userDetails._id);
    
    // Attach a click event listener to the delete button
    deleteButton.addEventListener("click", function () {
      var userId = deleteButton.getAttribute("data-id");
      deleteUser(userId);
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the list item to the user list
    userList.appendChild(listItem);
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

    // Use Axios to send a POST request to the 'crudcrud.com' API
    axios
      .post("https://crudcrud.com/api/f1af41d5067948c7b2488cbf9cd27b05/post", userDetails)
      .then((response) => {
        console.log("POST Response:", response.data);

        // Clear the form fields after submission
        form.reset();

        // Display a success message
        alert("User details submitted successfully!");
      })
      .catch((error) => {
        console.error("POST Error:", error);

        // Handle any errors that may occur during the POST request
        alert("An error occurred while submitting user details.");
      });
  }

  // Function to fetch user data using Axios GET
  function fetchUserData() {
    axios
      .get("https://crudcrud.com/api/f1af41d5067948c7b2488cbf9cd27b05/post")
      .then((response) => {
        console.log("GET Response:", response.data);

        // Display the retrieved user data on the screen
        for (var i = 0; i < response.data.length; i++) {
          displayUserData(response.data[i]);
        }
      })
      .catch((error) => {
        console.error("GET Error:", error);

        // Handle any errors that may occur during the GET request
        alert("An error occurred while fetching user data.");
      });
  }

  // Handle form submission when submit button is clicked
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
  });

  // Function to delete user data using Axios DELETE
  function deleteUser(userId) {
    axios
      .delete(`https://crudcrud.com/api/f1af41d5067948c7b2488cbf9cd27b05/post/${userId}`)
      .then((response) => {
        console.log("DELETE Response:", response.data);

        // Remove the user's list item from the website
        var listItem = document.querySelector(`[data-id="${userId}"]`);
        if (listItem) {
          listItem.remove();
        } else {
          console.warn("List item not found for deletion.");
        }

        // Display a success message
        alert("User details deleted successfully!");
      })
      .catch((error) => {
        console.error("DELETE Error:", error);

        // Handle any errors that may occur during the DELETE request
        alert("An error occurred while deleting user details.");
      });
  }

  // Handle form submission when submit button is clicked
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
  });

  // Fetch user data when the page loads
  fetchUserData();
});
