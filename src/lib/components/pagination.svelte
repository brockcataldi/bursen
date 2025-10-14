<script lang="ts">
	type Props = {
		page: number;
		max: number;
		url?: string;
	};

	let { page, max, url }: Props = $props();

	const u = url ? `&${url}` : '';
</script>

<div class="w-full grid place-items-center py-2">
    <div class="join">
        {#if page !== 1}
            <a class="join-item btn" href="?page=1{url}">First</a>
        {/if}

        {#if page > 1}
            <a class="join-item btn" href="?page={page - 1}{url}">Prev</a>
        {/if}

        {#each { length: 3 } as _, i}
            {@const index = page - 3 + i}
            {#if index > 0}
                <a class="join-item btn" href="?page={index}{url}">{index}</a>
            {/if}
        {/each}

        <span class="join-item btn btn-active" aria-current="page">{page}</span>

        {#each { length: 3 } as _, i}
            {@const index = page + 1 + i}
            {#if index < max}
                <a class="join-item btn" href="?page={index}{url}">{index}</a>
            {/if}
        {/each}

        {#if page <= max}
            <a class="join-item btn" href="?page={page + 1}{url}">Next</a>
        {/if}

        {#if page !== max}
            <a class="join-item btn" href="?page={max}{url}">Last</a>
        {/if}
    </div>
</div>
