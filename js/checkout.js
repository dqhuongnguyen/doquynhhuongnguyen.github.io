document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".order-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartContainer) {
    // Clear existing items
    cartContainer.querySelectorAll(".cart-item").forEach(item => item.remove());

    let subtotal = 0;

    // Build cart item HTML
    const cartItemsMarkup = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <p>${item.name}</p>
            <span>$${item.price.toFixed(2)} × ${item.quantity}</span>
          </div>
        </div>
      `;
    }).join("");

    const shippingFee = 20;
    const grandTotal = subtotal + shippingFee;

    const totalsMarkup = `
      <div class="totals">
        <div><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div><span>Shipping</span><span>$${shippingFee.toFixed(2)}</span></div>
        <div class="total"><strong>Total</strong><strong>$${grandTotal.toFixed(2)}</strong></div>
      </div>
    `;

    cartContainer.insertAdjacentHTML("afterbegin", cartItemsMarkup);
    cartContainer.insertAdjacentHTML("beforeend", totalsMarkup);
  }

  // Payment form handling
  const form = document.querySelector("form");
  const payBtn = document.querySelector(".pay-button");
  const errorMsg = document.querySelector(".form-error");

  if (payBtn && form) {
    payBtn.addEventListener("click", e => {
      e.preventDefault();
      errorMsg.textContent = "";

      if (form.checkValidity()) {
        localStorage.removeItem("cart");

        document.querySelector(".container").innerHTML = `
          <div class="confirmation">
            <h2>Thank you for your purchase!</h2>
            <p>Your order has been successfully placed. You’ll receive a confirmation email shortly.</p>
            <a href="index.html" class="continue-btn">Continue Shopping</a>
          </div>
        `;
      } else {
        errorMsg.style.color = "red";
        errorMsg.textContent = "* Please fill out all required fields.";
        form.reportValidity();
      }
    });
  }
});
