// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve cart from session storage or initialize an empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Ensure cart is valid
if (!Array.isArray(cart)) {
  cart = [];
  updateCartInSessionStorage();
}

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear list before rendering
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners to all 'Add to Cart' buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear cart before rendering
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add event listeners to all 'Remove' buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Prevent duplicate entries
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    alert("This product is already in your cart.");
    return;
  }

  cart.push(product);
  updateCartInSessionStorage();
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartInSessionStorage();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  updateCartInSessionStorage();
  renderCart();
}

// Update session storage with current cart
function updateCartInSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Event Listener for Clear Cart button
clearCartBtn.addEventListener("click", clearCart);

// Clear cart on page load if sessionStorage is invalid
if (!Array.isArray(cart)) {
  clearCart();
}

// Initial render
renderProducts();
renderCart();
