<script lang="ts">
	import { PAGE_SIZE } from '$lib/constants';

	import { settings } from '$lib/stores/settings.js';
	import { balance } from '$lib/stores/ledger.js';

	import Pagination from '$lib/components/pagination.svelte';
	import Pack from './_components/pack.svelte';

	let { data } = $props();

	let page = $state(1);
	let max = $derived(Math.floor(data.sets.length / PAGE_SIZE) + 1);

	let filtered = $derived(
		data.sets
			.filter((set) =>
				$settings.balance && $balance > 0 && $settings.ledger
					? set.cost <= $balance
					: true
			)
			.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	);

	function onChangePage(newPage: number) {
		page = newPage;
	}
</script>

<svelte:head>
	<title>Packing - Bursen</title>
</svelte:head>
<ul class="m-4 join-vertical join">
	{#each filtered as set (`pack-${set.set.id}`)}
		<Pack {set} />
	{/each}
</ul>
<Pagination {page} {max} onChange={onChangePage} />
