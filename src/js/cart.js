import { qs, getLocalStorage, setLocalStorage, setClick } from "./utils.mjs";

function removeItem(itemId) {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) return;
  
  // Find the last occurrence of the item to remove
  const index = cartItems.reverse().findIndex(item => item.Id === itemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    cartItems.reverse(); // Restore original order
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

function updateQuantity(itemId, newQuantity) {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) return;

  // Filter items to match the desired quantity
  const updatedCart = cartItems.filter(item => {
    if (item.Id !== itemId) return true;
    const currentQty = cartItems.filter(i => i.Id === itemId).length;
    if (newQuantity === 0) return false;
    return currentQty <= newQuantity;
  });

  // Add items if quantity increased
  const currentQty = updatedCart.filter(item => item.Id === itemId).length;
  if (currentQty < newQuantity) {
    const itemToAdd = cartItems.find(item => item.Id === itemId);
    for (let i = currentQty; i < newQuantity; i++) {
      updatedCart.push({ ...itemToAdd });
    }
  }

  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

function renderCartContents() {
  const totalelement = qs(".cart-footer");
  const totalTextElement = qs(".cart-total");
  const cartItems = getLocalStorage("so-cart");
  const productList = qs(".product-list");

  // Check if cart is empty
  if (!cartItems || cartItems.length === 0) {
    totalelement.classList.add("hidden");
    productList.innerHTML = '<p>Your cart is empty</p>';
    return;
  }

  // Create a map to store unique items and their quantities
  const itemMap = new Map();
  
  // Count quantities for each unique item
  cartItems.forEach((item) => {
    const itemId = item.Id;
    if (itemMap.has(itemId)) {
      itemMap.set(itemId, {
        item: item,
        quantity: itemMap.get(itemId).quantity + 1
      });
    } else {
      itemMap.set(itemId, {
        item: item,
        quantity: 1
      });
    }
    setLocalStorage('so-cart',cartItems)
  });


  // Convert map to array of unique items with quantities
  const uniqueItems = Array.from(itemMap.values());
  
  // Generate HTML for each unique item
  const htmlItems = uniqueItems.map((itemData) => 
    cartItemTemplate(itemData.item, itemData.quantity)
  );

  // Calculate and display total
  let total = setcartTotal(cartItems);
  totalTextElement.innerText = `Total: $${total.toFixed(2)}`;
  
  // Update DOM
  productList.innerHTML = htmlItems.join("");
  totalelement.classList.remove("hidden");

  // Add event listeners to quantity controls
  addQuantityListeners();
}

function addQuantityListeners() {
  const quantityControls = document.querySelectorAll('.quantity-controls');
  quantityControls.forEach(control => {
    const itemId = control.dataset.itemId;
    const decreaseBtn = control.querySelector('.decrease-quantity');
    const increaseBtn = control.querySelector('.increase-quantity');
    const quantityDisplay = control.querySelector('.cart-card__quantity');
    const removeBtn = control.querySelector('.remove-item');

    decreaseBtn.addEventListener('touchend', (event) => {
      event.preventDefault();
      const currentQty = parseInt(quantityDisplay.textContent);
      if (currentQty > 1) {
        updateQuantity(itemId, currentQty - 1);
      }
    });
    decreaseBtn.addEventListener('click', () => {
      const currentQty = parseInt(quantityDisplay.textContent);
      if (currentQty > 1) {
        updateQuantity(itemId, currentQty - 1);
      }
    });

    increaseBtn.addEventListener('touchend', (event) => {
      event.preventDefault();
      const currentQty = parseInt(quantityDisplay.textContent);
      updateQuantity(itemId, currentQty + 1);
    });
    increaseBtn.addEventListener('click', () => {
      const currentQty = parseInt(quantityDisplay.textContent);
      updateQuantity(itemId, currentQty + 1);
    });

    removeBtn.addEventListener('touchend', (event) => {
      event.preventDefault();
      removeItem(itemId);
    });
    removeBtn.addEventListener('click', () => {
      removeItem(itemId);
    });
  });
}

function cartItemTemplate(item, quantity) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="quantity-controls" data-item-id="${item.Id}">
      <button class="decrease-quantity">-</button>
      <span class="cart-card__quantity">${quantity}</span>
      <button class="increase-quantity">+</button>
      <button class="remove-item">Remove</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
  return newItem;
}

export function setcartTotal(products) {
  const total = products.reduce((sum, product) => 
    sum + parseFloat(product.ListPrice), 0
  );
  console.log("Cart Total:", total);
  return total;
}



renderCartContents();