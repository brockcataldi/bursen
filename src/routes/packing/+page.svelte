<script lang="ts">
	import { PAGE_SIZE } from '$lib/constants';
    import { formatNumber, formatValue } from '$lib/functions';

    import Pagination from '$lib/components/pagination.svelte';

    let { data } = $props();

    let page = $state(1);
	let max = $derived(Math.floor(data.sets.length / PAGE_SIZE) + 1);

    let filtered = $derived(data.sets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    function onChangePage(newPage: number) {
        page = newPage;
    }
</script>
<ul>
    {#each filtered as set}
    {@const sign = Math.sign(set.margin)}
    {@const color = sign === 1 ? 'badge-success' : sign === -1 ? 'badge-error' : 'badge-primary'}
        <li>
            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="checkbox" name="set-{set.set.id}" />
                <div class="collapse-title font-semibold">
                    <div class="flex flex-row items-center justify-between gap-2">
                        <div class="flex flex-row items-center justify-start gap-2">
                            <img src={set.set.icon} alt={set.set.name} />
                            <h2>{set.set.name}</h2>
                        </div>
                        <div class="badge {color}">{formatNumber(set.margin)}</div>
                    </div>
                </div>
                <div class="collapse-content">
                    <table class="table table-fixed table-zebra">
                        <thead>
                            <tr>
                                <th class="w-6"></th>
                                <th class="w-full">
                                        Name
                                </th>
                                <th class="w-36 text-right">
                                        Buy Limit
                                </th>
                                <th class="w-36 text-right">
                                        Volume
                                </th>
                                <th class="w-36 text-right">
                                        Buy Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each set.items as item}
                                <tr>
                                    <td>
                                        <div class="grid h-6 w-6 place-items-center">
                                            <img src={item.icon} alt={item.name} />
                                        </div>
                                    </td>
                                    <td><a href={`/items/${item.id}`}>{item.name}</a></td>
                                    <td class="text-right">{formatValue(item.limit)}</td>
                                    <td class="text-right">{formatNumber(item.volume)}</td>
                                    <td class="text-right">
                                        {formatNumber(item.latest.low)}
                                    </td>
                                </tr>
                            {/each}
                            <tr>
                                <td></td>
                                <td>Items Cost</td>
                                <td class="text-right"></td>
                                <td class="text-right"></td>
                                <td class="text-right">
                                    {formatNumber(set.cost)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="grid h-6 w-6 place-items-center">
                                        <img src={set.set.icon} alt={set.set.name} />
                                    </div>
                                </td>
                                <td><a href={`/items/${set.set.id}`}>{set.set.name}</a></td>
                                <td class="text-right">{formatValue(set.set.limit)}</td>
                                <td class="text-right">{formatNumber(set.set.volume)}</td>
                                <td class="text-right">
                                    {formatNumber(set.set.latest.sell)}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Difference</td>
                                <td class="text-right"></td>
                                <td class="text-right"></td>
                                <td class="text-right">
                                    {formatNumber(set.margin)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    {/each}
</ul>
<Pagination {page} {max} onChange={onChangePage} />
