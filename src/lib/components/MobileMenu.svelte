<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  
  export let isOpen = false;
  
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'Services', link: '/services' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ];

  function closeMenu() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="mobile-menu-overlay" transition:fade={{ duration: 200 }} on:click={closeMenu}>
    <nav class="mobile-menu" transition:fly={{ y: -20, duration: 200 }} on:click|stopPropagation>
      <div class="mobile-menu-header">
        <h2 class="mobile-menu-title">Menu</h2>
        <button class="mobile-menu-close" on:click={closeMenu}>
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="mobile-menu-list">
        {#each navItems as item}
          <li class="mobile-menu-item">
            <a
              href={item.link}
              class="mobile-menu-link"
              class:active={$page.url.pathname === item.link}
              on:click={closeMenu}
            >
              {item.name}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<style>
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 100;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: #1a1a1a;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.mobile-menu-close {
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.mobile-menu-close:hover {
  color: white;
}

.mobile-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-menu-item {
  border-bottom: 1px solid rgba(160, 174, 192, 0.1);
}

.mobile-menu-link {
  display: block;
  padding: 1rem 0;
  color: #a0aec0;
  text-decoration: none;
  font-size: 1.125rem;
  transition: color 0.2s ease;
}

.mobile-menu-link:hover {
  color: white;
}

.mobile-menu-link.active {
  color: #00bfff;
}
</style> 