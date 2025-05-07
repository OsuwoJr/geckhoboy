<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import Button from './Button.svelte';
    
    let heroElement: HTMLElement;
    
    onMount(() => {
        // Add any initialization logic here
    });

    function scrollToFeaturedProducts() {
        const featuredSection = document.getElementById('featured-products');
        if (featuredSection) {
            const yOffset = -100; // Offset to account for header height
            const y = featuredSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    }

    function navigateToBooking() {
        goto('/booking');
    }
</script>

<section 
    class="hero" 
    bind:this={heroElement}
    role="banner"
    aria-label="Hero section"
>
    <div class="hero-content">
        <h1>
            <span class="slogan">It's</span>
            <span class="brand">GECKHOBOY</span>
        </h1>
        <div class="cta-buttons">
            <Button text="Explore Merch" variant="primary" size="lg" onClick={scrollToFeaturedProducts} />
            <Button text="Book Now" variant="secondary" size="lg" onClick={navigateToBooking} />
        </div>
    </div>
    <div class="hero-background">
        <div class="gradient-overlay"></div>
        <div class="noise-overlay"></div>
    </div>
</section>

<!-- This empty div serves as a scroll target -->
<div id="content-start" class="h-0 w-full"></div>

<style>
.hero {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    background: url('/images/hero-bg.svg') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
}

h1 {
    font-size: clamp(3rem, 15vw, 8rem);
    line-height: 1;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.slogan {
    font-family: 'Brush Script MT', cursive;
    color: #ff0000;
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    transform: rotate(-5deg);
}

.brand {
    font-family: 'Impact', sans-serif;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow: 
        2px 2px 0 #000,
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000;
}



.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0, 191, 255, 0.1) 0%, transparent 70%);
}

.noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.05;
}

@media (max-width: 768px) {
    .hero {
        min-height: 500px;
    }
    
    h1 {
        font-size: clamp(2.5rem, 12vw, 6rem);
    }

    

    .cta-buttons {
        flex-direction: column;
    }

    .cta-buttons :global(.button) {
        width: 100%;
        max-width: 300px;
    }
}
</style>
