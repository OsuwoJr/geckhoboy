<script lang="ts">
    export let text: string;
    export let href: string | undefined = undefined;
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let variant: 'primary' | 'secondary' = 'primary';
    export let size: 'sm' | 'md' | 'lg' = 'md';
    export let fullWidth = false;
    export let disabled = false;
    export let onClick: (() => void) | undefined = undefined;
</script>

{#if href}
    <a 
        {href}
        class="button {variant} {size}"
        class:full-width={fullWidth}
        class:disabled
        on:click|preventDefault={disabled ? undefined : () => {}}
    >
        <span class="button-text">{text}</span>
    </a>
{:else}
    <button
        {type}
        class="button {variant} {size}"
        class:full-width={fullWidth}
        {disabled}
        on:click={onClick}
    >
        <span class="button-text">{text}</span>
    </button>
{/if}

<style>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    outline: none;
    text-decoration: none;
}

.button-text {
    color: inherit;
    white-space: nowrap;
}

/* Primary Button */
.primary {
    background-color: #a0b921;
    color: white;
}

.primary:hover:not(.disabled) {
    background-color: #8aa31d;
    transform: translateY(-1px);
}

/* Secondary Button */
.secondary {
    background-color: transparent;
    color: #a0b921;
    border: 2px solid #a0b921;
}

.secondary:hover:not(.disabled) {
    background-color: #a0b921;
    color: white;
    transform: translateY(-1px);
}

/* Size Variants */
.sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
}

.lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
}

/* Full Width */
.full-width {
    width: 100%;
}

/* Disabled State */
.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.button:focus {
    outline: 2px solid #a0b921;
    outline-offset: 2px;
}

@media (hover: none) {
    .button:hover:not(.disabled) {
        transform: none;
    }
}
</style>
