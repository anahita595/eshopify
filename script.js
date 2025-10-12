// Cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Products array (starts empty)
let products = JSON.parse(localStorage.getItem('products')) || [];

// Update cart count
function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

// Add product dynamically
function addProduct() {
  const name = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const image = document.getElementById('productImage').value.trim();

  if(!name || isNaN(price) || !image) {
    alert("Please fill all fields correctly!");
    return;
  }

  const product = {name, price, image};
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = '';
}

// Display products
function displayProducts() {
  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  products.forEach((product) => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}',${product.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// Add to cart
function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

// Clear cart
function clearCart() {
  if(confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("Cart cleared!");
  }
}

// Initialize
updateCartCount();
displayProducts();

