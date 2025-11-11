<script lang="ts">
	import { type ItemKey } from '$lib/types.js';

	import { settings } from '$lib/stores/settings.js';
	import { balance } from '$lib/stores/ledger.js';

	import { PAGE_SIZE } from '$lib/constants.js';
	import { getSortValue } from '$lib/functions';

	import Pagination from '$lib/components/pagination.svelte';
	import TableHead from './_components/table-head.svelte';
	import Row from './_components/row.svelte';

	let { data } = $props();

	let column = $state<ItemKey>('margin');
	let direction = $state<number>(-1);
	let page = $state(1);

	let search = $state('');
	let isP2P = $state(true);
	let isF2P = $state(true);

	let filtered = $derived(
		data.items
			.filter((item) =>
				search.trim()
					? item.name.toLowerCase().includes(search.toLowerCase())
					: true
			)
			.filter((item) => {
				if (isP2P && isF2P) {
					return true;
				}

				if (isP2P && !isF2P) {
					return item.members === true;
				}

				if (!isP2P && isF2P) {
					return item.members === false;
				}

				return false;
			})
			.filter((item) =>
				$settings.balance && $balance > 0 && $settings.ledger
					? item.latest.low <= $balance
					: true
			)
	);

	let max = $derived(Math.floor(filtered.length / PAGE_SIZE) + 1);
	let paginated = $derived(
		filtered
			.sort((a, b) => {
				const aVal = getSortValue(a, column);
				const bVal = getSortValue(b, column);

				if (typeof aVal === 'string' && typeof bVal === 'string')
					return aVal.localeCompare(bVal) * direction * -1;

				if (typeof aVal === 'number' && typeof bVal === 'number')
					return (aVal - bVal) * direction;

				return 0;
			})
			.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	);

	function onChangePage(newPage: number) {
		page = newPage;
	}

	function onClickSort(current: ItemKey, sortColumn: ItemKey) {
		if (current != sortColumn) {
			column = sortColumn;
			direction = -1;
		}
		direction = direction * -1;
	}
</script>

<svelte:head>
	<title>Items - Bursen</title>
</svelte:head>

<header class="p-4">
	<div class="align-center flex flex-row justify-between gap-4">
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend">Search</legend>
			<div class="input w-full">
				<input
					id="search"
					type="text"
					placeholder="Spade"
					bind:value={search}
					aria-label="Search"
				/>
			</div>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Access</legend>
			<div class="join-horizontal join gap-2">
				<label class="label">
					<input type="checkbox" class="checkbox" bind:checked={isP2P} />
					<span class="text-sm">Members</span>
				</label>

				<label class="label">
					<input type="checkbox" class="checkbox" bind:checked={isF2P} />
					<span class="text-sm">Free to Play</span>
				</label>
			</div>
		</fieldset>
	</div>
</header>
<div class="mx-4 my-0 rounded-l border border-base-content/8 bg-base-100">
	<table class="table table-fixed table-zebra">
		<TableHead {column} {direction} {onClickSort} />
		<tbody>
			{#each paginated as item ('item-' + item.id)}
				<Row {item} />
			{/each}
		</tbody>
	</table>
</div>
<Pagination {page} {max} onChange={onChangePage} />
