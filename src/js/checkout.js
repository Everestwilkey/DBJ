import { mount } from 'svelte'; // Import mount from svelte.
import CheckoutForm from './components/CheckoutForm.svelte'
mount(CheckoutForm, {
    target: document.querySelector('#checkout'),

});