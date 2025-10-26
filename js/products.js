// Products Page JavaScript

// Sample Products Data (same as in main.js)
const products = [
    { id: 'p1', name: 'Classic Leather Shoes', price: 3500, category: 'men', brand: 'bata', size: [8, 9, 10], image: 'images/product-1.jpg', description: 'Premium leather shoes for formal occasions' },
    { id: 'p2', name: 'Running Sports Shoes', price: 4200, category: 'sports', brand: 'nike', size: [7, 8, 9, 10], image: 'images/product-2.jpg', description: 'Comfortable running shoes with cushioned sole' },
    { id: 'p3', name: 'Women\'s Heels', price: 2800, category: 'women', brand: 'bata', size: [6, 7, 8], image: 'images/product-3.jpg', description: 'Elegant heels for special occasions' },
    { id: 'p4', name: 'Kids Sneakers', price: 1500, category: 'kids', brand: 'adidas', size: [2, 3, 4], image: 'images/product-4.jpg', description: 'Colorful and comfortable kids sneakers' },
    { id: 'p5', name: 'Casual Canvas Shoes', price: 2200, category: 'men', brand: 'bata', size: [8, 9, 10, 11], image: 'images/product-5.jpg', description: 'Trendy canvas shoes for everyday wear' },
    { id: 'p6', name: 'Women\'s Sandals', price: 1800, category: 'women', brand: 'bata', size: [6, 7, 8, 9], image: 'images/product-6.jpg', description: 'Comfortable sandals for summer' },
    { id: 'p7', name: 'Training Shoes', price: 3800, category: 'sports', brand: 'puma', size: [8, 9, 10], image: 'images/product-7.jpg', description: 'Professional training shoes for athletes' },
    { id: 'p8', name: 'Formal Oxfords', price: 4500, category: 'men', brand: 'bata', size: [8, 9, 10, 11], image: 'images/product-8.jpg', description: 'Classic oxford shoes for business' },
    { id: 'p9', name: 'Women\'s Boots', price: 5200, category: 'women', brand: 'bata', size: [6, 7, 8], image: 'images/product-9.jpg', description: 'Stylish boots for winter' },
    { id: 'p10', name: 'Slip-On Loafers', price: 2900, category: 'men', brand: 'bata', size: [8, 9, 10], image: 'images/product-10.jpg', description: 'Easy-to-wear loafers for casual outings' },
    { id: 'p11', name: 'Basketball Shoes', price: 4800, category: 'sports', brand: 'nike', size: [8, 9, 10, 11], image: 'images/product-11.jpg', description: 'High-performance basketball shoes' },
    { id: 'p12', name: 'Ballet Flats', price: 2400, category: 'women', brand: 'bata', size: [6, 7, 8], image: 'images/product-12.jpg', description: 'Comfortable ballet flats for daily wear' }
];

let filteredProducts = [...products];

// Load all products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    displayProducts(filteredProducts);
}

// Display products
function displayProducts(productsToDisplay) {
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    
    if (productCount) {
        productCount.textContent = `Showing ${productsToDisplay.length} products`;
    }
    
    productGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22250%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23666%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">BDT ${product.price}</p>
                <button class="btn-primary add-to-cart" onclick="addProductToCart('${product.id}')">Add to Cart</button>
                <a href="product-detail.html?id=${product.id}" class="btn-secondary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    const categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const sizeFilters = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => parseInt(cb.value));
    const brandFilters = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
    const priceFilters = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
    
    filteredProducts = products.filter(product => {
        let matchesCategory = categoryFilters.length === 0 || categoryFilters.includes(product.category);
        let matchesSize = sizeFilters.length === 0 || product.size.some(s => sizeFilters.includes(s));
        let matchesBrand = brandFilters.length === 0 || brandFilters.includes(product.brand);
        let matchesPrice = priceFilters.length === 0 || priceFilters.some(range => {
            const [min, max] = range.split('-').map(Number);
            return product.price >= min && (max ? product.price <= max : true);
        });
        
        return matchesCategory && matchesSize && matchesBrand && matchesPrice;
    });
    
    displayProducts(filteredProducts);
}

// Clear all filters
function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    filteredProducts = [...products];
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect.value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts = [...products];
    }
    
    displayProducts(filteredProducts);
}

// Add product to cart
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

// Check URL parameters for category or search
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            filterProducts();
        }
    }
    
    if (search) {
        filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
        displayProducts(filteredProducts);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    checkUrlParams();
});
