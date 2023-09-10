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

  // Fetch user data when the page loads
  fetchUserData();
});
