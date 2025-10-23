<script lang="ts">
	import type { Item, Transaction } from '$lib/types';

	import ArrowDown from '$lib/icons/arrow-down.svelte';
	import ArrowUp from '$lib/icons/arrow-up.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import DocumentDuplicate from '$lib/icons/document-duplicate.svelte';
	import ItemSelector from './item-selector.svelte';

	type Props = {
		index: number;
		max: number;
		entry: Transaction;
		items: Item[];
		onDelete: (entry: string) => void;
		onMoveUp: (index: number) => void;
		onMoveDown: (index: number) => void;
		onDuplicate: (index: number) => void;
	};

	let { index, max, entry, items, onDelete, onMoveUp, onMoveDown, onDuplicate }: Props =
		$props();

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
		onMoveUp(index);
	}

	function handleMoveDown() {
		onMoveDown(index);
	}

	function handleDuplicate() {
		onDuplicate(index);
	}
</script>

<div class="join-horizontal join w-full">
	<label class="floating-label" for={`type-${entry.id}`}>
		<span>Type</span>
		<select
			id={`type-${entry.id}`}
			class="select w-30 rounded-l-md"
			bind:value={entry.type}
			onchange={handleTypeChange}
		>
			<option value="transfer">Transfer</option>
			<option value="buy">Buy</option>
			<option value="sell">Sell</option>
		</select>
	</label>

	{#if entry.type !== 'transfer'}
		<ItemSelector
			id={`item-${entry.id}`}
			value={entry.label}
			type={entry.type}
			{items}
			onChange={handleItemChange}
		/>
	{:else}
		<label class="floating-label w-full" for={`label-${entry.id}`}>
			<span>Label</span>
			<input
				id={`label-${entry.id}`}
				type="text"
				class="input w-full"
				bind:value={entry.label}
			/>
		</label>
	{/if}

	<label class="floating-label" for={`value-${entry.id}`}>
		<span>Value</span>
		<input
			id={`value-${entry.id}`}
			type="number"
			placeholder="0"
			class="input w-36"
			bind:value={entry.value}
		/>
	</label>

	{#if entry.type === 'buy' || entry.type === 'sell'}
		<label class="floating-label" for={`quantity-${entry.id}`}>
			<span>Quantity</span>
			<input
				id={`quantity-${entry.id}`}
				type="number"
				placeholder="0"
				class="input w-36"
				bind:value={entry.quantity}
			/>
		</label>
	{/if}

	{#if index !== 0}
		<button class="btn btn-square btn-outline" onclick={handleMoveUp}>
			<span class="size-4">
				<ArrowUp />
			</span>
			<span class="sr-only">Move up</span>
		</button>
	{/if}
	{#if index !== max - 1}
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
