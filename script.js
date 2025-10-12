// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    desc: "High quality sound, long battery life.",
    price: 59.99,
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    desc: "Track fitness, calls, and more.",
    price: 89.99,
    img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    desc: "Portable and waterproof.",
    price: 39.99,
    img: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Fitness Tracker",
    desc: "Monitor your health and activity.",
    price: 29.99,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
  }
];

// Render products
const productList = document.getElementById('product-list');
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}" loading="lazy" />
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
    <div class="price">$${product.price.toFixed(2)}</div>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(card);
});

// Cart logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = `<li>Your cart is empty.</li>`;
    return;
  }
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}
      <button onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">❌</button>
    `;
    cartItems.appendChild(li);
  });
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for shopping with us!');
  cart = [];
  updateCart();
});

updateCart();

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '🌞';
  } else {
    themeToggle.textContent = '🌙';
  }
});
