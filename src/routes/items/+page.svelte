<script lang="ts">
	import { resolve } from '$app/paths';

	import { type ItemKey, type Item } from '$lib/types.js';

	import { onClickBuyItem, onClickSellItem } from '$lib/stores/ledger.js';

	import { balance as filterBalance } from '$lib/stores/filters.js';
	import { balance } from '$lib/stores/ledger.js';

	import { PAGE_SIZE } from '$lib/constants.js';
	import { formatValue, getSortValue, formatNumber } from '$lib/functions';

	import Pagination from '$lib/components/pagination.svelte';
	import SortIcon from '$lib/components/sort-icon.svelte';
	import Plus from '$lib/icons/plus.svelte';

	let { data } = $props();

	let search = $state('');
	let column = $state<ItemKey>('margin');
	let direction = $state<number>(-1);
	let page = $state(1);

	let filtered = $derived(
		data.items
			.filter((item) =>
				search.trim()
					? item.name.toLowerCase().includes(search.toLowerCase())
					: true
			)
			.filter((item) =>
				$filterBalance && $balance > 0 ? item.latest.low <= $balance : true
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

<header class="p-4">
	<div class="align-center flex flex-row justify-between gap-4">
		<div class="input w-full">
			<label class="label" for="search">Search</label>
			<input id="search" type="text" placeholder="Spade" bind:value={search} />
		</div>
	</div>
</header>
<div class="mx-4 my-0 rounded-l border border-base-content/8 bg-base-100">
	<table class="table table-fixed table-zebra">
		<thead>
			<tr>
				<th class="w-6"></th>
				<th class="w-full">
					<button
						onclick={() => onClickSort(column, 'name')}
						class="flex w-full flex-row items-center justify-between gap-2"
					>
						<span>Name</span>
						<SortIcon current={column} {direction} column="name" />
					</button>
				</th>
				<th class="w-30">
					<button
						onclick={() => onClickSort(column, 'limit')}
						class="flex w-full flex-row items-center justify-between gap-2 text-right"
					>
						Buy Limit
						<SortIcon current={column} {direction} column="limit" />
					</button>
				</th>
				<th class="w-30">
					<button
						onclick={() => onClickSort(column, 'volume')}
						class="flex w-full flex-row items-center justify-between gap-2 text-right"
					>
						Volume
						<SortIcon current={column} {direction} column="volume" />
					</button>
				</th>
				<th class="w-42">
					<button
						onclick={() => onClickSort(column, 'low')}
						class="flex w-full flex-row items-center justify-between gap-2 text-right"
					>
						Buy Price
						<SortIcon current={column} {direction} column="low" />
					</button>
				</th>
				<th class="w-42">
					<button
						onclick={() => onClickSort(column, 'sell')}
						class="flex w-full flex-row items-center justify-between gap-2 text-right"
					>
						Sell Price
						<SortIcon current={column} {direction} column="sell" />
					</button>
				</th>
				<th class="w-36">
					<button
						onclick={() => onClickSort(column, 'margin')}
						class="flex w-full flex-row items-center justify-between gap-2 text-right"
					>
						Margin
						<SortIcon current={column} {direction} column="margin" />
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each paginated as item (item.id)}
				{@const sign = Math.sign(item.latest.margin)}
				<tr>
					<td>
						<div class="grid h-6 w-6 place-items-center">
							<img src={item.icon} alt={item.name} />
						</div>
					</td>
					<td><a href={resolve(`/items/${item.id}`)}>{item.name}</a></td>
					<td class="text-right">{formatValue(item.limit)}</td>
					<td class="text-right">{formatNumber(item.volume)}</td>
					<td class="text-right">
						<div class="flex flex-row items-center justify-end gap-4">
							<span>{formatNumber(item.latest.low)}</span>
							<button
								class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
								data-tip={`Add ${item.name} Buy to Ledger`}
								onclick={() => onClickBuyItem(item)}
							>
								<Plus />
								<span class="sr-only">Add {item.name} Buy to Ledger</span>
							</button>
						</div>
					</td>
					<td class="text-right">
						<div class="flex flex-row items-center justify-end gap-4">
							<span>{formatNumber(item.latest.sell)}</span>
							<button
								class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
								data-tip={`Add ${item.name} Sell to Ledger`}
								onclick={() => onClickSellItem(item)}
							>
								<Plus />
								<span class="sr-only">Add {item.name} Sell to Ledger</span>
							</button>
						</div>
					</td>
					{#if sign === 1}
						<td class="bg-success text-right text-success-content"
							>{formatNumber(item.latest.margin)}</td
						>
					{:else if sign === -1}
						<td class="bg-error text-right text-error-content"
							>{formatNumber(item.latest.margin)}</td
						>
					{:else}
						<td class="text-right">{formatNumber(item.latest.margin)}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<Pagination {page} {max} onChange={onChangePage} />
