<script lang="ts">
	import { resolve } from '$app/paths';
	import { PAGE_SIZE } from '$lib/constants';
	import { formatNumber, formatValue } from '$lib/functions';

	import Pagination from '$lib/components/pagination.svelte';

	let { data } = $props();

	let page = $state(1);
	let max = $derived(Math.floor(data.potions.length / PAGE_SIZE) + 1);

	let filtered = $derived(
		data.potions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	);
	function onChangePage(newPage: number) {
		page = newPage;
	}
</script>

<ul>
	{#each filtered as potion (potion.id)}
		{@const sign = Math.sign(potion.margin)}
		{@const color =
			sign === 1
				? 'badge-success'
				: sign === -1
					? 'badge-error'
					: 'badge-primary'}
		<li>
			<div class="collapse-arrow collapse border border-base-300 bg-base-100">
				<input type="checkbox" name="potion-{potion.id}" />
				<div class="collapse-title font-semibold">
					<div class="flex flex-row items-center justify-between gap-2">
						<div class="flex flex-row items-center justify-start gap-2">
							<h2 class="flex flex-row items-center justify-start gap-2">
								{potion.label}
								<img
									src={potion.fromIcon}
									alt={`${potion.label} (${potion.from})`}
									class="tooltip tooltip-bottom h-6 w-6 object-contain"
									data-tip={`${potion.label} (${potion.from})`}
								/>
								to
								<img
									src={potion.toIcon}
									alt={`${potion.label} (${potion.to})`}
									class="tooltip tooltip-bottom h-6 w-6 object-contain"
									data-tip={`${potion.label} (${potion.to})`}
								/>
							</h2>
						</div>
						<div class="badge {color}">{formatNumber(potion.margin)}</div>
					</div>
				</div>
				<div class="collapse-content">
					<table class="table table-fixed table-zebra">
						<thead>
							<tr>
								<th class="w-6"></th>
								<th class="w-full"> Name </th>
								<th class="w-36 text-right"> Buy Limit </th>
								<th class="w-36 text-right"> Volume </th>
								<th class="w-36 text-right"> Buy Price </th>
								<th class="w-36 text-right"> Count </th>
							</tr>
						</thead>
						<tbody>
							{#each potion.input as item (item.item.id)}
								<tr>
									<td>
										<div class="grid h-6 w-6 place-items-center">
											<img src={item.item.icon} alt={item.item.name} />
										</div>
									</td>
									<td
										><a href={resolve(`/items/${item.item.id}`)}
											>{item.item.name}</a
										></td
									>
									<td class="text-right">{formatValue(item.item.limit)}</td>
									<td class="text-right">{formatNumber(item.item.volume)}</td>
									<td class="text-right">
										{formatNumber(item.item.latest.low)}
									</td>
									<td class="text-right">{formatNumber(item.count)}</td>
								</tr>
							{/each}
							<tr>
								<td></td>
								<td>Input Cost</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right">
									{formatNumber(potion.inputValue)}
								</td>
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
							</tr>
						</thead>
						<tbody>
							{#each potion.output as item (item.item.id)}
								<tr>
									<td>
										<div class="grid h-6 w-6 place-items-center">
											<img src={item.item.icon} alt={item.item.name} />
										</div>
									</td>
									<td
										><a href={resolve(`/items/${item.item.id}`)}
											>{item.item.name}</a
										></td
									>
									<td class="text-right">{formatValue(item.item.limit)}</td>
									<td class="text-right">{formatNumber(item.item.volume)}</td>
									<td class="text-right">
										{formatNumber(item.item.latest.low)}
									</td>
									<td class="text-right">{formatNumber(item.count)}</td>
								</tr>
							{/each}
							<tr>
								<td></td>
								<td>Output Value</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right">
									{formatNumber(potion.outputValue)}
								</td>
							</tr>
							<tr>
								<td></td>
								<td>Difference</td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								<td class="text-right"></td>
								{#if sign === 1}
									<td class="bg-success text-right text-success-content"
										>{formatNumber(potion.margin)}</td
									>
								{:else if sign === -1}
									<td class="bg-error text-right text-error-content"
										>{formatNumber(potion.margin)}</td
									>
								{:else}
									<td class="text-right">{formatNumber(potion.margin)}</td>
								{/if}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</li>
	{/each}
</ul>
<Pagination {page} {max} onChange={onChangePage} />
