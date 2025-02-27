<script>
    // You can add any necessary logic here
    let subtotal = 0;
    let shipping = "";
    let tax = "";
    let total = "";
  </script>
  
  <div class="checkout-container">
    <h1>Review & Place your Order</h1>
    
    <div class="shipping-section">
      <h2>Shipping</h2>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName">
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input type="text" id="street">
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city">
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <input type="text" id="state">
      </div>
      <div class="form-group">
        <label for="zip">Zip</label>
        <input type="text" id="zip">
      </div>
    </div>
    
    <div class="payment-section">
      <h2>Payment</h2>
      <div class="form-group">
        <label for="cardNumber">Card number</label>
        <input type="text" id="cardNumber">
      </div>
      <div class="form-group">
        <label for="expiration">Expiration</label>
        <input type="text" id="expiration">
      </div>
      <div class="form-group">
        <label for="securityCode">Security Code</label>
        <input type="text" id="securityCode">
      </div>
    </div>
    
    <div class="order-summary">
      <h2>Order Summary</h2>
      <div class="summary-row">
        <span>Item Subtotal(2)</span>
        <span>${subtotal}</span>
      </div>
      <div class="summary-row">
        <span>Shipping Estimate</span>
        <span>{shipping}</span>
      </div>
      <div class="summary-row">
        <span>Tax</span>
        <span>{tax}</span>
      </div>
      <div class="summary-row total">
        <span>Order Total</span>
        <span>{total}</span>
      </div>
    </div>
    
    <button class="checkout-button">Checkout</button>
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
    
    .shipping-section, .payment-section, .order-summary {
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
      background-color: #556B2F;
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