import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";

function productTemplate(item) {
  // Ensure ListPrice is available
  const originalPrice = parseFloat(item.ListPrice);
  const discountedPrice = parseFloat(item.FinalPrice);

  let discountText = "";

  if (originalPrice > discountedPrice) {
    const discountAmount = originalPrice - discountedPrice;
    const discountPercentage = ((discountAmount / originalPrice) * 100).toFixed(
      0
    );

    discountText = `
       <p class="discount-label">Save ${discountPercentage}% - You save $${discountAmount.toFixed(
      2
    )}</p>
     `;
  }

  return `<section class="product-detail">
        <!-- this is the title -->
        <h3>${item.Brand.Name}</h3> 
        <!-- this is the name -->
        <h2 class="divider">${item.Name}</h2>
<!-- this this the tent image -->
        <img
          class="divider"
         
          src="${item.Image}"
          alt="${item.NameWithoutBrand}"
        />
<!-- this is the price -->
        <p class="product-card__price">${item.FinalPrice}</p>
<!-- product product__color -->
        <p class="product__color">${item.Colors[0]?.ColorName}</p>
<!-- description -->
        <p class="product__description">
          ${item.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
            <!-- add data id -->
          <button id="addToCart" data-id="${item.Id}">Add to Cart</button>
        </div>
      </section>`;
}
export async function renderProductPage(elementSelection) {
  const productPage = document.querySelector(elementSelection);
  const productValue = getParam("product");

  try {
    const item = await findProductById(productValue);

    // Debugging: Log fetched product details
    console.log("Fetched Product Data:", item);

    if (item.ListPrice === undefined || item.FinalPrice === undefined) {
      console.warn("ListPrice or FinalPrice is missing in product data!");
    }

    productPage.innerHTML += productTemplate(item);
  } catch (error) {
    console.error(error.message);
    productPage.innerHTML = `<div class="error-message">
                <h2> Product Not Found</h2> 
                <p> Sorry, the product you are looking for does not exist.</p>
                <a href="/" class="btn btn-primary"> Return to Home</a>
                </div>`;
  }
}
