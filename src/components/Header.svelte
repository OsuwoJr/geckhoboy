<script lang="ts">
  import { page } from '$app/stores';
  import Cart from './Cart.svelte';

  let isMenuOpen = false;
  
  const platforms = [
    { 
      name: 'YouTube',
      href: 'https://youtube.com/@geckhoboy',
      icon: 'fab fa-youtube',
      color: '#FF0000',
      hoverColor: '#cc0000'
    },
    { 
      name: 'Spotify',
      href: 'https://open.spotify.com/artist/659wAEZkJXFdNQ1vHK9ZJa?si=kVwc73oXTfmTB-hz0UWgYA',
      icon: 'fab fa-spotify',
      color: '#1DB954',
      hoverColor: '#1ed760'
    },
    { 
      name: 'Apple Music',
      href: 'https://music.apple.com/us/artist/geckhoboy/1810874244',
      icon: 'fab fa-apple',
      color: '#FB2D3F',
      hoverColor: '#ff1a1a'
    },
    { 
      name: 'Boomplay',
      href: 'https://www.boomplay.com/search/default/geckhoboy',
      icon: 'fas fa-music',
      color: '#00C2FF',
      hoverColor: '#00a8e0'
    }
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="header">
  <div class="header-content">
    <a href="/" class="logo">GECKHOBOY</a>
    
    <nav class="nav-desktop">
      {#each platforms as platform}
        <a 
          href={platform.href}
          class="platform-link"
          target="_blank"
          rel="noopener noreferrer"
          style="--platform-color: {platform.color}; --platform-hover-color: {platform.hoverColor}"
        >
          <i class="{platform.icon}"></i>
          <span class="platform-name">{platform.name}</span>
        </a>
      {/each}
    </nav>

    <div class="header-right">
      <Cart />
      <button class="menu-button" on:click={toggleMenu} aria-label="Toggle menu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="mobile-menu">
      {#each platforms as platform}
        <a 
          href={platform.href}
          class="mobile-link"
          target="_blank"
          rel="noopener noreferrer"
          style="--platform-color: {platform.color}; --platform-hover-color: {platform.hoverColor}"
          on:click={toggleMenu}
        >
          <i class="{platform.icon}"></i>
          <span>{platform.name}</span>
        </a>
      {/each}
    </div>
  {/if}
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #000000;
    z-index: 1000;
    border-bottom: 1px solid #333333;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #ffffff;
    z-index: 1001;
    padding: 0.5rem;
  }

  .nav-desktop {
    display: none;
  }

  .platform-link {
    text-decoration: none;
    color: var(--platform-color);
    padding: 0.5rem 1rem;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .platform-link:hover {
    color: var(--platform-hover-color);
  }

  .platform-name {
    display: none;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: flex-end;
    z-index: 1001;
  }

  .menu-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .menu-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    padding: 5rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }

  .mobile-link {
    text-decoration: none;
    color: var(--platform-color);
    padding: 1rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
  }

  .mobile-link:hover {
    color: var(--platform-hover-color);
    background: rgba(255, 255, 255, 0.1);
  }

  .mobile-link i {
    font-size: 1.5rem;
    width: 24px;
    text-align: center;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    .header-content {
      padding: 1rem 2rem;
      gap: 2rem;
    }

    .nav-desktop {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center;
    }

    .platform-name {
      display: inline;
    }

    .menu-button {
      display: none;
    }

    .mobile-menu {
      display: none;
    }
  }
</style>
