// Product Detail Page JavaScript

const products = [
    { id: 'p1', name: 'Classic Leather Shoes', price: 3500, category: 'men', brand: 'bata', size: [8, 9, 10], image: 'images/product-1.jpg', description: 'Premium quality leather shoes perfect for formal occasions. Made with genuine leather and comfortable insole.', features: ['Genuine Leather', 'Comfortable Fit', 'Durable Sole', 'Professional Look'] },
    { id: 'p2', name: 'Running Sports Shoes', price: 4200, category: 'sports', brand: 'nike', size: [7, 8, 9, 10], image: 'images/product-2.jpg', description: 'High-performance running shoes with excellent cushioning for long distance runs.', features: ['Breathable Mesh', 'Cushioned Sole', 'Lightweight', 'Shock Absorption'] },
    { id: 'p3', name: 'Women\'s Heels', price: 2800, category: 'women', brand: 'bata', size: [6, 7, 8], image: 'images/product-3.jpg', description: 'Elegant heels for special occasions and formal events.', features: ['Stylish Design', '3-inch Heel', 'Comfortable Padding', 'Quality Material'] },
    { id: 'p4', name: 'Kids Sneakers', price: 1500, category: 'kids', brand: 'adidas', size: [2, 3, 4], image: 'images/product-4.jpg', description: 'Colorful and comfortable sneakers designed for active kids.', features: ['Vibrant Colors', 'Easy Velcro Straps', 'Non-Slip Sole', 'Durable Construction'] },
    { id: 'p5', name: 'Casual Canvas Shoes', price: 2200, category: 'men', brand: 'bata', size: [8, 9, 10, 11], image: 'images/product-5.jpg', description: 'Trendy canvas shoes perfect for everyday casual wear.', features: ['Canvas Material', 'Breathable', 'Lightweight', 'Versatile Style'] },
    { id: 'p6', name: 'Women\'s Sandals', price: 1800, category: 'women', brand: 'bata', size: [6, 7, 8, 9], image: 'images/product-6.jpg', description: 'Comfortable sandals perfect for summer and warm weather.', features: ['Open Design', 'Comfortable Straps', 'Flat Sole', 'Easy to Wear'] },
    { id: 'p7', name: 'Training Shoes', price: 3800, category: 'sports', brand: 'puma', size: [8, 9, 10], image: 'images/product-7.jpg', description: 'Professional training shoes for intense workouts and gym sessions.', features: ['Ankle Support', 'Grip Sole', 'Breathable', 'Durable'] },
    { id: 'p8', name: 'Formal Oxfords', price: 4500, category: 'men', brand: 'bata', size: [8, 9, 10, 11], image: 'images/product-8.jpg', description: 'Classic oxford shoes perfect for business and formal settings.', features: ['Premium Leather', 'Lace-up Design', 'Polished Finish', 'Professional'] }
];

let selectedSize = null;
let selectedColor = null;

// Load product details
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page content
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `BDT ${product.price}`;
    document.getElementById('originalPrice').textContent = `BDT ${Math.round(product.price * 1.2)}`;
    document.getElementById('discount').textContent = '17% OFF';
    document.getElementById('productDescription').textContent = product.description;
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.image;
    mainImage.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22500%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22500%22 height=%22500%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23666%22%3E' + product.name + '%3C/text%3E%3C/svg%3E';
    };
    
    // Update features
    if (product.features) {
        document.getElementById('productFeatures').innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    }
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Change main image
function changeImage(src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

// Select size
function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Select color
function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Quantity controls
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Add to cart from detail page
function addToCartDetail() {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    
    if (!selectedColor) {
        alert('Please select a color');
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (product) {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        });
    }
}

// Buy now
function buyNow() {
    addToCartDetail();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// Load related products
function loadRelatedProducts(category, currentProductId) {
    const relatedContainer = document.getElementById('relatedProducts');
    if (!relatedContainer) return;
    
    const relatedProducts = products.filter(p => p.category === category && p.id !== currentProductId).slice(0, 4);
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22250%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23666%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">BDT ${product.price}</p>
                <a href="product-detail.html?id=${product.id}" class="btn-secondary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
});
