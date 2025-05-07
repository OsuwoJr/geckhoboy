<!-- Layout -->
<script lang="ts">
    import '../app.css';
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import Header from '../components/Header.svelte';
    import Footer from "../components/Footer.svelte";
</script>

<svelte:head>
	<title>GECKHOBOY</title>
	<meta name="description" content="GECKHOBOY - Streetwear and Lifestyle Brand" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Favicon -->
	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	
	<!-- Open Graph / Social Media -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://osvestudios.com/" />
	<meta property="og:title" content="OSVE STUDIOS | Professional Recording Studio" />
	<meta property="og:description" content="Professional recording studio offering music production, mixing, mastering, and audio engineering services." />
	<meta property="og:image" content="https://osvestudios.com/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://osvestudios.com/" />
	<meta name="twitter:title" content="OSVE STUDIOS | Professional Recording Studio" />
	<meta name="twitter:description" content="Professional recording studio offering music production, mixing, mastering, and audio engineering services." />
	<meta name="twitter:image" content="https://osvestudios.com/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://osvestudios.com/" />
	
	<!-- Core Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#00BFFF" />
</svelte:head>

<Header />

<main>
    <slot />
</main>

<Footer />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #000;
        color: #fff;
    }

    main {
        min-height: 100vh;
    }
</style>
