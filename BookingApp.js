document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("UserAppointmentForm");
  var userList = document.getElementById("userList");
  var editingUserId = null; // Declare editingUserId variable

  // Function to display user data in the list
  function displayUserData(userDetails) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `
      <p>Name: ${userDetails.name}</p>
      <p>Email: ${userDetails.email}</p>
      <p>Phone: ${userDetails.phone}</p>
    `;

    // Create an edit button for this user
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-id", userDetails._id);

    editButton.addEventListener("click", function () {
      var userId = editButton.getAttribute("data-id");
      editUser(userId);
    });

    // Create a delete button for this user
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-id", userDetails._id);

    deleteButton.addEventListener("click", function () {
      var userId = deleteButton.getAttribute("data-id");
      deleteUser(userId);
    });

    // Append the edit and delete buttons to the list item
    listItem.appendChild(editButton);
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

    if (editingUserId) {
      // If editing an existing user, update their details
      updateUser(editingUserId, userDetails);
    } else {
      // If not editing, add a new user
      addUser(userDetails);
    }
  }

  // Function to add a new user
  function addUser(userDetails) {
    axios
      .post("https://crudcrud.com/api/982adcb6113740c18338eeff1e7176f1/post", userDetails)
      .then((response) => {
        console.log("User added successfully:", response.data);

        // Clear the form fields after submission
        form.reset();

        // Display a success message
        alert("User details added successfully!");

        // Update the user list
        updateUserList();
      })
      .catch((error) => {
        console.error("Error adding user:", error);

        // Handle any errors that may occur during the POST request
        alert("An error occurred while adding user details.");
      });
  }

  // Function to fetch user data using Axios GET
  function fetchUserData() {
    axios
      .get("https://crudcrud.com/api/982adcb6113740c18338eeff1e7176f1/post")
      .then((response) => {
        console.log("GET Response:", response.data);

        // Clear the user list
        userList.innerHTML = "";

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

  // Function to populate the form with user details for editing
function editUser(userId) {
  // Fetch the user details from the API by user ID
  axios
    .get(`https://crudcrud.com/api/982adcb6113740c18338eeff1e7176f1/post/${userId}`)
    .then((response) => {
      var user = response.data;

      // Populate the form fields with user details
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phone;

      // Set the editingUserId to the current user's ID
      editingUserId = userId;
    })
    .catch((error) => {
      console.error("GET Error:", error);

      // Handle any errors that may occur during the GET request
      alert("An error occurred while fetching user details.");
    });
}


  // Function to update the user data using Axios PUT
function updateUser(userId, userDetails) {
  axios
    .put(`https://crudcrud.com/api/982adcb6113740c18338eeff1e7176f1/post/${userId}`, userDetails)
    .then((response) => {
      console.log("User updated successfully:", response.data);

      // Clear the form fields after submission
      form.reset();

      // Display a success message
      alert("User details updated successfully!");

      // Reset editingUserId
      editingUserId = null;

      // Update the user list
      updateUserList();
    })
    .catch((error) => {
      console.error("Error updating user:", error);

      // Handle any errors that may occur during the PUT request
      alert("An error occurred while updating user details.");
    });
}


  // Function to delete user data using Axios DELETE
  function deleteUser(userId) {
    axios
      .delete(`https://crudcrud.com/api/982adcb6113740c18338eeff1e7176f1/post/${userId}`)
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

  // Function to update the user list after performing actions
  function updateUserList() {
    // Clear the user list and fetch updated data
    userList.innerHTML = "";
    fetchUserData();
  }

  // Handle form submission when submit button is clicked
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
  });

  // Fetch user data when the page loads
  fetchUserData();
});
