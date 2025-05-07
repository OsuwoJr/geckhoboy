<script lang="ts">
  export let size = 'medium';
  export let color = '#00bfff';
</script>

<div class="spinner" class:small={size === 'small'} class:large={size === 'large'}>
  <div class="spinner-inner" style="border-color: {color} transparent {color} transparent;"></div>
</div>

<style>
.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  position: relative;
}

.spinner-inner {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid;
  border-radius: 50%;
  animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.small {
  width: 1rem;
  height: 1rem;
}

.small .spinner-inner {
  border-width: 2px;
}

.large {
  width: 3rem;
  height: 3rem;
}

.large .spinner-inner {
  border-width: 4px;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 