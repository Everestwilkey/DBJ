<script>
    // Import required components and functions
    import ProductSummary from "./ProductSummary.svelte";
    import { getProductsByCategory } from "../productData.mjs";
   
    // Get category from props and initialize reactive state variables
    let {category} = $props();
    let sortBy = $state('name');  
    let promise = getProductsByCategory(category);
    let products = $state([]);  
    let sortedProducts = $derived(sortProducts());

    // Function to limit display to only 4 products
    function getTopTents(products) {
        if (!Array.isArray(products)) return [];
        return products.slice(0, 4);  // Return first 4 items
    }


    // Function to sort products by name or price
    function sortProducts() {
        if (!Array.isArray(products) || products.length === 0) return [];
       
        return [...products].sort((firstProduct, secondProduct) => {
            if (!firstProduct || !secondProduct) return 0;
           
            if (sortBy === 'name') {
                // Sort alphabetically by full product name
                return firstProduct.Name.localeCompare(secondProduct.Name);
            } else if (sortBy === 'price') {
                // Sort numerically by final price
                return firstProduct.FinalPrice - secondProduct.FinalPrice;
            }
            return 0;
        });
    }


    // Initialize products array when data is fetched
    promise.then(data => {
        products = data;
    });
</script>


<!-- Display category title -->
<h1>Top products: {category}</h1>


<!-- Sorting controls -->
<div class="sort-controls">
    <select bind:value={sortBy}>
        <option value="name">Sort by Name (A to Z)</option>
        <option value="price">Sort by Price (Low to High)</option>
    </select>
</div>


<!-- Handle loading, success, and error states -->
{#await promise}
    <p>Loading...</p>
{:then data}
    {#if sortedProducts.length > 0}
        <ul class="product-list">
            {#each getTopTents(sortedProducts) as product}
                <li class="product-card"><ProductSummary {product} /></li>
            {/each}
        </ul>
    {:else}
        <p>No products found.</p>
    {/if}
{:catch error}
    <p>Error loading products: {error.message}</p>
{/await}


<style>
    /* Style for the sorting controls container */
    .sort-controls {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        align-items: center;
        padding: 0.5rem;
        background-color: #f5f5f5;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }


    .sort-controls select {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
        background-color: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }


    .sort-controls select:hover {
        border-color: #999;
    }


    .sort-controls select:focus {
        outline: none;
        border-color: #666;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
    }
</style>

