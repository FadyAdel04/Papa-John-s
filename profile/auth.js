// Check session state on page load
window.onload = function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
      // If a user is logged in, show their profile
      const user = JSON.parse(localStorage.getItem(loggedInUser));
      document.getElementById("profile-name").textContent = `${user.firstName} ${user.lastName}`;
      document.getElementById("profile-mobile").textContent = user.mobileNumber;
      document.getElementById("profile-address").textContent = user.address;
      showProfile();
      displayProfile(); // Call the function to display profile data and last orders
  } else {
      // If no user is logged in, show the sign-in section
      showSignIn();
  }
};

// Show Sign Up Section
function showSignUp() {
  document.getElementById("signup-section").style.display = "block";
  document.getElementById("signin-section").style.display = "none";
  document.getElementById("profile-section").style.display = "none";
  document.getElementById("last-orders-section").style.display = "none"; // Hide last orders section
}

// Show Sign In Section
function showSignIn() {
  document.getElementById("signin-section").style.display = "block";
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("profile-section").style.display = "none";
  document.getElementById("last-orders-section").style.display = "none"; // Hide last orders section
}

// Show Profile Section
function showProfile() {
  document.getElementById("profile-section").style.display = "block";
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("signin-section").style.display = "none";
  document.getElementById("last-orders-section").style.display = "block"; // Show last orders section
}

// Function to display profile data and last orders
function displayProfile() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
      const user = JSON.parse(localStorage.getItem(loggedInUser));
      if (user) {
          // Display user details
          document.getElementById("profile-name").textContent = `${user.firstName} ${user.lastName}`;
          document.getElementById("profile-mobile").textContent = user.mobileNumber;
          document.getElementById("profile-address").textContent = user.address;

          // Display last orders
          const lastOrdersContainer = document.getElementById('last-orders');
          if (user.orders && user.orders.length > 0) {
              lastOrdersContainer.innerHTML = user.orders.map((order , index) => `
                  <div class="order-card">
                  <h5 class="card-title">Order #${index + 1}</h5>
                      <p><strong>Date:</strong> ${order.date}</p>
                      <p><strong>Total:</strong> ${order.total}</p>
                      <p class="card-text"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                      <p><strong>Address:</strong> ${order.address}</p>
                      <ul>
                          ${order.items.map(item => `
                              <li>${item.name} - ${item.price} x ${item.quantity || 1}</li>
                          `).join('')}
                      </ul>
                  </div>
              `).join('');
          } else {
              lastOrdersContainer.innerHTML = '<p>No orders found.</p>';
          }
      }
  } else {
      // Hide the last orders section if no user is logged in
      document.getElementById("last-orders-section").style.display = "none";
  }
}

// Sign Up Form Submission
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const mobileNumber = document.getElementById("mobile-number").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("signup-password").value;

  const user = {
      firstName,
      lastName,
      mobileNumber,
      address,
      password,
  };

  // Save user data to local storage
  localStorage.setItem(mobileNumber, JSON.stringify(user));
  alert("Sign up successful! Please sign in.");
  showSignIn();
});

// Sign In Form Submission
document.getElementById("signin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const mobileNumber = document.getElementById("signin-mobile").value;
  const password = document.getElementById("signin-password").value;

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem(mobileNumber));

  if (user && user.password === password) {
      // Save the logged-in user's mobile number to track the session
      localStorage.setItem("loggedInUser", mobileNumber);

      // Display profile data
      document.getElementById(
          "profile-name"
      ).textContent = `${user.firstName} ${user.lastName}`;
      document.getElementById("profile-mobile").textContent = user.mobileNumber;
      document.getElementById("profile-address").textContent = user.address;
      showProfile();
      displayProfile(); // Call the function to display profile data and last orders
  } else {
      alert("Invalid mobile number or password.");
  }
});

// Update Address Function
function updateAddress() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const newAddress = document.getElementById("new-address").value;

  if (!newAddress) {
      alert("Please enter a new address.");
      return;
  }

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem(loggedInUser));

  if (user) {
      // Update the address
      user.address = newAddress;

      // Save the updated user data back to localStorage
      localStorage.setItem(loggedInUser, JSON.stringify(user));

      // Update the displayed address
      document.getElementById("profile-address").textContent = newAddress;

      // Clear the input field
      document.getElementById("new-address").value = "";

      alert("Address updated successfully!");
  } else {
      alert("User not found. Please sign in again.");
  }
}

// Logout Function
function logout() {
  // Clear the logged-in user session
  localStorage.removeItem("loggedInUser");

  // Clear the sign-in form
  document.getElementById("signin-form").reset();

  // Show the sign-in section
  showSignIn();

  // Hide the last orders section
  document.getElementById("last-orders-section").style.display = "none";
}