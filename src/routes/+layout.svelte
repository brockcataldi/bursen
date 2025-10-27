<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import { page } from '$app/state';

	import Drawer from '$lib/components/drawer.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname === '/'}
	{@render children?.()}
{:else}
	<Drawer when={data.when}>
		{@render children?.()}
	</Drawer>
{/if}
