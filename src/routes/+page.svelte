<!-- Main Page -->
<script lang="ts">
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import Hero from "../components/Hero.svelte";
    import FeaturedProducts from '../components/FeaturedProducts.svelte';
    import MusicReleaseMerch from '../components/MusicReleaseMerch.svelte';
</script>

<Hero />

<main class="container">
    <section id="featured-products" class="featured-section">
        <FeaturedProducts />
    </section>
    <section id="music-release-merch" class="music-release-merch-section">
        <MusicReleaseMerch />
    </section>
</main>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .featured-section {
        padding: 4rem 0;
        scroll-margin-top: 100px; /* This ensures the section is not hidden behind the header when scrolled to */
    }

    .music-release-merch-section {
        padding: 4rem 0;
        scroll-margin-top: 100px; /* This ensures the section is not hidden behind the header when scrolled to */
    }
</style>
  