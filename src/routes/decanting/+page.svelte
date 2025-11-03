<script lang="ts">
	import { resolve } from '$app/paths';
	import { PAGE_SIZE } from '$lib/constants';
	import { formatNumber, formatValue } from '$lib/functions';

	import { balance as filterBalance } from '$lib/stores/filters.js';
	import {
		balance,
		onClickBuyItem,
		onClickBuyItems,
		onClickSellItem,
		onClickSellItems
	} from '$lib/stores/ledger.js';

	import Pagination from '$lib/components/pagination.svelte';
	import Plus from '$lib/icons/plus.svelte';

	let { data } = $props();

	let page = $state(1);
	let max = $derived(Math.floor(data.potions.length / PAGE_SIZE) + 1);

	let filtered = $derived(
		data.potions
			.filter((potion) =>
				$filterBalance && $balance > 0 ? potion.inputValue <= $balance : true
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
	{#each filtered as potion (potion.id)}
		{@const sign = Math.sign(potion.margin)}
		{@const color =
			sign === 1
				? 'bg-success text-success-content'
				: sign === -1
					? 'bg-error text-error-content'
					: 'bg-primary text-primary-content'}
		<li
			class="collapse-arrow collapse join-item border border-base-content/8 bg-base-100"
		>
			<input type="checkbox" name="potion-{potion.id}" />
			<div class="collapse-title font-semibold">
				<div class="flex flex-row items-center justify-between gap-2">
					<div class="flex flex-row items-center justify-start gap-2">
						<h2 class="flex flex-row items-center justify-start gap-2">
							{potion.label}
							<img
								src={potion.fromIcon}
								alt={`${potion.label} (${potion.from})`}
								class="tooltip tooltip-bottom h-6 w-6 object-contain"
								data-tip={`${potion.label} (${potion.from})`}
							/>
							to
							<img
								src={potion.toIcon}
								alt={`${potion.label} (${potion.to})`}
								class="tooltip tooltip-bottom h-6 w-6 object-contain"
								data-tip={`${potion.label} (${potion.to})`}
							/>
						</h2>
					</div>
					<div class="flex flex-row items-center justify-end gap-2">
						<div>
							<p class="text-xs">Cost</p>
							<div class="badge w-30 justify-start badge-outline">
								{formatNumber(potion.inputValue)}
							</div>
						</div>
						<div>
							<p class="text-xs">Margin</p>
							<div class="badge w-30 justify-start badge-outline {color}">
								{formatNumber(potion.margin)}
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
								<th class="w-full"> Name </th>
								<th class="w-36 text-right"> Buy Limit </th>
								<th class="w-36 text-right"> Volume </th>
								<th class="w-36 text-right"> Buy Price </th>
								<th class="w-36 text-right"> Count </th>
								<th class="w-20 text-right"> </th>
							</tr>
						</thead>
						<tbody>
							{#each potion.input as item (item.item.id)}
								<tr>
									<td>
										<div class="grid h-6 w-6 place-items-center">
											<img src={item.item.icon} alt={item.item.name} />
										</div>
									</td>
									<td
										><a href={resolve(`/items/${item.item.id}`)}
											>{item.item.name}</a
										></td
									>
									<td class="text-right">{formatValue(item.item.limit)}</td>
									<td class="text-right">{formatNumber(item.item.volume)}</td>
									<td class="text-right">
										{formatNumber(item.item.latest.low)}
									</td>
									<td class="text-right">{formatNumber(item.count)}</td>
									<td class="text-right">
										<button
											onclick={() => onClickBuyItem(item.item)}
											class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
											data-tip={`Add ${item.item.name} Buy to Ledger`}
										>
											<Plus />
											<span class="sr-only"
												>Add {item.item.name} Buy to Ledger</span
											>
										</button>
									</td>
								</tr>
							{/each}
							<tr>
								<td></td>
								<td>Input Cost</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right">
									{formatNumber(potion.inputValue)}
								</td>
								<td class="text-right">
									<button
										onclick={() =>
											onClickBuyItems(potion.input.map((item) => item.item))}
										class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
										data-tip="Add Inputs Buy to Ledger"
									>
										<Plus />
										<span class="sr-only">Add Inputs Buy to Ledger</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="table table-fixed table-zebra">
						<thead>
							<tr>
								<th class="w-6"></th>
								<th class="w-full"> Name </th>
								<th class="w-36 text-right"> Limit </th>
								<th class="w-36 text-right"> Volume </th>
								<th class="w-36 text-right"> Sell Price </th>
								<th class="w-36 text-right"> Count </th>
								<th class="w-20 text-right"> </th>
							</tr>
						</thead>
						<tbody>
							{#each potion.output as item (item.item.id)}
								<tr>
									<td>
										<div class="grid h-6 w-6 place-items-center">
											<img src={item.item.icon} alt={item.item.name} />
										</div>
									</td>
									<td
										><a href={resolve(`/items/${item.item.id}`)}
											>{item.item.name}</a
										></td
									>
									<td class="text-right">{formatValue(item.item.limit)}</td>
									<td class="text-right">{formatNumber(item.item.volume)}</td>
									<td class="text-right">
										{formatNumber(item.item.latest.low)}
									</td>
									<td class="text-right">{formatNumber(item.count)}</td>
									<td class="text-right">
										<button
											onclick={() => onClickSellItem(item.item)}
											class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
											data-tip={`Add ${item.item.name} Sell to Ledger`}
										>
											<Plus />
											<span class="sr-only"
												>Add {item.item.name} Sell to Ledger</span
											>
										</button>
									</td>
								</tr>
							{/each}
							<tr>
								<td></td>
								<td>Output Value</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right">
									{formatNumber(potion.outputValue)}
								</td>
								<td class="text-right">
									<button
										onclick={() =>
											onClickSellItems(potion.output.map((item) => item.item))}
										class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
										data-tip="Add Outputs Sell to Ledger"
									>
										<Plus />
										<span class="sr-only">Add Outputs Sell to Ledger</span>
									</button>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>Difference</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								{#if sign === 1}
									<td class="bg-success text-right text-success-content"
										>{formatNumber(potion.margin)}</td
									>
								{:else if sign === -1}
									<td class="bg-error text-right text-error-content"
										>{formatNumber(potion.margin)}</td
									>
								{:else}
									<td class="text-right">{formatNumber(potion.margin)}</td>
								{/if}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</li>
	{/each}
</ul>
<Pagination {page} {max} onChange={onChangePage} />
