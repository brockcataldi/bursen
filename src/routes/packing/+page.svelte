<script lang="ts">
	import { resolve } from '$app/paths';
	import { PAGE_SIZE } from '$lib/constants';
	import { formatNumber, formatValue } from '$lib/functions';

	import { balance as filterBalance } from '$lib/stores/filters.js';
	import {
		balance,
		onClickBuyItem,
		onClickSellItem,
		onClickBuyItems
	} from '$lib/stores/ledger.js';
	import Pagination from '$lib/components/pagination.svelte';
	import Plus from '$lib/icons/plus.svelte';

	let { data } = $props();

	let page = $state(1);
	let max = $derived(Math.floor(data.sets.length / PAGE_SIZE) + 1);

	let filtered = $derived(
		data.sets
			.filter((set) =>
				$filterBalance && $balance > 0 ? set.cost <= $balance : true
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
	{#each filtered as set (set.set.id)}
		{@const sign = Math.sign(set.margin)}
		{@const color =
			sign === 1
				? 'bg-success text-success-content'
				: sign === -1
					? 'bg-error text-error-content'
					: 'bg-primary text-primary-content'}
		<li
			class="collapse-arrow collapse join-item border border-base-content/8 bg-base-100"
		>
			<input type="checkbox" name="set-{set.set.id}" />
			<div class="collapse-title font-semibold">
				<div class="flex flex-row items-center justify-between gap-2">
					<div class="flex flex-row items-center justify-start gap-2">
						<img src={set.set.icon} alt={set.set.name} />
						<h2>{set.set.name}</h2>
					</div>

					<div class="flex flex-row items-center justify-end gap-2">
						<div>
							<p class="text-xs">Cost</p>
							<div class="badge w-30 justify-start badge-outline">
								{formatNumber(set.cost)}
							</div>
						</div>
						<div>
							<p class="text-xs">Margin</p>
							<div class="badge w-30 justify-start badge-outline {color}">
								{formatNumber(set.margin)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="collapse-content">
				<div class="border border-base-content/8 bg-base-100">
					<table class="table table-fixed table-zebra">
						<thead>
							<tr>
								<th class="w-6"></th>
								<th class="w-full"> Component Name </th>
								<th class="w-36 text-right"> Buy Limit </th>
								<th class="w-36 text-right"> Volume </th>
								<th class="w-36 text-right"> Buy Price </th>
								<th class="w-20 text-right"> </th>
							</tr>
						</thead>
						<tbody>
							{#each set.items as item (item.id)}
								<tr>
									<td>
										<div class="grid h-6 w-6 place-items-center">
											<img src={item.icon} alt={item.name} />
										</div>
									</td>
									<td><a href={resolve(`/items/${item.id}`)}>{item.name}</a></td
									>
									<td class="text-right">{formatValue(item.limit)}</td>
									<td class="text-right">{formatNumber(item.volume)}</td>
									<td class="text-right">
										{formatNumber(item.latest.low)}
									</td>
									<td class="text-right">
										<button
											onclick={() => onClickBuyItem(item)}
											class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
											data-tip={`Add ${item.name} to Ledger`}
										>
											<Plus />
											<span class="sr-only">Add {item.name} to Ledger</span>
										</button>
									</td>
								</tr>
							{/each}
							<tr>
								<td></td>
								<td>Items Cost</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right">
									{formatNumber(set.cost)}
								</td>
								<td class="text-right">
									<button
										onclick={() => onClickBuyItems(set.items)}
										class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
										data-tip="Add Components to Ledger"
									>
										<Plus />
										<span class="sr-only">Add Components to Ledger</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					<hr class="border-base-content/8" />
					<table class="table table-fixed table-zebra">
						<thead>
							<tr>
								<th class="w-6"></th>
								<th class="w-full"> Set </th>
								<th class="w-36 text-right"> Buy Limit </th>
								<th class="w-36 text-right"> Volume </th>
								<th class="w-36 text-right"> Sell Price </th>
								<th class="w-20 text-right"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="grid h-6 w-6 place-items-center">
										<img src={set.set.icon} alt={set.set.name} />
									</div>
								</td>
								<td
									><a href={resolve(`/items/${set.set.id}`)}>{set.set.name}</a
									></td
								>
								<td class="text-right">{formatValue(set.set.limit)}</td>
								<td class="text-right">{formatNumber(set.set.volume)}</td>
								<td class="text-right">
									{formatNumber(set.set.latest.sell)}
								</td>
								<td class="text-right">
									<button
										onclick={() => onClickSellItem(set.set)}
										class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
										data-tip={`Add ${set.set.name} Sell to Ledger`}
									>
										<Plus />
										<span class="sr-only"
											>Add {set.set.name} Sell to Ledger</span
										>
									</button>
								</td>
							</tr>
							<tr>
								<td></td>
								<td class="font-semibold">Difference</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right {color}">{formatNumber(set.margin)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</li>
	{/each}
</ul>
<Pagination {page} {max} onChange={onChangePage} />
