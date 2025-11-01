<script lang="ts">
	import { formatCurrency } from '$lib/functions';

	import {
		ledger,
		balance,
		profit,
		length,
		chart,
		onAdd,
		onDelete,
		onDuplicate,
		onMoveUp,
		onMoveDown,
		onChange,
		onClear
	} from '$lib/stores/ledger';

	import Chart from './_components/chart.svelte';
	import Transaction from './_components/transaction.svelte';

	import Plus from '$lib/icons/plus.svelte';
	import Trash from '$lib/icons/trash.svelte';

	let { data } = $props();

	let showChart = $state(false);
	let allowReordering = $state(false);
</script>

<header
	class="mx-4 my-4 flex flex-row items-center justify-between rounded-l border border-base-content/8 bg-base-100 p-4"
>
	<div class="stats stats-horizontal">
		<div class="stat">
			<div class="stat-title">Balance</div>
			<div class="stat-value">{formatCurrency($balance)}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Profit</div>
			<div class="stat-value">{formatCurrency($profit)}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Transactions</div>
			<div class="stat-value">{$length}</div>
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
		<Chart entries={$chart} />
	</div>
{/if}

<div class="mx-4 my-4 rounded-l border border-base-content/8 bg-base-100 p-4">
	<ul class="flex flex-col gap-4">
		{#each $ledger as entry, index (entry.id)}
			<li class="w-full">
				<Transaction
					{allowReordering}
					{index}
					max={$length}
					{entry}
					items={data.items}
					{onChange}
					{onDelete}
					{onMoveUp}
					{onMoveDown}
					{onDuplicate}
				/>
			</li>
		{/each}
		<li class="flex w-full flex-row justify-between gap-2">
			<button class="btn btn-outline btn-primary" onclick={() => onAdd()}
				><Plus />Add Transaction</button
			>
			<button class="btn btn-outline btn-error" onclick={() => onClear()}
				><Trash />Clear</button
			>
		</li>
	</ul>
</div>
