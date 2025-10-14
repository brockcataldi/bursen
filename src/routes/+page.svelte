<script lang="ts">
    import { formatNumber } from "$lib/functions";

    import Pagination from "$lib/components/pagination.svelte";

    let { data } = $props();
</script>

<div class="overflow-x-auto border border-base-content/5 bg-base-100">
    <table class="table table-zebra table-pin-rows">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Buy Limit</th>
                <th>Buy Price</th>
                <th>Sell Price</th>
                <th>Margin</th>
            </tr>
        </thead>
        <tbody>
            {#each data.items as item}
                {@const sign = Math.sign(item.latest.margin)}
                <tr>
                    <td>
                        <div class="w-6 h-6 grid place-items-center">
                            <img src={item.icon} alt={item.name} />
                        </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.limit ?? '?'}</td>
                    <td>{formatNumber(item.latest.low)}</td>
                    <td>{formatNumber(item.latest.sell)}</td>
                    {#if sign === 1}
                        <td class="bg-success text-success-content">{formatNumber(item.latest.margin)}</td>
                    {/if}
                    {#if sign === -1}
                        <td class="bg-error text-error-content">{formatNumber(item.latest.margin)}</td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<Pagination page={data.page} max={data.max} />


<style lang="postcss">
    @reference 'tailwindcss';

    td[data-sign="1"]{
        @apply bg-primary text-primary;
    }

    td[data-sign="-1"]{
        @apply text-red-300 bg-red-950;
    }
</style>
