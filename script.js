// 🛒 **Product Data**
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// 🖥️ **DOM Elements**
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 🧠 **Initialize Cart**
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Validate session storage integrity
if (!Array.isArray(cart)) {
  cart = [];
  updateCartInSessionStorage();
}

// 📝 **Render Product List**
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// 🛍️ **Render Cart**
function renderCart() {
  cartList.innerHTML = "";
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

  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

// ➕ **Add Item to Cart**
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const exists = cart.some((item) => item.id === productId);
  if (exists) {
    alert("This product is already in your cart.");
    return;
  }

  cart.push(product);
  updateCartInSessionStorage();
  renderCart();
}

// ➖ **Remove Item from Cart**
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartInSessionStorage();
  renderCart();
}

// 🧹 **Clear Cart**
function clearCart() {
  cart = [];
  updateCartInSessionStorage();
  renderCart();
}

// 💾 **Update Session Storage**
function updateCartInSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Clear cart if invalid data exists in sessionStorage
function validateSessionStorage() {
  const storedCart = sessionStorage.getItem("cart");
  try {
    const parsedCart = JSON.parse(storedCart);
    if (!Array.isArray(parsedCart)) {
      throw new Error("Invalid cart data");
    }
  } catch {
    sessionStorage.removeItem("cart");
  }
}

// Event Listener for Clear Cart Button
clearCartBtn.addEventListener("click", clearCart);

// Validate and initialize cart
validateSessionStorage();
renderProducts();
renderCart();
