<script lang="ts">
	import type { ItemSet } from '$lib/types';
	import { formatNumber, formatValue } from '$lib/functions';
	import { settings } from '$lib/stores/settings';
	import {
		onClickBuyItem,
		onClickBuyItems,
		onClickSellItem
	} from '$lib/stores/ledger';
	import { resolve } from '$app/paths';
	import Plus from '$lib/icons/plus.svelte';

	type Props = {
		set: ItemSet;
		color: string;
	};

	let { set, color }: Props = $props();
</script>

<table class="table table-fixed table-zebra">
	<thead>
		<tr>
			<th class="w-6"></th>
			<th class="w-full"> Component Name </th>
			<th class="w-36 text-right"> Buy Limit </th>
			<th class="w-36 text-right"> Volume </th>
			<th class="w-36 text-right"> Buy Price </th>
			{#if $settings.ledger}
				<th class="w-20 text-right"> </th>
			{/if}
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
				<td><a href={resolve(`/items/${item.id}`)}>{item.name}</a></td>
				<td class="text-right">{formatValue(item.limit)}</td>
				<td class="text-right">{formatNumber(item.volume)}</td>
				<td class="text-right">
					{formatNumber(item.latest.low)}
				</td>
				{#if $settings.ledger}
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
				{/if}
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
			{#if $settings.ledger}
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
			{/if}
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
			{#if $settings.ledger}
				<th class="w-20 text-right"></th>
			{/if}
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<div class="grid h-6 w-6 place-items-center">
					<img src={set.set.icon} alt={set.set.name} />
				</div>
			</td>
			<td><a href={resolve(`/items/${set.set.id}`)}>{set.set.name}</a></td>
			<td class="text-right">{formatValue(set.set.limit)}</td>
			<td class="text-right">{formatNumber(set.set.volume)}</td>
			<td class="text-right">
				{formatNumber(set.set.latest.sell)}
			</td>
			{#if $settings.ledger}
				<td class="text-right">
					<button
						onclick={() => onClickSellItem(set.set)}
						class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
						data-tip={`Add ${set.set.name} Sell to Ledger`}
					>
						<Plus />
						<span class="sr-only">Add {set.set.name} Sell to Ledger</span>
					</button>
				</td>
			{/if}
		</tr>
		<tr>
			<td></td>
			<td class="font-semibold">Difference</td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right {color}">{formatNumber(set.margin)}</td>
			{#if $settings.ledger}
				<td class="text-right"></td>
			{/if}
		</tr>
	</tbody>
</table>
