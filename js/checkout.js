// Checkout Page JavaScript

// Load order items on checkout page
function loadOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    if (!orderItemsContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23ddd%22 width=%2260%22 height=%2260%22/%3E%3C/svg%3E'">
            <div style="flex: 1;">
                <h4 style="margin: 0; font-size: 14px;">${item.name}</h4>
                <p style="margin: 5px 0; font-size: 12px; color: #666;">Qty: ${item.quantity} | Size: ${item.size || 'N/A'}</p>
            </div>
            <p style="font-weight: bold;">BDT ${item.price * item.quantity}</p>
        </div>
    `).join('');
    
    updateCheckoutSummary();
}

// Update checkout summary
function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 100 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;
    
    const elements = {
        checkoutSubtotal: document.getElementById('checkoutSubtotal'),
        checkoutShipping: document.getElementById('checkoutShipping'),
        checkoutTax: document.getElementById('checkoutTax'),
        checkoutTotal: document.getElementById('checkoutTotal')
    };
    
    if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `BDT ${subtotal.toFixed(2)}`;
    if (elements.checkoutShipping) elements.checkoutShipping.textContent = `BDT ${shipping}`;
    if (elements.checkoutTax) elements.checkoutTax.textContent = `BDT ${tax.toFixed(2)}`;
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = `BDT ${total.toFixed(2)}`;
}

// Submit order
function submitOrder(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
    };
    
    // Validate payment details if card is selected
    if (formData.paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !expiry || !cvv) {
            alert('Please fill in all card details');
            return;
        }
    }
    
    // Simulate order processing
    const orderNumber = 'ORD' + Date.now();
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Show success message
    alert(`Order placed successfully!\n\nOrder Number: ${orderNumber}\nTotal Amount: ${document.getElementById('checkoutTotal').textContent}\n\nThank you for your purchase!`);
    
    // Redirect to home
    window.location.href = 'index.html';
}

// Payment method change handler
function handlePaymentMethodChange() {
    const cardDetails = document.getElementById('cardDetails');
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (cardDetails) {
        cardDetails.style.display = selectedMethod === 'card' ? 'block' : 'none';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadOrderItems();
    
    // Add event listeners to payment method radio buttons
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', handlePaymentMethodChange);
    });
    
    handlePaymentMethodChange();
});
