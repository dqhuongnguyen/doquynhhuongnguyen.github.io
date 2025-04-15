// Add item to cart and show toast notification
function addToCart(name, price, image, quantity = 1) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const item = cart.find(p => p.name === name);

  if (item) {
      item.quantity += quantity;
  } else {
      cart.push({
          name,
          price: parseFloat(price),
          image,
          quantity
      });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showToast(`${name} x${quantity} added to cart`);
}

// Simple toast message
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Render cart page if cart table exists
document.addEventListener('DOMContentLoaded', () => {
  const cartBody = document.querySelector('tbody');
  const totalEl = document.querySelector('.cart-total p');

  if (!cartBody || !totalEl) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  cartBody.innerHTML = '';

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="product">
          <img src="${item.image}" alt="${item.name}">
          <div><strong>${item.name}</strong></div>
        </div>
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="quantity">
          <button onclick="updateQty(${i}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQty(${i}, 1)">+</button>
        </div>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
    `;
    cartBody.appendChild(row);
  });

  totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
});

// Update quantity and refresh
function updateQty(index, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
