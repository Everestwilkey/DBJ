<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getProductsByCategory } from "../productData.mjs";
    // this is how we make a prop in svelte
    let {category} = $props();
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    let promise = getProductsByCategory(category);

     // Function to limit the results to only 4 tents
     function getTopTents(products) {
        return products.slice(0, 4); // Take only the first 4 items
    }

</script>

<h1>Top products: {category}</h1>

{#await promise}
{:then data} 
    {#if data.length > 0}
        <ul class="product-list">
            {#each getTopTents(data) as product}
                <li class="product-card"><ProductSummary {product} /></li>
            {/each}
        </ul>
        {:else}
        <p>No tents found.</p>
    {/if}
{/await}
