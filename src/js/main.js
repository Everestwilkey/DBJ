
import { renderHeaderFooter } from "./utils.mjs";
import Categories from "./components/Categories.svelte"
import { mount } from "svelte";
const categories = mount(Categories, {
  target: document.querySelector("#categories")
});

renderHeaderFooter();
