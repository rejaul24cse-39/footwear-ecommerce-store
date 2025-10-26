// Shopping Cart Management

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: product.size || 'N/A',
            color: product.color || 'N/A',
            quantity: product.quantity || 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCartItems();
}

// Update item quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCartItems();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculate cart totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 100 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
}

// Display cart items on cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Size: ${item.size} | Color: ${item.color}</p>
                <p class="item-price">BDT ${item.price}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)" min="1">
                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="btn-secondary" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const totals = calculateTotals();
    
    const elements = {
        subtotal: document.getElementById('subtotal'),
        shipping: document.getElementById('shipping'),
        tax: document.getElementById('tax'),
        total: document.getElementById('total'),
        checkoutSubtotal: document.getElementById('checkoutSubtotal'),
        checkoutShipping: document.getElementById('checkoutShipping'),
        checkoutTax: document.getElementById('checkoutTax'),
        checkoutTotal: document.getElementById('checkoutTotal')
    };
    
    if (elements.subtotal) elements.subtotal.textContent = `BDT ${totals.subtotal.toFixed(2)}`;
    if (elements.shipping) elements.shipping.textContent = `BDT ${totals.shipping}`;
    if (elements.tax) elements.tax.textContent = `BDT ${totals.tax.toFixed(2)}`;
    if (elements.total) elements.total.textContent = `BDT ${totals.total.toFixed(2)}`;
    if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `BDT ${totals.subtotal.toFixed(2)}`;
    if (elements.checkoutShipping) elements.checkoutShipping.textContent = `BDT ${totals.shipping}`;
    if (elements.checkoutTax) elements.checkoutTax.textContent = `BDT ${totals.tax.toFixed(2)}`;
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = `BDT ${totals.total.toFixed(2)}`;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value;
    if (promoCode.toUpperCase() === 'SAVE10') {
        alert('Promo code applied! 10% discount.');
        // Implement discount logic here
    } else {
        alert('Invalid promo code.');
    }
}

// Show notification
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #27ae60; color: white; padding: 15px 25px; border-radius: 4px; z-index: 1000;';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        updateCartCount();
        if (document.getElementById('cartItems')) {
            displayCartItems();
        }
    });
} else {
    updateCartCount();
    if (document.getElementById('cartItems')) {
        displayCartItems();
    }
}
