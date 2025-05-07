<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export let message: string;
  export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
  export let duration = 3000;
  export let onClose: () => void;
  
  let timeout: number;
  
  onMount(() => {
    if (duration > 0) {
      timeout = setTimeout(() => {
        onClose();
      }, duration);
    }
  });
  
  function handleClose() {
    if (timeout) {
      clearTimeout(timeout);
    }
    onClose();
  }
</script>

<div class="toast" class:success={type === 'success'} class:error={type === 'error'} class:warning={type === 'warning'} transition:fly={{ y: 50, duration: 300 }}>
  <div class="toast-content">
    <i class="toast-icon {type === 'success' ? 'fas fa-check-circle' : type === 'error' ? 'fas fa-times-circle' : type === 'warning' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle'}"></i>
    <span class="toast-message">{message}</span>
  </div>
  <button class="toast-close" on:click={handleClose}>
    <i class="fas fa-times"></i>
  </button>
</div>

<style>
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #1a1a1a;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toast-icon {
  font-size: 1.25rem;
}

.success .toast-icon {
  color: #00ff00;
}

.error .toast-icon {
  color: #ff4444;
}

.warning .toast-icon {
  color: #ffbb33;
}

.toast-message {
  font-size: 0.875rem;
  line-height: 1.5;
}

.toast-close {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.toast-close:hover {
  color: white;
}
</style> 