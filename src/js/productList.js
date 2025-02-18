import ProductList from "./components/ProductList.svelte";
import { mount } from "svelte";
import { getParam, renderHeaderFooter } from "./utils.mjs";

// Get category from URL query parameter

const category = getParam("category");
console.log(category)
console.log("Category from URL:", category); 

console.log("Category from URL:", category); // Debug log

const productList = mount(ProductList, {
    target: document.querySelector("#products"),
    props: { category: category || '' }
});

renderHeaderFooter();