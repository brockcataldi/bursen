<script lang="ts">
	type Props = {
		page: number;
		max: number;
		onChange: (page: number) => void;
	};

	let { page, max, onChange }: Props = $props();

	const previousPages = $derived.by((): number[] => {
		const pages = [];
		for (let i = 0; i < 3; i++) {
			const index = page - 3 + i;
			if (index > 0) {
				pages.push(index);
			}
		}
		return pages;
	});

	const nextPages = $derived.by((): number[] => {
		const pages = [];
		for (let i = 0; i < 3; i++) {
			const index = page + 1 + i;
			if (index < max) {
				pages.push(index);
			}
		}
		return pages;
	});
</script>

<div class="grid w-full place-items-center py-2">
	<div class="join">
		{#if page !== 1}
			<button class="btn join-item" onclick={() => onChange(1)}>First</button>
		{/if}

		{#if page > 1}
			<button class="btn join-item" onclick={() => onChange(page - 1)}
				>Prev</button
			>
		{/if}

		{#each previousPages as previousPage (previousPage)}
			<button class="btn join-item" onclick={() => onChange(previousPage)}>
				{previousPage}
			</button>
		{/each}

		<span class="btn btn-active join-item" aria-current="page">{page}</span>

		{#each nextPages as nextPage (nextPage)}
			<button class="btn join-item" onclick={() => onChange(nextPage)}>
				{nextPage}
			</button>
		{/each}

		{#if page <= max - 1}
			<button class="btn join-item" onclick={() => onChange(page + 1)}
				>Next</button
			>
		{/if}

		{#if page !== max}
			<button class="btn join-item" onclick={() => onChange(max)}>Last</button>
		{/if}
	</div>
</div>
