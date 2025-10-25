<script lang="ts">
	import { formatCurrency } from '$lib/functions';
	import { type ChartTransaction } from '$lib/types';

	import {
		ledger,
		addEntry,
		deleteEntry,
		duplicateEntry,
		moveEntryUp,
		moveEntryDown,
		updateEntry
	} from '$lib/stores/ledger';

	import Chart from './_components/chart.svelte';
	import Transaction from './_components/transaction.svelte';

	let { data } = $props();

	let showChart = $state(false);
	let allowReordering = $state(false);

	let max = $derived($ledger.length);
	let chart = $derived.by(() => {
		let value = 0;
		return $ledger.map((entry): ChartTransaction => {
			value += (entry.type === 'buy' ? -1 : 1) * entry.value * entry.quantity;
			return {
				label: entry.label,
				value
			};
		});
	});

	let profit = $derived.by(() => {
		let transfers = 0;
		let buys = 0;
		let sells = 0;

		for (const entry of $ledger) {
			if (entry.type === 'transfer') {
				transfers += entry.value;
			}
			if (entry.type === 'buy') {
				buys += entry.value * entry.quantity;
			}
			if (entry.type === 'sell') {
				sells += entry.value * entry.quantity;
			}
		}

		return sells - buys;
	});

	let balance = $derived(chart.at(-1)?.value ?? 0);
	let count = $derived($ledger.length);
</script>

<header
	class="mx-4 my-4 flex flex-row items-center justify-between rounded-l border border-base-content/8 bg-base-100 p-4"
>
	<div class="stats stats-horizontal">
		<div class="stat">
			<div class="stat-title">Balance</div>
			<div class="stat-value">{formatCurrency(balance)}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Profit</div>
			<div class="stat-value">{formatCurrency(profit)}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Transactions</div>
			<div class="stat-value">{count}</div>
		</div>
	</div>
	<div>
		<fieldset class="fieldset">
			<label class="label">
				<input type="checkbox" class="toggle" bind:checked={showChart} />
				Show chart
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<label class="label">
				<input type="checkbox" class="toggle" bind:checked={allowReordering} />
				Allow reordering
			</label>
		</fieldset>
	</div>
</header>

{#if showChart}
	<div class="mx-4 my-4 rounded-l border border-base-content/8 bg-base-100 p-4">
		<Chart entries={chart} />
	</div>
{/if}

<div class="mx-4 my-4 rounded-l border border-base-content/8 bg-base-100 p-4">
	<ul class="flex flex-col gap-4">
		{#each $ledger as entry, index (entry.id)}
			<li class="w-full">
				<Transaction
					{allowReordering}
					{index}
					{max}
					{entry}
					items={data.items}
					onChange={updateEntry}
					onDelete={deleteEntry}
					onMoveUp={moveEntryUp}
					onMoveDown={moveEntryDown}
					onDuplicate={duplicateEntry}
				/>
			</li>
		{/each}
		<li class="flex flex-row gap-2">
			<button class="btn btn-outline btn-primary" onclick={() => addEntry()}
				>Add Transaction</button
			>
		</li>
	</ul>
</div>
