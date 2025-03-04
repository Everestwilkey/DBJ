
import { renderHeaderFooter } from "./utils.mjs";
import Categories from "./components/Categories.svelte"
import { mount } from "svelte";
const categories = mount(Categories, {
  target: document.querySelector("#categories")
});

renderHeaderFooter();

const inputs = document.querySelectorAll("input");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener("change", handleUpdate));