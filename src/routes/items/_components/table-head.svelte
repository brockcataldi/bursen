<script lang="ts">
	import type { ItemKey } from '$lib/types';
	import SortIcon from '$lib/components/sort-icon.svelte';

	type Props = {
		column: ItemKey;
		direction: number;
		onClickSort: (column: ItemKey, sortColumn: ItemKey) => void;
	};

	let { column, direction, onClickSort }: Props = $props();
</script>

<thead>
	<tr>
		<th class="w-6">
			<span class="sr-only">Icon</span>
		</th>
		<th class="w-6">
			<span class="sr-only">Access</span>
		</th>
		<th class="w-full">
			<button
				onclick={() => onClickSort(column, 'name')}
				class="flex w-full cursor-pointer flex-row items-center justify-between gap-2"
			>
				<span>Name</span>
				<SortIcon current={column} {direction} column="name" />
			</button>
		</th>
		<th class="w-30">
			<button
				onclick={() => onClickSort(column, 'limit')}
				class="flex w-full cursor-pointer flex-row items-center justify-between gap-2 text-right"
			>
				Buy Limit
				<SortIcon current={column} {direction} column="limit" />
			</button>
		</th>
		<th class="w-30">
			<button
				onclick={() => onClickSort(column, 'volume')}
				class="flex w-full cursor-pointer flex-row items-center justify-between gap-2 text-right"
			>
				Volume
				<SortIcon current={column} {direction} column="volume" />
			</button>
		</th>
		<th class="w-42">
			<button
				onclick={() => onClickSort(column, 'low')}
				class="flex w-full cursor-pointer flex-row items-center justify-between gap-2 text-right"
			>
				Buy Price
				<SortIcon current={column} {direction} column="low" />
			</button>
		</th>
		<th class="w-42">
			<button
				onclick={() => onClickSort(column, 'sell')}
				class="flex w-full cursor-pointer flex-row items-center justify-between gap-2 text-right"
			>
				Sell Price
				<SortIcon current={column} {direction} column="sell" />
			</button>
		</th>
		<th class="w-36">
			<button
				onclick={() => onClickSort(column, 'margin')}
				class="flex w-full cursor-pointer flex-row items-center justify-between gap-2 text-right"
			>
				Margin
				<SortIcon current={column} {direction} column="margin" />
			</button>
		</th>
	</tr>
</thead>
