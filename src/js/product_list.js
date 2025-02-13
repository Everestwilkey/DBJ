import { products } from "./product_lists";

// Updated Product detail discount
function convertHTML(item) {
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

  return `
      <ul class="product-list">
            <li class="product-card">
                <a href="${item.imgHref}">
                    <img src="${item.imgSrc}" alt="${item.name}" />
                    <h3 class="card__brand">${item.brand}</h3>
                    <h2 class="card__name">${item.name}</h2>

                    <!-- Discount Indicator -->
                    ${discountText}

                    <!-- Display Prices -->
                    <p class="product-card__price">
                        <span class="original-price">$${originalPrice.toFixed(
                          2
                        )}</span>
                        <span class="final-price">$${discountedPrice.toFixed(
                          2
                        )}</span>
                    </p>
                </a>
            </li>
      </ul>
    `;
}

function renderProducts(productList) {
  let template = document.getElementById("products");
  const html = productList.map(convertHTML);
  template.innerHTML = html.join("");
}

renderProducts(products);

function filter(query) {
  function filterFunction(product) {
    return (
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLower().includes(query.toLowerCase)
    );
  }
  const filtered = products.filter(filterFunction);
  return filtered;
}

function searchHandler(e) {
  e.preventDefault();
  const searchElement = document.querySelector("#find-a-product");
  const query = searchElement.value.toLowerCase();
  const filtered = filter(query);
  renderProducts(filtered);
}

document
  .querySelector("#search-button")
  .addEventListener("click", searchHandler);
