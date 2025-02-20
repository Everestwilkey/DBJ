<script>
    export let product;

    // Check if the ListPrice is greater than FinalPrice to determine if there's a discount
    let hasDiscount = product.ListPrice && product.ListPrice > product.FinalPrice;

    // Calculate the discount percentage if there is a discount
    let discount = hasDiscount
        ? Math.round(((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100)
        : 0;

    // Log the discount to the console for debugging
    console.log(`Product: ${product.Name}, Discount: ${discount}%`);
</script>

<section class="product-card">
    <a href="/product_pages/index.html?product={product.Id}">
        <div class="image-container">
            <img src="{product.Images.PrimarySmall}" alt="{product.Name}" />
            {#if hasDiscount}
                <div class="discount-badge">{discount}% OFF</div>
            {/if}
        </div>
        <h3 class="card__brand">{product.Brand.Name}</h3>
        <h2 class="card__name">{product.NameWithoutBrand}</h2>
        <p class="product-card__price">${product.FinalPrice}</p>
        
        <!-- Show original price if there's a discount -->
        {#if hasDiscount}
            <p class="original-price">Was: <span>${product.ListPrice}</span></p>
        {/if}
    </a>
</section>

<style>
    .product-card {
        position: relative;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
    }

    .image-container {
        position: relative;
    }

    .discount-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: red;
        color: white;
        padding: 5px 10px;
        font-weight: bold;
        font-size: 1rem;
        border-radius: 5px;
        z-index: 10;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add shadow for visibility */
    }

    .original-price {
        text-decoration: line-through;
        color: gray;
        font-size: 0.9rem;
    }

    .product-card__price {
        font-weight: bold;
        color: green;
        font-size: 1.2rem;
    }
</style>
