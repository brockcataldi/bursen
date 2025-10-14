<script lang="ts">
    import Bars4 from '$lib/icons/bars-4.svelte';
	import BarsArrowDown from '$lib/icons/bars-arrow-down.svelte';
	import BarsArrowUp from '$lib/icons/bars-arrow-up.svelte';

    type Props = {
        current: string
        column: string
        direction: number
    }

    let { current, column, direction }: Props = $props();
</script>

{#if current === column}
    {#if direction === 1}
        <BarsArrowUp />
    {:else}
        <BarsArrowDown />
    {/if}
{:else}
    <Bars4 />
{/if}