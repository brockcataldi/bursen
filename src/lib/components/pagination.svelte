<script lang="ts">
	type Props = {
		page: number;
		max: number;
		onChange: (page: number) => void;
	};

	let { page, max, onChange }: Props = $props();
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

		{#each { length: 3 } as _, i (page - 3 + i)}
			{@const index = page - 3 + i}
			{#if index > 0}
				<button class="btn join-item" onclick={() => onChange(index)}
					>{index}</button
				>
			{/if}
		{/each}

		<span class="btn btn-active join-item" aria-current="page">{page}</span>

		{#each { length: 3 } as _, i (page + 1 + i)}
			{@const index = page + 1 + i}
			{#if index < max}
				<button class="btn join-item" onclick={() => onChange(index)}
					>{index}</button
				>
			{/if}
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
