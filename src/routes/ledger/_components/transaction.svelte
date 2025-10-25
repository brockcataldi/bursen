<script lang="ts">
	import type { Item, Transaction } from '$lib/types';

	import ArrowDown from '$lib/icons/arrow-down.svelte';
	import ArrowUp from '$lib/icons/arrow-up.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import DocumentDuplicate from '$lib/icons/document-duplicate.svelte';
	import ItemSelector from './item-selector.svelte';

	type Props = {
		allowReordering: boolean;
		index: number;
		max: number;
		entry: Transaction;
		items: Item[];
		onChange: (entry: Transaction) => void;
		onDelete: (entry: string) => void;
		onMoveUp: (entry: string) => void;
		onMoveDown: (entry: string) => void;
		onDuplicate: (entry: string) => void;
	};

	let {
		allowReordering,
		index,
		max,
		entry,
		items,
		onDelete,
		onChange,
		onMoveUp,
		onMoveDown,
		onDuplicate
	}: Props = $props();

	let localEntry = $state(entry);

	$effect(() => {
		onChange(localEntry);
	});

	function handleItemChange(value: string | Item) {
		if (typeof value === 'string') {
			entry.label = value;
			entry.item = undefined;
		} else {
			entry.label = value.name;
			entry.item = value.id;

			if (entry.type === 'buy') {
				entry.value = value.latest.low;
			}

			if (entry.type === 'sell') {
				entry.value = value.latest.sell;
			}
		}
	}

	function handleTypeChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value as 'buy' | 'sell' | 'transfer';
		entry.type = value;

		if (entry.type === 'transfer') {
			entry.quantity = 1;
		}
	}

	function handleDelete() {
		onDelete(entry.id);
	}

	function handleMoveUp() {
		onMoveUp(entry.id);
	}

	function handleMoveDown() {
		onMoveDown(entry.id);
	}

	function handleDuplicate() {
		onDuplicate(entry.id);
	}
</script>

<div class="join-horizontal join w-full">
	<label class="floating-label" for={`type-${localEntry.id}`}>
		<span>Type</span>
		<select
			id={`type-${localEntry.id}`}
			class="select w-30 rounded-l-md"
			bind:value={localEntry.type}
			onchange={handleTypeChange}
		>
			<option value="transfer">Transfer</option>
			<option value="buy">Buy</option>
			<option value="sell">Sell</option>
		</select>
	</label>

	{#if entry.type !== 'transfer'}
		<ItemSelector
			id={`item-${localEntry.id}`}
			value={localEntry.label}
			type={localEntry.type}
			{items}
			onChange={handleItemChange}
		/>
	{:else}
		<label class="floating-label w-full" for={`label-${localEntry.id}`}>
			<span>Label</span>
			<input
				id={`label-${localEntry.id}`}
				type="text"
				class="input w-full"
				bind:value={localEntry.label}
			/>
		</label>
	{/if}

	<label class="floating-label" for={`value-${localEntry.id}`}>
		<span>Value</span>
		<input
			id={`value-${localEntry.id}`}
			type="number"
			placeholder="0"
			class="input w-36"
			bind:value={localEntry.value}
		/>
	</label>

	{#if entry.type === 'buy' || entry.type === 'sell'}
		<label class="floating-label" for={`quantity-${localEntry.id}`}>
			<span>Quantity</span>
			<input
				id={`quantity-${localEntry.id}`}
				type="number"
				placeholder="0"
				class="input w-36"
				bind:value={entry.quantity}
			/>
		</label>
	{/if}

	{#if allowReordering && index !== 0}
		<button class="btn btn-square btn-outline" onclick={handleMoveUp}>
			<span class="size-4">
				<ArrowUp />
			</span>
			<span class="sr-only">Move up</span>
		</button>
	{/if}

	{#if allowReordering && index !== max - 1}
		<button class="btn btn-square btn-outline" onclick={handleMoveDown}>
			<span class="size-4">
				<ArrowDown />
			</span>
			<span class="sr-only">Move down</span>
		</button>
	{/if}

	<button class="btn btn-square btn-outline" onclick={handleDuplicate}>
		<span class="size-4">
			<DocumentDuplicate />
		</span>
		<span class="sr-only">Duplicate</span>
	</button>
	<button
		class="tooltip btn tooltip-bottom btn-square rounded-r-md btn-outline btn-error"
		onclick={handleDelete}
		data-tip="Trash"
	>
		<span class="size-4">
			<Trash />
		</span>
		<span class="sr-only">Delete</span>
	</button>
</div>
