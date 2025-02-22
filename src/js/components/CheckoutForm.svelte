<script>
    import { getLocalStorage, formDataToJSON } from "../utils.mjs";
    import { checkout } from "../externalServices.mjs"
    import { onMount } from "svelte";
// props
    let {key = ""} = $props();

    // state var
    let list = $state([]);
    let itemTotal = $state(0);
    let shipping = $state(0);
    let tax = $state(0);
    let orderTotal = $state(0);


    const init = function() {
        list = getLocalStorage(key);
        calculateSummary();
    };

    const calculateSummary = function() {
        const amounts = list.map((item) => item.FinalPrice);
        itemTotal = amounts.reduce((sum, item) => sum + item);
    };
    const calculateOrdertotal = function() {
        shipping = 10 + (list.length - 1) * 2;
        tax = (itemTotal * 0.06).toFixed(2);
        orderTotal = (
            parseFloat(itemTotal) +
            parseFloat(shipping) +
            parseFloat(tax)
        ).toFixed(2);
    };

    function packageItems(items) {
        const simplifiedItems = items.map((item) => { 
            console.log(item);
            return {
                id: item.Id,
                price: item.FinalPrice,
                name: item.Name,
                quantity: 1,
            };
        });
        return simplifiedItems;
    }

    function handleSumbit(e) {
        const json = formDataToJSON(this);
        json.orderData = new Date();
        json.orderTotal = orderTotal;
        json.tax = tax;
        json.shipping = shipping;
        json.items = packageItems(list);
        console.log(json);

    }
    // initial setup
    onMount(init);

</script>

<fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    
    <p>${tax}</p>
    
</fieldset>

