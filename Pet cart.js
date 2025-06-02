// Add to Cart Function
function addToCart(productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem('Pet cart')) || [];

  const existingItem = cart.find(item => item.product === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      product: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }

  localStorage.setItem('Pet cart', JSON.stringify(cart));
  alert(`${productName} added to cart!`);
  updateCartCount();
}

// Update Cart Count in Nav
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('Pet cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = count;
  }
}

// Display Cart Items on Cart Page
function loadCartItems() {
  let cart = JSON.parse(localStorage.getItem('Pet cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartContainer.innerHTML = ''; // Clear existing items
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <img src="${item.image}" alt="${item.product}">
        <p>${item.product} x ${item.quantity} - BWP ${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(div);

      total += item.price * item.quantity;
    });
  }

  cartTotal.textContent = total.toFixed(2);
}

// Remove Item from Cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('Pet cart')) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem('Pet cart', JSON.stringify(cart));
  loadCartItems();
  updateCartCount();
}

// Checkout Button (Show/Hide Form)
function checkout() {
  const form = document.getElementById('checkout-form');
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
}

// Submit Checkout
function submitCheckout() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!name || !email || !address) {
    alert('Please fill out all required fields.');
    return;
  }

  alert(`Thank you, ${name}! Your order has been placed.`);

  localStorage.removeItem('Pet cart');
  document.getElementById('cart-items').innerHTML = '<p>Your cart is empty.</p>';
  document.getElementById('cart-total').textContent = '0.00';
  document.getElementById('checkout-form').style.display = 'none';
  updateCartCount();
}

// Initialize Cart on Page Load
window.onload = function() {
  updateCartCount();
  if (document.getElementById('cart-items')) {
    loadCartItems();
  }
};
