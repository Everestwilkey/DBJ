import ProductList from "./components/ProductList.svelte";
import { mount } from "svelte";
import { renderHeaderFooter } from "./utils.mjs";
import { render } from "svelte/server";

const productList = mount(ProductList, {
  target: document.querySelector(".products"),
  props: { category: "tents" },
});

renderHeaderFooter();
