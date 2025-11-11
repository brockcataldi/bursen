<script lang="ts">
	import type { ItemSet } from '$lib/types';
	import { formatNumber } from '$lib/functions';
	import Details from './details.svelte';

	type Props = {
		set: ItemSet;
	};

	let { set }: Props = $props();

	let color = $derived.by(() => {
		const sign = Math.sign(set.margin);
		return sign === 1
			? 'bg-success text-success-content'
			: sign === -1
				? 'bg-error text-error-content'
				: 'bg-primary text-primary-content';
	});
</script>

<li
	class="collapse-arrow collapse join-item border border-base-content/8 bg-base-100"
>
	<input type="checkbox" name="set-{set.set.id}" />
	<div class="collapse-title font-semibold">
		<div class="flex flex-row items-center justify-between gap-2">
			<div class="flex flex-row items-center justify-start gap-2">
				<img src={set.set.icon} alt={set.set.name} />
				<h2>{set.set.name}</h2>
			</div>

			<div class="flex flex-row items-center justify-end gap-2">
				<div>
					<p class="text-xs">Cost</p>
					<div class="badge w-30 justify-start badge-outline">
						{formatNumber(set.cost)}
					</div>
				</div>
				<div>
					<p class="text-xs">Margin</p>
					<div class="badge w-30 justify-start badge-outline {color}">
						{formatNumber(set.margin)}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="collapse-content">
		<div class="border border-base-content/8 bg-base-100">
			<Details {set} {color} />
		</div>
	</div>
</li>
