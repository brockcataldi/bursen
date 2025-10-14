<script lang="ts">
	import { formatNumber, getSortUrl } from '$lib/functions';

	import Pagination from '$lib/components/pagination.svelte';
	import SortIcon from '$lib/components/sort-icon.svelte';


	let { data } = $props();

</script>

<div class="overflow-x-auto border border-base-content/5 bg-base-100">
	<table class="table-pin-rows table table-fixed table-zebra">
		<thead>
			<tr>
				<th class="w-6"></th>
				<th class="w-full">
					<a href={getSortUrl(data.column, 'name', data.direction)} class="flex flex-row items-center justify-start gap-2">
						Name
                        <SortIcon current={data.column} direction={data.direction} column={'name'}/>
					</a>
				</th>
				<th class="w-36">
					<a href={getSortUrl(data.column, 'limit', data.direction)} class="flex flex-row items-center justify-start gap-2">
						Buy Limit
                        <SortIcon current={data.column} direction={data.direction} column={'limit'}/>
					</a>
				</th>
				<th class="w-36">
					<a href={getSortUrl(data.column, 'low', data.direction)} class="flex flex-row items-center justify-start gap-2">
						Buy Price
                        <SortIcon current={data.column} direction={data.direction} column={'low'}/>
					</a>
				</th>
				<th class="w-36">
					<a href={getSortUrl(data.column, 'sell', data.direction)} class="flex flex-row items-center justify-start gap-2">
						Sell Price
                        <SortIcon current={data.column} direction={data.direction} column={'sell'}/>
					</a>
				</th>
				<th class="w-36">
					<a href={getSortUrl(data.column, 'margin', data.direction)} class="flex flex-row items-center justify-start gap-2">
						Margin
                        <SortIcon current={data.column} direction={data.direction} column={'margin'}/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each data.items as item}
				{@const sign = Math.sign(item.latest.margin)}
				<tr>
					<td>
						<div class="grid h-6 w-6 place-items-center">
							<img src={item.icon} alt={item.name} />
						</div>
					</td>
					<td>{item.name}</td>
					<td>{(item.limit === 0)? '?' : item.limit}</td>
					<td>{formatNumber(item.latest.low)}</td>
					<td>{formatNumber(item.latest.sell)}</td>

					{#if sign === 1}
						<td class="bg-success text-success-content">{formatNumber(item.latest.margin)}</td>
					{:else if sign === -1}
						<td class="bg-error text-error-content">{formatNumber(item.latest.margin)}</td>
                    {:else}
                    	<td>{formatNumber(item.latest.margin)}</td>
                    {/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<Pagination page={data.page} max={data.max} />
