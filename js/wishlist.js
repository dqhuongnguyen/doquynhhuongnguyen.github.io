function addToWishlist(name, price, image) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // Check if item is already in wishlist
    const exists = wishlist.some(item => item.name === name);
    if (exists) {
        showToast(`${name} is already in your wishlist`);
        return;
    }
    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    showToast(`${name} added to wishlist`);
}

function removeFromWishlist(name) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(item => item.name !== name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const container = document.querySelector(".wishlist-container");

  if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach(item => {
    const div = document.createElement("div");
    div.className = "wishlist-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <button class="remove" onclick="removeFromWishlist('${item.name}')">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
});
