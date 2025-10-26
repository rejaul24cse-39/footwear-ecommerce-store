// Main JavaScript for Homepage

// Sample Products Data
const products = [
    { id: 'p1', name: 'Classic Leather Shoes', price: 3500, category: 'men', brand: 'bata', size: [8, 9, 10], image: 'images/product-1.jpg', description: 'Premium leather shoes for formal occasions' },
    { id: 'p2', name: 'Running Sports Shoes', price: 4200, category: 'sports', brand: 'nike', size: [7, 8, 9, 10], image: 'images/product-2.jpg', description: 'Comfortable running shoes with cushioned sole' },
    { id: 'p3', name: 'Women\'s Heels', price: 2800, category: 'women', brand: 'bata', size: [6, 7, 8], image: 'images/product-3.jpg', description: 'Elegant heels for special occasions' },
    { id: 'p4', name: 'Kids Sneakers', price: 1500, category: 'kids', brand: 'adidas', size: [2, 3, 4], image: 'images/product-4.jpg', description: 'Colorful and comfortable kids sneakers' },
    { id: 'p5', name: 'Casual Canvas Shoes', price: 2200, category: 'men', brand: 'bata', size: [8, 9, 10, 11], image: 'images/product-5.jpg', description: 'Trendy canvas shoes for everyday wear' },
    { id: 'p6', name: 'Women\'s Sandals', price: 1800, category: 'women', brand: 'bata', size: [6, 7, 8, 9], image: 'images/product-6.jpg', description: 'Comfortable sandals for summer' },
    { id: 'p7', name: 'Training Shoes', price: 3800, category: 'sports', brand: 'puma', size: [8, 9, 10], image: 'images/product-7.jpg', description: 'Professional training shoes for athletes' },
    { id: 'p8', name: 'Formal Oxfords', price: 4500, category: 'men', brand: 'bata', size: [8, 9, 10, 11], image: 'images/product-8.jpg', description: 'Classic oxford shoes for business' }
];

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const featuredProducts = products.slice(0, 4);
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22250%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23666%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">BDT ${product.price}</p>
                <button class="btn-primary add-to-cart" onclick="addProductToCart('${product.id}')">Add to Cart</button>
                <a href="product-detail.html?id=${product.id}" class="btn-secondary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Add product to cart from product card
function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
        window.location.href = `products.html?search=${encodeURIComponent(searchInput.value)}`;
    }
}

// Allow enter key for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    loadFeaturedProducts();
});
