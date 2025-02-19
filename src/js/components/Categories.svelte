<script>
   function getCategories() {
       const categories = {
           tents: {
               alt: "Tent Icon from Noun Project: Mustofa Bayu",
               image: "noun_Tent_3544767.svg",
               displayName: "Tents"
           },
           "sleeping-bags": {       // Using hyphen here for correct matching
               alt: "Sleeping Bag Icon from Noun Project: Mustofa Bayu",
               image: "noun_Sleeping Bag_3544775.svg",  // Using hyphen in image name
               displayName: "Sleeping Bags"
           },
           backpacks: {
               alt: "Backpack Icon from Noun Project: Mustofa Bayu",
               image: "/noun_carrier bag_3544771.svg",  // Using hyphen in image name
               displayName: "Back Packs"
           },
           hammocks: {
               alt: "Hammock Icon from Noun Project: Paul Richard",
               image: "noun_Hammock_791143.svg",
               displayName: "Hammocks"
           }
       };
       return Object.entries(categories).map(([name, data]) => ({
           name,
           ...data
       }));
   }

   const categories = getCategories();
</script>

<h2>Categories</h2>
<div class="category-container">
   {#each categories as category}
   <a href="/product_list/index.html?category={category.name}" class="category-item">
           <img src="images/{category.image}" alt={category.alt}>
           <h3>{category.displayName}</h3>
       </a>
   {/each}
</div>

<style>
   h2 {
       text-align: center;
       margin-bottom: 20px;
   }

   .category-container {
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 20px;
       max-width: 1200px;
       margin: 0 auto;
   }

   .category-item {
       flex: 1;
       text-align: center;
       padding: 0 10px;
       text-decoration: none;
       color: inherit;
   }

   .category-item img {
       max-width: 100px;
       height: auto;
       transition: transform 0.2s ease;
   }

   .category-item:hover img {
       transform: scale(1.1);
   }

   h3 {
       margin-top: 10px;
       font-size: 1.1rem;
   }
</style>