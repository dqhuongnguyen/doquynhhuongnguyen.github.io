document.addEventListener("DOMContentLoaded", function() {
    const categoryCard = document.querySelectorAll(".category-card");
    const products = document.querySelectorAll(".product");
    
    categoryCard.forEach(card => {
        card.addEventListener("click", function() {
            const category = this.querySelector("span").innerText.toLowerCase();
            
            products.forEach(product => {
                const productCategory = product.getAttribute("data-category").toLowerCase();
                
                if (productCategory === category) {
                    product.style.display = "inline-block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
});

$(document).ready(function() {
    $(".hamburger-menu").click(function() {
        $(".mobile-menu").toggle();
    });
});