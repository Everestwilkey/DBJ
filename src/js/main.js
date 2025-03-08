import { renderHeaderFooter } from "./utils.mjs";
import Categories from "./components/Categories.svelte"
import { mount } from "svelte";
import RegistrationCTA from "./RegistrationCTA.js";

const categories = mount(Categories, {
  target: document.querySelector("#categories")
});

renderHeaderFooter();

// Initialize the registration CTA
new RegistrationCTA();
