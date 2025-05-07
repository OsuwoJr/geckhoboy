<script lang="ts">
  import { onMount } from 'svelte';
  import Toast from './Toast.svelte';
  import { toast } from '$lib/stores/toast';

  let unsubscribe: () => void;

  onMount(() => {
    unsubscribe = toast.subscribe(() => {
      // The store already manages the toasts array
      // We just need to subscribe to changes
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
</script>

<div class="toast-container">
  {#each $toast as toastItem (toastItem.id)}
    <Toast
      message={toastItem.message}
      type={toastItem.type}
      duration={toastItem.duration}
      onClose={() => toast.remove(toastItem.id)}
    />
  {/each}
</div>

<style>
.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 50;
}
</style> 