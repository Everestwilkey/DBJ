<script>
    let {category = '', productCount = 0, productName = ''} = $props();
    
    // Determine what to display based on the props
    let breadcrumbItems = [];
    
    // Always add home
    breadcrumbItems.push({ text: 'Home', href: '/' });
    
    // If we have a category, add it
    if (category) {
        // Convert category slug to display name (e.g., "sleeping-bags" to "Sleeping Bags")
        const displayCategory = category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
        breadcrumbItems.push({
            text: `${displayCategory}${productCount ? ` (${productCount} items)` : ''}`,
            href: `/product_list/index.html?category=${category}`
        });
    }
    
    // If we have a product name, add it
    if (productName) {
        breadcrumbItems.push({ text: productName, href: null });
    }
</script>

{#if breadcrumbItems.length > 1}
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
            {#each breadcrumbItems as item, index}
                <li>
                    {#if item.href && index < breadcrumbItems.length - 1}
                        <a href={item.href}>{item.text}</a>
                        <span class="separator">/</span>
                    {:else}
                        <span class="current">{item.text}</span>
                    {/if}
                </li>
            {/each}
        </ol>
    </nav>
{/if}

<style>
    .breadcrumb {
        padding: 0.5rem 1rem;
        background-color: #f8f9fa;
        border-radius: 0.25rem;
        margin: 1rem 0;
    }

    .breadcrumb ol {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .breadcrumb li {
        display: flex;
        align-items: center;
    }

    .breadcrumb a {
        color: var(--secondary-color);
        text-decoration: none;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .separator {
        margin: 0 0.5rem;
        color: #6c757d;
    }

    .current {
        color: #6c757d;
    }
</style>