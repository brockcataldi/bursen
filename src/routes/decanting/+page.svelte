<script lang="ts">
	import { PAGE_SIZE } from '$lib/constants';

	import { settings } from '$lib/stores/settings.js';
	import { balance } from '$lib/stores/ledger.js';

	import Pagination from '$lib/components/pagination.svelte';
	import Decant from './_components/decant.svelte';

	let { data } = $props();

	let page = $state(1);
	let max = $derived(Math.floor(data.potions.length / PAGE_SIZE) + 1);

	let filtered = $derived(
		data.potions
			.filter((potion) =>
				$settings.balance && $balance > 0 && $settings.ledger
					? potion.inputValue <= $balance
					: true
			)
			.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	);

	function onChangePage(newPage: number) {
		page = newPage;
	}
</script>

<svelte:head>
	<title>Decanting - Bursen</title>
</svelte:head>
<ul class="m-4 join-vertical join">
	{#each filtered as decant (`decant-${decant.id}`)}
		<Decant {decant} />
	{/each}
</ul>
<Pagination {page} {max} onChange={onChangePage} />
