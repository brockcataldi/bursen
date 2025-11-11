<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatValue, formatNumber } from '$lib/functions';

	import { onClickBuyItem, onClickSellItem } from '$lib/stores/ledger';
	import { settings } from '$lib/stores/settings';

	import type { Item } from '$lib/types';

	import Plus from '$lib/icons/plus.svelte';
	import Star from '$lib/icons/star.svelte';

	type Props = {
		item: Item;
	};

	let { item }: Props = $props();

	const sign = $derived(Math.sign(item.latest.margin));
</script>

<tr>
	<td>
		<div class="grid h-6 w-6 place-items-center">
			<img src={item.icon} alt={item.name} />
		</div>
	</td>
	<td>
		<div class="grid h-6 w-6 place-items-center">
			{#if item.members}
				<Star />
				<span class="sr-only">Members</span>
			{:else}
				<span class="sr-only">Free to Play</span>
			{/if}
		</div>
	</td>
	<td><a href={resolve(`/items/${item.id}`)}>{item.name}</a></td>
	<td class="text-right">{formatValue(item.limit)}</td>
	<td class="text-right">{formatNumber(item.volume)}</td>
	<td class="text-right">
		<div class="flex flex-row items-center justify-end gap-4">
			<span>{formatNumber(item.latest.low)}</span>
			{#if $settings.ledger}
				<button
					class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
					data-tip={`Add ${item.name} Buy to Ledger`}
					onclick={() => onClickBuyItem(item)}
				>
					<Plus />
					<span class="sr-only">Add {item.name} Buy to Ledger</span>
				</button>
			{/if}
		</div>
	</td>
	<td class="text-right">
		<div class="flex flex-row items-center justify-end gap-4">
			<span>{formatNumber(item.latest.sell)}</span>
			{#if $settings.ledger}
				<button
					class="tooltip btn tooltip-left btn-square btn-outline btn-sm btn-primary"
					data-tip={`Add ${item.name} Sell to Ledger`}
					onclick={() => onClickSellItem(item)}
				>
					<Plus />
					<span class="sr-only">Add {item.name} Sell to Ledger</span>
				</button>
			{/if}
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
