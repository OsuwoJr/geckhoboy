<!-- Music Release Merchandise Section -->
<script lang="ts">
    import { cart } from '$lib/stores/cart';

    const musicReleases = [
        {
            id: 1,
            title: "Miles Apart",
            releaseType: "Single",
            releaseDate: "2025",
            items: [
                {
                    id: "ma-1",
                    name: "Miles Apart Classic Tee",
                    price: 2500,
                    image: "/images/ma-tee-1.jpg",
                    backImage: "/images/ma-tee-1-back.jpg",
                    description: "Premium cotton t-shirt featuring Miles Apart artwork"
                },
                {
                    id: "ma-2",
                    name: "Miles Apart Graphic Tee",
                    price: 2800,
                    image: "/images/ma-tee-2.jpg",
                    backImage: "/images/ma-tee-2-back.jpg",
                    description: "Limited edition graphic t-shirt with exclusive design"
                },
                {
                    id: "ma-3",
                    name: "Miles Apart Deluxe Tee",
                    price: 3000,
                    image: "/images/ma-tee-3.jpg",
                    backImage: "/images/ma-tee-3-back.jpg",
                    description: "Premium deluxe edition with special packaging"
                },
                {
                    id: "ma-art",
                    name: "Miles Apart Framed Art",
                    price: 4500,
                    image: "/images/ma-art.jpg",
                    backImage: "/images/ma-art-back.jpg",
                    description: "High-quality framed album artwork"
                }
            ]
        },
        {
            id: 2,
            title: "I Wish I Knew",
            releaseType: "Single",
            releaseDate: "2025",
            items: [
                {
                    id: "iwik-1",
                    name: "I Wish I Knew Classic Tee",
                    price: 2500,
                    image: "/images/iwik-tee-1.jpg",
                    backImage: "/images/iwik-tee-1-back.jpg",
                    description: "Premium cotton t-shirt featuring I Wish I Knew artwork"
                },
                {
                    id: "iwik-2",
                    name: "I Wish I Knew Graphic Tee",
                    price: 2800,
                    image: "/images/iwik-tee-2.jpg",
                    backImage: "/images/iwik-tee-2-back.jpg",
                    description: "Limited edition graphic t-shirt with exclusive design"
                },
                {
                    id: "iwik-3",
                    name: "I Wish I Knew Deluxe Tee",
                    price: 3000,
                    image: "/images/iwik-tee-3.jpg",
                    backImage: "/images/iwik-tee-3-back.jpg",
                    description: "Premium deluxe edition with special packaging"
                },
                {
                    id: "iwik-art",
                    name: "I Wish I Knew Framed Art",
                    price: 4500,
                    image: "/images/iwik-art.jpg",
                    backImage: "/images/iwik-art-back.jpg",
                    description: "High-quality framed album artwork"
                }
            ]
        }
    ];

    function addToCart(item: typeof musicReleases[0]['items'][0]) {
        cart.addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    // Create a separate flipped state for each item
    let flippedStates = new Map<string, boolean>();

    function toggleFlip(itemId: string, event: MouseEvent | TouchEvent) {
        event.preventDefault();
        event.stopPropagation();
        flippedStates.set(itemId, !flippedStates.get(itemId));
        flippedStates = flippedStates; // Trigger reactivity
    }
</script>

<section class="music-release-merch" id="music-release-merch">
    <div class="container">
        <h2>Music Release Merchandise</h2>
        {#each musicReleases as release}
            <div class="release-section">
                <div class="release-header">
                    <h3>{release.title}</h3>
                    <p class="release-info">{release.releaseType} • {release.releaseDate}</p>
                </div>
                <div class="products-grid">
                    {#each release.items as item}
                        <div class="product-card" class:flipped={flippedStates.get(item.id)}>
                            <div class="product-image-container">
                                <div class="product-image" 
                                     on:click={(e) => toggleFlip(item.id, e)}
                                     on:touchend={(e) => toggleFlip(item.id, e)}>
                                    <div class="front">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div class="back">
                                        <img src={item.backImage} alt={`${item.name} back`} />
                                    </div>
                                </div>
                            </div>
                            <div class="product-info">
                                <h4>{item.name}</h4>
                                <p class="description">{item.description}</p>
                                <p class="price">KES {item.price.toLocaleString()}</p>
                                <button class="add-to-cart" on:click={() => addToCart(item)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .music-release-merch {
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

    .release-section {
        margin-bottom: 4rem;
    }

    .release-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .release-header h3 {
        font-size: 2rem;
        color: #fff;
        margin-bottom: 0.5rem;
    }

    .release-info {
        color: #a0b921;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
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

    .product-info {
        padding: 1.5rem;
    }

    .product-info h4 {
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

    @media (max-width: 768px) {
        .music-release-merch {
            padding: 3rem 1rem;
        }

        h2 {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        .release-header h3 {
            font-size: 1.75rem;
        }

        .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }
</style> 