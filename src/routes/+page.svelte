<script lang="ts">
	import { type ItemKey } from '$lib/types.js';
	import { getSortValue } from '$lib/functions';
	import { PAGE_SIZE } from '$lib/constants.js';
	import { formatNumber, getSortUrl } from '$lib/functions';

	import Pagination from '$lib/components/pagination.svelte';
	import SortIcon from '$lib/components/sort-icon.svelte';

	let { data } = $props();

	let search = $state('');
	let page = $state(1);
	let column = $state<ItemKey>('margin');
	let direction = $state<number>(-1);

	let max = $derived(Math.floor(data.items.length / PAGE_SIZE) + 1);
	let filtered = $derived(data.items
			.filter((item) =>
				search.trim()
					? item.name.toLowerCase().includes(search.toLowerCase())
					: true
			)
			.sort((a, b) => {
				const aVal = getSortValue(a, column);
				const bVal = getSortValue(b, column);

				if (typeof aVal === 'string' && typeof bVal === 'string')
					return aVal.localeCompare(bVal) * direction * -1;

				if (typeof aVal === 'number' && typeof bVal === 'number')
					return (aVal - bVal) * direction;

				return 0;
			})
			.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)); 
	
	function onChangePage(newPage: number){
		page = newPage;
	}

	function onClickSort(current: ItemKey, sortColumn: ItemKey, sortDirection: number){
		if(current != sortColumn){
			column = sortColumn
			direction = -1
		}
		direction = direction * -1
	}
</script>
<header class="p-4">
	<div class="input w-full">
		<label class="label" for="search">Search</label>
		<input id="search" type="text" placeholder="Spade" bind:value={search} />
	</div>
</header>
<div class="overflow-x-auto border border-base-content/5 bg-base-100 mx-4 my-0 rounded-l">
	<table class="table-pin-rows table table-fixed table-zebra">
		<thead>
			<tr>
				<th class="w-6"></th>
				<th class="w-full">
					<button
						onclick={() => onClickSort(column, 'name', direction)}
						class="flex flex-row items-center justify-start gap-2"
					>
						Name
						<SortIcon
							current={column}
							direction={direction}
							column={'name'}
						/>
					</button>
				</th>
				<th class="w-36">
					<button
						onclick={() => onClickSort(column, 'limit', direction)}
						class="flex flex-row items-center justify-start gap-2"
					>
						Buy Limit
						<SortIcon
							current={column}
							direction={direction}
							column={'limit'}
						/>
					</button>
				</th>
				<th class="w-36">
					<button
						onclick={() => onClickSort(column, 'volume', direction)}
						class="flex flex-row items-center justify-start gap-2"
					>
						Volume
						<SortIcon
							current={column}
							direction={direction}
							column={'volume'}
						/>
					</button>
				</th>
				<th class="w-36">
					<button
						onclick={() => onClickSort(column, 'low', direction)}
						class="flex flex-row items-center justify-start gap-2"
					>
						Buy Price
						<SortIcon
							current={column}
							direction={direction}
							column={'low'}
						/>
					</button>
				</th>
				<th class="w-36">
					<button
						onclick={() => onClickSort(column, 'sell', direction)}
						class="flex flex-row items-center justify-start gap-2"
					>
						Sell Price
						<SortIcon
							current={column}
							direction={direction}
							column={'sell'}
						/>
					</button>
				</th>
				<th class="w-36">
					<button
						onclick={() => onClickSort(column, 'margin', direction)}
						class="flex flex-row items-center justify-start gap-2"
					>
						Margin
						<SortIcon
							current={column}
							direction={direction}
							column={'margin'}
						/>
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as item}
				{@const sign = Math.sign(item.latest.margin)}
				<tr>
					<td>
						<div class="grid h-6 w-6 place-items-center">
							<img src={item.icon} alt={item.name} />
						</div>
					</td>
					<td>{item.name}</td>
					<td>{item.limit === 0 ? '?' : formatNumber(item.limit)}</td>
					<td>{formatNumber(item.volume)}</td>
					<td>{formatNumber(item.latest.low)}</td>
					<td>{formatNumber(item.latest.sell)}</td>

					{#if sign === 1}
						<td class="bg-success text-success-content"
							>{formatNumber(item.latest.margin)}</td
						>
					{:else if sign === -1}
						<td class="bg-error text-error-content"
							>{formatNumber(item.latest.margin)}</td
						>
					{:else}
						<td>{formatNumber(item.latest.margin)}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<Pagination {page} {max} onChange={onChangePage}/>
