function addToCart(product, price, image, size, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.product === product && item.size === size);
  if (item) {
    item.quantity += parseInt(quantity);
  } else {
    cart.push({
      product,
      price,
      image,
      size,
      quantity: parseInt(quantity),
      description: "A stylish and comfy tee for your furry friend."
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsElement.innerHTML += `
      <div class="cart-item" style="justify-content: space-between;">
        <img src="${item.image}" alt="${item.product}" />
        <div style="flex: 1; margin-left: 1em;">
          <p><strong>${item.product}</strong></p>
          <p>Description: ${item.description || 'No description available.'}</p>
          <p>Size: ${item.size}</p>
          <p class="price">BWP ${item.price.toFixed(2)}</p>
          <div style="display: flex; align-items: center; gap: 0.5em;">
            <button onclick="changeQuantity(${index}, -1)">−</button>
            <span>Qty: ${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
          <button onclick="removeFromCart('${item.product}', '${item.size}')">Remove</button>
        </div>
      </div>
    `;
  });

  document.getElementById('cart-total').innerText = total.toFixed(2);
}

function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeFromCart(product, size) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => !(item.product === product && item.size === size));
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function checkout() {
  document.getElementById('checkout-form').style.display = 'block';
}

function submitCheckout() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const notes = document.getElementById('notes').value;

  if (name && email && address) {
    alert('Order submitted successfully!');
    localStorage.removeItem('cart');
    loadCart();
    document.getElementById('checkout-form').style.display = 'none';
  } else {
    alert('Please fill in all required fields.');
  }
}

window.onload = loadCart;
