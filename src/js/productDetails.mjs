import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";

function productTemplate(item) {
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
<!-- discription -->
        <p class="product__description">
          ${item.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
            <!-- add data id -->
          <button id="addToCart" data-id="${item.Id}">Add to Cart</button>
        </div>
      </section>`
}
export async function renderProductPage(elementSelection) {
    const productPage = document.querySelector(elementSelection)
    const productValue = getParam("product")
    const item = await findProductById(productValue)
    productPage.innerHTML += productTemplate(item);

}
