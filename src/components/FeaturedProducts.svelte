<!-- Featured Products Section -->
<script lang="ts">
    import { cart } from '$lib/stores/cart';

    const products = [
        {
            id: 'classic-tee',
            name: 'GECKHOBOY Classic Tee',
            description: 'Premium quality cotton t-shirt with the iconic GECKHOBOY logo.',
            price: 2500,
            image: '/images/classic-tee-front.jpg',
            backImage: '/images/classic-tee-back.jpg'
        },
        {
            id: 'street-hoodie',
            name: 'Street Style Hoodie',
            description: 'Comfortable and stylish hoodie perfect for any occasion.',
            price: 4500,
            image: '/images/hoodie-front.jpg',
            backImage: '/images/hoodie-back.jpg'
        },
        {
            id: 'urban-cap',
            name: 'Urban Cap',
            description: 'Classic cap with embroidered GECKHOBOY branding.',
            price: 1800,
            image: '/images/cap-front.jpg',
            backImage: '/images/cap-back.jpg'
        }
    ];

    function addToCart(product: typeof products[0]) {
        cart.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }

    // Create a separate flipped state for each product
    let flippedStates = products.reduce((acc, product) => {
        acc[product.id] = false;
        return acc;
    }, {} as Record<string, boolean>);

    function toggleFlip(productId: string, event: MouseEvent | TouchEvent) {
        event.preventDefault();
        event.stopPropagation();
        flippedStates[productId] = !flippedStates[productId];
        flippedStates = flippedStates; // Trigger reactivity
    }
</script>

<section class="featured-products" id="featured-products">
    <div class="container">
        <h2>Featured Products</h2>
        <div class="products-grid">
            {#each products as product}
                <div class="product-card" class:flipped={flippedStates[product.id]}>
                    <div class="product-image-container">
                        <div class="product-image" 
                             on:click={(e) => toggleFlip(product.id, e)}
                             on:touchend={(e) => toggleFlip(product.id, e)}>
                            <div class="front">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div class="back">
                                <img src={product.backImage} alt={`${product.name} back`} />
                            </div>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>{product.name}</h3>
                        <p class="description">{product.description}</p>
                        <p class="price">KES {product.price.toLocaleString()}</p>
                        <button class="add-to-cart" on:click={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .featured-products {
        padding: 4rem 1rem;
        background-color: #000;
        color: #fff;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: #a0b921;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-family: 'Impact', sans-serif;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 1rem;
    }

    .product-card {
        background: rgba(17, 17, 17, 0.8);
        border-radius: 1rem;
        overflow: hidden;
        transition: transform 0.3s ease;
        border: 1px solid rgba(160, 185, 33, 0.1);
    }

    .product-card:hover {
        transform: translateY(-5px);
    }

    .product-image-container {
        position: relative;
        width: 100%;
        perspective: 1000px;
    }

    .product-image {
        position: relative;
        width: 100%;
        height: 300px;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
    }

    .front, .back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        overflow: hidden;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .back {
        transform: rotateY(180deg);
    }

    .front img, .back img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .product-info {
        padding: 1.5rem;
    }

    .product-info h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        color: #fff;
    }

    .description {
        color: #888;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #a0b921;
        margin-bottom: 1rem;
    }

    .add-to-cart {
        width: 100%;
        padding: 0.75rem;
        background-color: #a0b921;
        color: #000;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .add-to-cart:hover {
        background-color: #8aa31d;
    }

    /* Desktop hover effect */
    @media (hover: hover) {
        .product-card:hover .product-image {
            transform: rotateY(180deg);
        }
    }

    /* Touch device support */
    @media (hover: none) {
        .product-card.flipped .product-image {
            transform: rotateY(180deg);
        }
    }

    @media (max-width: 768px) {
        .featured-products {
            padding: 3rem 1rem;
        }

        h2 {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }
</style> 