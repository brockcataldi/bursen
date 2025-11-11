<script lang="ts">
	import { formatNumber, formatValue } from '$lib/functions';
	import { settings } from '$lib/stores/settings';
	import {
		onClickBuyItem,
		onClickBuyItems,
		onClickSellItem,
		onClickSellItems
	} from '$lib/stores/ledger';
	import { resolve } from '$app/paths';
	import Plus from '$lib/icons/plus.svelte';
	import type { Decant } from '../types';

	type Props = {
		decant: Decant;
		color: string;
	};

	let { decant, color }: Props = $props();
</script>

<table class="table table-fixed table-zebra">
	<thead>
		<tr>
			<th class="w-6"></th>
			<th class="w-full"> Name </th>
			<th class="w-36 text-right"> Buy Limit </th>
			<th class="w-36 text-right"> Volume </th>
			<th class="w-36 text-right"> Buy Price </th>
			<th class="w-36 text-right"> Count </th>

			{#if $settings.ledger}
				<th class="w-20 text-right"> </th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each decant.input as item (`${decant.id}-input-${item.item.id}`)}
			<tr>
				<td>
					<div class="grid h-6 w-6 place-items-center">
						<img src={item.item.icon} alt={item.item.name} />
					</div>
				</td>
				<td><a href={resolve(`/items/${item.item.id}`)}>{item.item.name}</a></td
				>
				<td class="text-right">{formatValue(item.item.limit)}</td>
				<td class="text-right">{formatNumber(item.item.volume)}</td>
				<td class="text-right">
					{formatNumber(item.item.latest.low)}
				</td>
				<td class="text-right">{formatNumber(item.count)}</td>
				{#if $settings.ledger}
					<td class="text-right">
						<button
							onclick={() => onClickBuyItem(item.item)}
							class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
							data-tip={`Add ${item.item.name} Buy to Ledger`}
						>
							<Plus />
							<span class="sr-only">Add {item.item.name} Buy to Ledger</span>
						</button>
					</td>
				{/if}
			</tr>
		{/each}
		<tr>
			<td></td>
			<td>Input Cost</td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right">
				{formatNumber(decant.inputValue)}
			</td>
			{#if $settings.ledger}
				<td class="text-right">
					<button
						onclick={() =>
							onClickBuyItems(decant.input.map((item) => item.item))}
						class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
						data-tip="Add Inputs Buy to Ledger"
					>
						<Plus />
						<span class="sr-only">Add Inputs Buy to Ledger</span>
					</button>
				</td>
			{/if}
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
			{#if $settings.ledger}
				<th class="w-20 text-right"> </th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each decant.output as item (`${decant.id}-output-${item.item.id}`)}
			<tr>
				<td>
					<div class="grid h-6 w-6 place-items-center">
						<img src={item.item.icon} alt={item.item.name} />
					</div>
				</td>
				<td><a href={resolve(`/items/${item.item.id}`)}>{item.item.name}</a></td
				>
				<td class="text-right">{formatValue(item.item.limit)}</td>
				<td class="text-right">{formatNumber(item.item.volume)}</td>
				<td class="text-right">
					{formatNumber(item.item.latest.low)}
				</td>
				<td class="text-right">{formatNumber(item.count)}</td>
				{#if $settings.ledger}
					<td class="text-right">
						<button
							onclick={() => onClickSellItem(item.item)}
							class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
							data-tip={`Add ${item.item.name} Sell to Ledger`}
						>
							<Plus />
							<span class="sr-only">Add {item.item.name} Sell to Ledger</span>
						</button>
					</td>
				{/if}
			</tr>
		{/each}
		<tr>
			<td></td>
			<td>Output Value</td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right">
				{formatNumber(decant.outputValue)}
			</td>
			{#if $settings.ledger}
				<td class="text-right">
					<button
						onclick={() =>
							onClickSellItems(decant.output.map((item) => item.item))}
						class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
						data-tip="Add Outputs Sell to Ledger"
					>
						<Plus />
						<span class="sr-only">Add Outputs Sell to Ledger</span>
					</button>
				</td>
			{/if}
		</tr>
		<tr>
			<td></td>
			<td>Difference</td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right"></td>
			<td class="text-right {color}">{formatNumber(decant.margin)}</td>
		</tr>
	</tbody>
</table>
