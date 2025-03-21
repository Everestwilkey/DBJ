import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";

function productTemplate(item) {
  // Check if there's a discount
  let hasDiscount =
    item.SuggestedRetailPrice && item.SuggestedRetailPrice > item.FinalPrice;
  let discount = hasDiscount
    ? Math.round(
        ((item.SuggestedRetailPrice - item.FinalPrice) /
          item.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `<section class="product-detail">
        <!-- this is the title -->
        <h3>${item.Brand.Name}</h3> 
        <!-- this is the name -->
        <h2 class="divider">${item.Name}</h2>
        
        <div class="product-img-container">
        <!-- this is the tent image -->
        <img class="divider" src="${item.Images.PrimaryLarge}" alt="${
    item.NameWithoutBrand
  }" />
  ${hasDiscount ? `<span class="discountd-badge">${discount}% OFF</span>` : ""}
   </div>     
        <!-- this is the price -->
        <div class="product-card__price">
        <p class="final-price">Now: $${item.FinalPrice}</p> 
        ${
          hasDiscount
            ? `<span class="original-price">Was:<s>$${item.SuggestedRetailPrice}</s></span>`
            : ""
        } 
        
       
        </div>
        
        
        <!-- product product__color -->
        <p class="product__color">${item.Colors[0]?.ColorName}</p>
        
        <!-- description -->
        <p class="product__description">${item.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
            <!-- add data id -->
          <button id="addToCart" data-id="${item.Id}">Add to Cart</button>
        </div>
      </section>`;
}

export async function renderProductPage(elementSelection) {
  // Select the element where the product page content should go
  const productPage = document.querySelector(elementSelection);
  // Get the product ID from the URL parameters
  const productValue = getParam("product");

  try {
    // Attempt to fetch the product details
    const item = await findProductById(productValue);
    console.log(item);
    // If product exists, render the product template
    productPage.innerHTML += productTemplate(item);
  } catch (error) {
    // Log the error message in the console
    console.error(error.message);
    productPage.innerHTML = `<div class ="error-message">
                <h2> Product Not Found</h2> 
                <p> Sorry, the product you are looking for does not exist.</p>
                <a href="/" class= "btn btn-primary"> Return to Home</a>
                </div>
                `;
  }
}
