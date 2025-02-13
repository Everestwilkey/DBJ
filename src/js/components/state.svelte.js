import { updateCartCount } from "../cartCount.js";

export const cartState = $state({ count: updateCartCount() });