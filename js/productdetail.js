
document.addEventListener("DOMContentLoaded", () => {
    const products = {
        "airpods-max": {
            name: "AirPods Max",
            price: 549.0,
            image: "./assets/airpod_max.jpg",
            description: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
        },
        "macbook-pro": {
            name: "Macbook Pro 13 inch",
            price: 1499.0,
            image: "./assets/macbook.webp",
            description: "Powerful performance in a portable design.",
        },
        "think-grow-rich": {
            name: "Think and Grow Rich",
            price: 29.0,
            image: "./assets/book.webp",
            description: "Classic personal development book for achieving success.",
        },
        "reebok-sneaker": {
            name: "Reebok Men's Nano 2.0 Sneaker",
            price: 59.0,
            image: "./assets/shoes.webp",
            description: "Durable and versatile sneakers for every training session.",
        },
        "tennis-tee": {
            name: "Tennis Tee",
            price: 29.0,
            image: "./assets/shirt.webp",
            description: "Comfortable and stylish tee perfect for sports and casual wear.",
        },
        "baseball-cap": {
            name: "Baseball Cap",
            price: 24.0,
            image: "./assets/hat.webp",
            description: "Classic cap for sun protection and casual fashion.",
        },
        "tomatoes": {
            name: "Tomatoes on the Vine, 2 lbs",
            price: 19.0,
            image: "./assets/tomato.jpg",
            description: "Fresh and juicy vine-ripened tomatoes for your daily meals.",
        },
        "macbook-pro-alt": {
            name: "Macbook Pro 13 inch",
            price: 1499.0,
            image: "./assets/macbook.webp",
            description: "Same great performance, limited-time discount edition.",
        }
    };

    // Get product ID from URL if on product detail page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = products[productId];

    if (product) {
        // Populate product detail content dynamically
        const imgEl = document.querySelector(".product-image img");
        const titleEl = document.querySelector(".product-details h1");
        const descEl = document.querySelector(".product-details p");
        const priceEl = document.querySelector(".price");
        const cartBtn = document.querySelector(".add-to-cart");

        imgEl.src = product.image;
        imgEl.alt = product.name;
        titleEl.textContent = product.name;
        descEl.textContent = product.description;
        priceEl.textContent = `$${product.price.toFixed(2)}`;

        // Handle add to cart
        if (cartBtn) {
            cartBtn.addEventListener("click", (e) => {
                e.preventDefault();
                
                const qtyInput = document.getElementById("quantity");
                const quantity = parseInt(qtyInput.value) || 1;
            
                addToCart(product.name, product.price, product.image, quantity);
            });
        }
    }

    // If on the homepage, make each product card clickable (excluding buttons)
    if (
        window.location.pathname.includes("index.html") ||
        window.location.pathname === "/" ||
        !productId
    ) {
        const cards = document.querySelectorAll(".product");

        cards.forEach((card) => {
            card.addEventListener("click", (e) => {
                // Don’t trigger if clicking on a button inside the card
                if (e.target.closest("button")) return;

                const title = card.querySelector("h2");
                if (!title) return;

                const productName = title.textContent.trim();
                const entry = Object.entries(products).find(([_, val]) => val.name === productName);

                if (entry) {
                    const [key] = entry;
                    window.location.href = `productdetail.html?id=${key}`;
                }
            });
        });
    }
});
