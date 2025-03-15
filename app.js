function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// Function to update the cart count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Fetch cart data from localStorage
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length; // Update the count
}

// Update the cart count when the page loads
updateCartCount();
