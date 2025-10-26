# Footwear E-Commerce Store

A modern, fully functional e-commerce website for footwear products, built with HTML, CSS, and JavaScript. This project features a complete online shopping experience similar to Bata.com.bd, including product browsing, filtering, cart management, and checkout functionality.

## 🌟 Features

### User-Facing Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Categories**: Browse shoes by Men's, Women's, Kids', and Sports categories
- **Advanced Filtering**: Filter products by category, size, price range, and brand
- **Product Search**: Search functionality to find products quickly
- **Product Details**: Detailed product pages with images, descriptions, and features
- **Shopping Cart**: Add, remove, and update product quantities in cart
- **Order Summary**: Real-time calculation of subtotal, shipping, and taxes
- **Checkout Process**: Complete checkout form with multiple payment options
- **LocalStorage Integration**: Cart persists across browser sessions

### Technical Features
- **Pure JavaScript**: No frameworks or libraries required
- **Modular Code**: Separate JS files for different functionalities
- **Responsive CSS**: Mobile-first responsive design approach
- **SVG Placeholder Images**: Fallback images when product images are unavailable
- **Form Validation**: Client-side form validation for checkout

## 📁 Project Structure

```
footwear-ecommerce-store/
│
├── index.html              # Homepage with featured products and categories
├── products.html           # Products listing page with filters
├── product-detail.html     # Individual product detail page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout and payment page
│
├── css/
│   ├── styles.css         # Main stylesheet with all component styles
│   └── responsive.css     # Responsive design media queries
│
├── js/
│   ├── main.js           # Homepage functionality
│   ├── products.js       # Products page filtering and sorting
│   ├── product-detail.js # Product detail page functionality
│   ├── cart.js           # Shopping cart management
│   └── checkout.js       # Checkout process handling
│
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rejaul24cse-39/footwear-ecommerce-store.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd footwear-ecommerce-store
   ```

3. **Open in a web browser**
   
   **Option A: Direct File Access**
   - Open `index.html` in your browser
   
   **Option B: Using Python HTTP Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then visit `http://localhost:8000` in your browser
   
   **Option C: Using Node.js http-server**
   ```bash
   npx http-server
   ```
   Then visit `http://localhost:8080` in your browser

## 🎯 Usage Guide

### Browsing Products
1. Start on the homepage (`index.html`)
2. Browse featured products or click on category cards
3. Navigate to the Products page to see all available items

### Filtering Products
1. On the Products page, use the sidebar filters
2. Filter by:
   - Category (Men's, Women's, Kids', Sports)
   - Size (6-11)
   - Price Range (Under BDT 2,000 to Above BDT 6,000)
   - Brand (Bata, Nike, Adidas, Puma)
3. Sort products by price or name

### Adding to Cart
1. Click "Add to Cart" on any product card
2. Or visit product detail page for more options:
   - Select size and color
   - Choose quantity
   - Click "Add to Cart" or "Buy Now"

### Checkout Process
1. View cart by clicking the cart icon in header
2. Review items and update quantities if needed
3. Click "Proceed to Checkout"
4. Fill in shipping information
5. Select payment method:
   - Credit/Debit Card
   - bKash
   - Nagad
   - Cash on Delivery
6. Click "Place Order" to complete purchase

## 💡 Key Components

### Shopping Cart System
- Uses browser's localStorage for persistence
- Automatic calculation of totals
- Real-time cart count in header
- Add, remove, and update quantities

### Product Data
The application includes 12 sample products with:
- Product ID
- Name and description
- Price (in BDT)
- Category and brand
- Available sizes
- Product images with fallback SVG placeholders

### Responsive Design
Breakpoints:
- Desktop: > 768px
- Tablet: 768px and below
- Mobile: 480px and below

## 🎨 Customization

### Adding New Products
Edit the `products` array in `js/main.js` and `js/products.js`:

```javascript
{
    id: 'p13',
    name: 'Your Product Name',
    price: 2500,
    category: 'men', // men, women, kids, sports
    brand: 'brand-name',
    size: [8, 9, 10],
    image: 'images/product-13.jpg',
    description: 'Product description here'
}
```

### Styling
Modify `css/styles.css` to change:
- Color scheme (CSS variables in `:root`)
- Typography
- Layout and spacing
- Component styles

### Payment Integration
To integrate real payment gateways:
1. Edit `js/checkout.js`
2. Replace the mock `submitOrder()` function
3. Add your payment gateway API calls

## 🌐 Demo

This is a demonstration project showcasing:
- Modern e-commerce UI/UX design
- Client-side cart management
- Product filtering and search
- Responsive web design
- Clean, maintainable code structure

**Note**: This is a frontend demonstration. No actual payments are processed, and no backend server is required.

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Media Queries
- **JavaScript (ES6+)**: LocalStorage API, DOM manipulation
- **SVG**: Placeholder images

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**rejaul24cse-39**
- GitHub: [@rejaul24cse-39](https://github.com/rejaul24cse-39)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Built with ❤️ for learning and demonstration purposes**
