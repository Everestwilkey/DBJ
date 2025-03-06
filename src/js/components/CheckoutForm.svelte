<script>
  import { getLocalStorage } from "../utils.mjs";

  function getCartTotal(products) {
    const value = products.reduce(
      (sum, product) => sum + parseFloat(product.ListPrice),
      0,
    );
    return value;
  }

  let fname = $state();
  let lname = $state();
  let street = $state();
  let city = $state();
  let state = $state();
  let zip = $state();
  let subtotal = $state(0);
  let shipping = $state(0);
  let cardNumber = $state();
  let cardExpiration = $state();
  let cardCode = $state();
  let tax = $state(0);
  let total = $state(0);
  let cartItems = getLocalStorage("so-cart");
  let totalbefortax = getCartTotal(cartItems);

  console.log(totalbefortax);
  console.log(cartItems);
  console.log("Cart Total:", total);

  function ShippingCost(itemQuantity) {
    if (itemQuantity) {
      shipping = 10 + (itemQuantity - 1) * 2;
    }
  }

  function calculateItemSummary(cost) {
    let taxPercent = 0.06;
    console.log(taxPercent);
    let totalTax = cost * taxPercent;
    console.log(totalTax);
    return totalTax;
  }
  function init() {
    ShippingCost(cartItems.length);
    tax = calculateItemSummary(totalbefortax);
    total = totalbefortax + tax;
  }
  init();
  async function handleSubmit() {
    let url = "http://server-nodejs.cit.byui.edu:3000/checkout";
    let now = new Date();
    const currentTime = now.toLocaleTimeString();
    try {
      const options = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderDate: currentTime,
          fname: fname,
          lname: lname,
          street: street,
          city: city,
          state: state,
          zip: zip,
          cardNumber: "123412341234123",
          expiration: cardExpiration,
          code: cardCode,
          items: cartItems,
        }),
      };
      console.log(options);
      let response = await fetch(url, options);
      if (response.status != 200) {
        const error = await response.json();
        let message = JSON.stringify(error);
        console.log(message.split(","));
      }
    } catch (error) {
      alert(error.message);
    }
  }
</script>

<div class="checkout-container">
  <h1>Review & Place your Order</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="shipping-section">
      <h2>Shipping</h2>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" bind:value={fname} required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" bind:value={lname} required />
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input type="text" id="street" bind:value={street} required />
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city" bind:value={city} required />
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <input type="text" id="state" bind:value={state} required />
      </div>
      <div class="form-group">
        <label for="zip">Zip</label>
        <input type="text" id="zip" bind:value={zip} required />
      </div>
    </div>

    <div class="payment-section">
      <h2>Payment</h2>
      <div class="form-group">
        <label for="cardNumber">Card number</label>
        <input type="text" id="cardNumber" bind:value={cardNumber} />
      </div>
      <div class="form-group">
        <label for="expiration">Expiration</label>
        <input
          type="text"
          id="expiration"
          bind:value={cardExpiration}
          placeholder="MM/YY"
          required
        />
      </div>
      <div class="form-group">
        <label for="securityCode">Security Code</label>
        <input type="text" id="securityCode" bind:value={cardCode} required />
      </div>
    </div>

    <div class="order-summary">
      <h2>Order Summary</h2>
      <div id="items-summary">
        {#each cartItems as item}
          <div class="summary-row">
            <span>{item.NameWithoutBrand} (x {item.quantity})</span>
            <span>${parseInt(item.FinalPrice)}</span>
          </div>
        {/each}
      </div>
      <div class="summary-row">
        <span>Item Subtotal</span>
        <span>${totalbefortax.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping Estimate</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Order Total</span>

        <span>${total.toFixed(2)}</span>
      </div>
    </div>

    <button type="submit" class="checkout-button">Checkout</button>
  </form>
</div>

<style>
  .checkout-container {
    max-width: 500px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 15px;
  }

  .shipping-section,
  .payment-section,
  .order-summary {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 15px;
    position: relative;
  }

  .form-group {
    margin-bottom: 12px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .total {
    font-weight: bold;
    margin-top: 15px;
  }

  .checkout-button {
    background-color: #556b2f;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    text-align: center;
  }
</style>
