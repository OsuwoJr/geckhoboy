<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { onMount } from 'svelte';

    let isOpen = false;
    let total = 0;
    let isCheckingOut = false;
    let showSuccess = false;
    let errorMessage = '';

    let formData = {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        stage: '',
        notes: ''
    };

    $: total = cart.getTotal($cart);

    function toggleCart() {
        isOpen = !isOpen;
        if (!isOpen) {
            isCheckingOut = false;
            showSuccess = false;
            errorMessage = '';
        }
    }

    function proceedToCheckout() {
        isCheckingOut = true;
    }

    function updateQuantity(id: string, newQuantity: number) {
        cart.updateQuantity(id, newQuantity);
    }

    function removeItem(id: string) {
        cart.removeItem(id);
    }

    async function handleSubmit() {
        try {
            const orderDetails = $cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            }));

            const response = await fetch('https://formspree.io/f/xbloyloq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    orderDetails,
                    totalAmount: total
                })
            });

            if (response.ok) {
                showSuccess = true;
                cart.clearCart();
                formData = {
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    stage: '',
                    notes: ''
                };
            } else {
                errorMessage = 'Failed to submit order. Please try again.';
            }
        } catch (error) {
            errorMessage = 'An error occurred. Please try again.';
        }
    }

    // Close cart when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.cart-container') && !target.closest('.cart-toggle')) {
            isOpen = false;
            isCheckingOut = false;
            showSuccess = false;
            errorMessage = '';
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<div class="cart-wrapper">
    <button class="cart-toggle" on:click={toggleCart}>
        <i class="fas fa-shopping-cart"></i>
        {#if $cart.length > 0}
            <span class="cart-count">{$cart.length}</span>
        {/if}
    </button>

    {#if isOpen}
        <div class="cart-container">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <button class="close-btn" on:click={() => isOpen = false}>×</button>
            </div>

            {#if $cart.length === 0}
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            {:else if showSuccess}
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h4>Order Placed Successfully!</h4>
                    <p>Thank you for your order. We'll contact you shortly with the next steps.</p>
                    <button class="continue-shopping" on:click={() => isOpen = false}>
                        Continue Shopping
                    </button>
                </div>
            {:else if isCheckingOut}
                <form on:submit|preventDefault={handleSubmit} class="checkout-form">
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" bind:value={formData.name} required />
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" bind:value={formData.email} required />
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone Number *</label>
                            <input type="tel" id="phone" bind:value={formData.phone} required />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="address">Delivery Address *</label>
                        <textarea id="address" bind:value={formData.address} required rows="2"></textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="city">City *</label>
                            <input type="text" id="city" bind:value={formData.city} required />
                        </div>

                        <div class="form-group">
                            <label for="stage">Closest Stage/Stop *</label>
                            <input type="text" id="stage" bind:value={formData.stage} required placeholder="e.g., Muthurwa Stage" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="notes">Order Notes</label>
                        <textarea id="notes" bind:value={formData.notes} rows="2"></textarea>
                    </div>

                    {#if errorMessage}
                        <div class="error-message">
                            {errorMessage}
                        </div>
                    {/if}

                    <div class="order-summary">
                        <h4>Order Summary</h4>
                        <div class="summary-items">
                            {#each $cart as item}
                                <div class="summary-item">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            {/each}
                        </div>
                        <div class="summary-total">
                            <span>Total:</span>
                            <span>KES {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="back-btn" on:click={() => isCheckingOut = false}>
                            Back to Cart
                        </button>
                        <button type="submit" class="submit-btn">
                            Place Order
                        </button>
                    </div>
                </form>
            {:else}
                <div class="cart-items">
                    {#each $cart as item}
                        <div class="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div class="item-details">
                                <h4>{item.name}</h4>
                                <p class="price">KES {item.price.toLocaleString()}</p>
                                <div class="quantity-controls">
                                    <button on:click={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button on:click={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button class="remove-btn" on:click={() => removeItem(item.id)}>×</button>
                        </div>
                    {/each}
                </div>

                <div class="cart-footer">
                    <div class="total">
                        <span>Total:</span>
                        <span class="total-amount">KES {total.toLocaleString()}</span>
                    </div>
                    <button class="checkout-btn" on:click={proceedToCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .cart-wrapper {
        position: relative;
    }

    .cart-toggle {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        position: relative;
        padding: 0.5rem;
    }

    .cart-count {
        position: absolute;
        top: 0;
        right: 0;
        background: #a0b921;
        color: #000;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 50%;
        min-width: 1.5rem;
        text-align: center;
    }

    .cart-container {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 400px;
        height: 100vh;
        background: #000;
        border-left: 1px solid rgba(160, 185, 33, 0.2);
        box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        flex-direction: column;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid rgba(160, 185, 33, 0.2);
    }

    .cart-header h3 {
        margin: 0;
        color: #a0b921;
        font-size: 1.25rem;
    }

    .close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.25rem;
    }

    .empty-cart {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        text-align: center;
        color: #888;
    }

    .empty-cart p {
        font-size: 1.1rem;
        margin: 0;
        color: #a0b921;
    }

    .empty-cart::before {
        content: '\f07a';
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        font-size: 3rem;
        color: #a0b921;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .cart-items {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
    }

    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(160, 185, 33, 0.1);
    }

    .cart-item img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 0.25rem;
    }

    .item-details {
        flex: 1;
    }

    .item-details h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #fff;
    }

    .price {
        color: #a0b921;
        font-weight: bold;
        margin: 0 0 0.5rem 0;
    }

    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .quantity-controls button {
        background: rgba(160, 185, 33, 0.2);
        border: none;
        color: #fff;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quantity-controls button:hover {
        background: rgba(160, 185, 33, 0.3);
    }

    .quantity-controls span {
        color: #fff;
        min-width: 2rem;
        text-align: center;
    }

    .remove-btn {
        background: none;
        border: none;
        color: #888;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem;
    }

    .remove-btn:hover {
        color: #ff4444;
    }

    .cart-footer {
        padding: 1rem;
        border-top: 1px solid rgba(160, 185, 33, 0.2);
    }

    .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        color: #fff;
        font-size: 1.1rem;
    }

    .total-amount {
        color: #a0b921;
        font-weight: bold;
    }

    .checkout-btn {
        width: 100%;
        padding: 0.75rem;
        background: #a0b921;
        color: #000;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
    }

    .checkout-btn:hover {
        background: #8aa31d;
    }

    .checkout-form {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .form-group {
        margin-bottom: 0.5rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
        color: #a0b921;
        font-size: 0.9rem;
    }

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(160, 185, 33, 0.2);
        border-radius: 0.25rem;
        color: #fff;
        font-size: 0.9rem;
    }

    .error-message {
        color: #ff4444;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: rgba(255, 68, 68, 0.1);
        border-radius: 0.25rem;
    }

    .order-summary {
        margin: 0.5rem 0;
        padding: 0.75rem;
        background: rgba(160, 185, 33, 0.1);
        border-radius: 0.5rem;
    }

    .summary-items {
        max-height: 150px;
        overflow-y: auto;
        margin-bottom: 0.5rem;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;
        font-size: 0.85rem;
    }

    .summary-total {
        display: flex;
        justify-content: space-between;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(160, 185, 33, 0.2);
        font-weight: bold;
        font-size: 0.9rem;
    }

    .form-actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.5rem;
        padding: 0.5rem 0;
        background: #000;
        position: sticky;
        bottom: 0;
        z-index: 1;
    }

    .back-btn, .submit-btn {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .back-btn {
        background: rgba(160, 185, 33, 0.2);
        color: #fff;
    }

    .back-btn:hover {
        background: rgba(160, 185, 33, 0.3);
    }

    .submit-btn {
        background: #a0b921;
        color: #000;
    }

    .submit-btn:hover {
        background: #8aa31d;
    }

    .success-message {
        padding: 2rem;
        text-align: center;
        color: #fff;
    }

    .success-message i {
        font-size: 3rem;
        color: #a0b921;
        margin-bottom: 1rem;
    }

    .success-message h4 {
        color: #a0b921;
        margin: 0 0 0.5rem 0;
    }

    .continue-shopping {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        background: #a0b921;
        color: #000;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
    }

    .continue-shopping:hover {
        background: #8aa31d;
    }

    @media (max-width: 768px) {
        .cart-container {
            width: 100%;
            max-width: none;
        }

        .empty-cart {
            padding: 1rem;
        }

        .empty-cart p {
            font-size: 1rem;
        }

        .empty-cart::before {
            font-size: 2.5rem;
        }

        .checkout-form {
            padding: 0.75rem;
        }

        .form-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }

        .form-actions {
            padding: 0.5rem 0;
            background: #000;
        }
    }
</style> 