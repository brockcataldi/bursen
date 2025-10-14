<script lang="ts">
	type Props = {
		page: number;
		max: number;
		url?: string;
	};

	let { page, max, url }: Props = $props();

	const u = url ? `&${url}` : '';
</script>

<div class="grid w-full place-items-center py-2">
	<div class="join">
		{#if page !== 1}
			<a class="btn join-item" href="?page=1{url}">First</a>
		{/if}

		{#if page > 1}
			<a class="btn join-item" href="?page={page - 1}{url}">Prev</a>
		{/if}

		{#each { length: 3 } as _, i}
			{@const index = page - 3 + i}
			{#if index > 0}
				<a class="btn join-item" href="?page={index}{url}">{index}</a>
			{/if}
		{/each}

		<span class="btn btn-active join-item" aria-current="page">{page}</span>

		{#each { length: 3 } as _, i}
			{@const index = page + 1 + i}
			{#if index < max}
				<a class="btn join-item" href="?page={index}{url}">{index}</a>
			{/if}
		{/each}

		{#if page <= max}
			<a class="btn join-item" href="?page={page + 1}{url}">Next</a>
		{/if}

		{#if page !== max}
			<a class="btn join-item" href="?page={max}{url}">Last</a>
		{/if}
	</div>
</div>
