<script lang="ts">
	import type { Item } from '$lib/types';

	type Props = {
		type: 'buy' | 'sell' | 'transfer';
		id: string;
		value: string;
		items: Item[];
		onChange?: (value: string | Item) => void;
	};

	let { id, value, items, type, onChange }: Props = $props();

	let inputValue = $state(value);
	let showSuggestions = $state(false);
	let filteredItems = $state<Item[]>([]);
	let selectedIndex = $state(-1);

	function filterItems(searchTerm: string) {
		if (!searchTerm.trim()) {
			filteredItems = [];
			return;
		}

		filteredItems = items.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;

		filterItems(inputValue);
		showSuggestions = filteredItems.length > 0 && inputValue.trim() !== '';
		selectedIndex = -1;

		onChange?.(inputValue);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!showSuggestions) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				break;
			case 'Enter':
				event.preventDefault();
				if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
					selectItem(filteredItems[selectedIndex]);
				}
				break;
			case 'Escape':
				showSuggestions = false;
				selectedIndex = -1;
				break;
		}
	}

	function selectItem(item: Item) {
		inputValue = item.name;
		showSuggestions = false;
		selectedIndex = -1;

		onChange?.(item);
	}

	function handleClickOutside() {
		showSuggestions = false;
		selectedIndex = -1;
	}

	$effect(() => {
		inputValue = value;
	});
</script>

<div class="relative w-full">
	<label class="floating-label" for={`label-${id}`}>
		<span>Label</span>
		<input
			id={`label-${id}`}
			type="text"
			placeholder="Search Items"
			class="input w-full"
			bind:value={inputValue}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => {
				if (filteredItems.length > 0) showSuggestions = true;
			}}
			onblur={() => {
				setTimeout(handleClickOutside, 150);
			}}
		/>
	</label>

	{#if showSuggestions && filteredItems.length > 0}
		<div
			class="absolute z-50 mt-1 max-h-60 w-65 overflow-y-auto rounded-md border border-base-300 bg-base-100 shadow-lg"
		>
			{#each filteredItems as item, index (item.id)}
				<button
					type="button"
					class="w-full px-4 py-2 text-left hover:bg-base-200 focus:bg-base-200 focus:outline-none {selectedIndex ===
					index
						? 'bg-base-200'
						: ''}"
					onmousedown={() => selectItem(item)}
				>
					<div class="flex items-center gap-3">
						{#if item.icon}
							<img
								src={item.icon}
								alt={item.name}
								class="h-6 w-6 object-contain"
							/>
						{/if}
						<div>
							<div class="font-medium">{item.name}</div>
							{#if item.value}
								<div class="text-sm text-base-content/70">
									{#if type === 'buy'}
										Low: {item.latest.low.toLocaleString()}
									{:else if type === 'sell'}
										Sell: {item.latest.sell.toLocaleString()}
									{:else}
										Value: {item.value.toLocaleString()}
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
