<script lang="ts">
	import { type Transaction as TransactionType } from '$lib/types';
	import Transaction from './_components/transaction.svelte';

	let { data } = $props();

	let entries = $state<TransactionType[]>([
		{
			id: crypto.randomUUID(),
			label: 'Tutorial Island Bank',
			type: 'transfer',
			value: 25,
			quantity: 1
		}
	]);

	let max = $derived(entries.length);

	function addTransaction() {
		entries.push({
			id: crypto.randomUUID(),
			label: '',
			type: 'transfer',
			value: 0,
			quantity: 1
		});
	}

	function handleDelete(id: string) {
		entries = entries.filter((entry) => entry.id !== id);
	}

	function handleMoveUp(index: number) {
		const entry = entries.splice(index, 1)[0];
		entries.splice(index - 1, 0, entry);
	}

	function handleMoveDown(index: number) {
		const entry = entries.splice(index, 1)[0];
		entries.splice(index + 1, 0, entry);
	}

	function handleDuplicate(index: number) {
		const entry = entries[index];
		entries.push(
			{
				...entry,
				id: crypto.randomUUID(),
			}
		);
	}
</script>
<div class="mx-4 my-4 rounded-l border border-base-content/8 bg-base-100 p-4">
	<ul class="flex flex-col gap-4">
		{#each entries as entry, index (entry.id)}
			<li class="w-full">
				<Transaction
					{index}
					{max}
					{entry}
					items={data.items}
					onDelete={handleDelete}
					onMoveUp={handleMoveUp}
					onMoveDown={handleMoveDown}
					onDuplicate={handleDuplicate}
				/>
			</li>
		{/each}
		<li class="flex flex-row gap-2">
			<button class="btn btn-outline btn-primary" onclick={addTransaction}
				>Add Transaction</button
			>
		</li>
	</ul>
</div>
<pre>{JSON.stringify(entries, null, 4)}</pre>
