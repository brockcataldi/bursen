<script lang="ts">
	import type { Decant } from '../types';
	import { formatNumber } from '$lib/functions';

	import Details from './details.svelte';

	type Props = {
		decant: Decant;
	};

	let { decant }: Props = $props();

	let color = $derived.by(() => {
		const sign = Math.sign(decant.margin);
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
	<input type="checkbox" name="decant-{decant.id}" />
	<div class="collapse-title font-semibold">
		<div class="flex flex-row items-center justify-between gap-2">
			<div class="flex flex-row items-center justify-start gap-2">
				<h2 class="flex flex-row items-center justify-start gap-2">
					{decant.label}
					<img
						src={decant.fromIcon}
						alt={`${decant.label} (${decant.from})`}
						class="tooltip tooltip-bottom h-6 w-6 object-contain"
						data-tip={`${decant.label} (${decant.from})`}
					/>
					to
					<img
						src={decant.toIcon}
						alt={`${decant.label} (${decant.to})`}
						class="tooltip tooltip-bottom h-6 w-6 object-contain"
						data-tip={`${decant.label} (${decant.to})`}
					/>
				</h2>
			</div>
			<div class="flex flex-row items-center justify-end gap-2">
				<div>
					<p class="text-xs">Cost</p>
					<div class="badge w-30 justify-start badge-outline">
						{formatNumber(decant.inputValue)}
					</div>
				</div>
				<div>
					<p class="text-xs">Margin</p>
					<div class="badge w-30 justify-start badge-outline {color}">
						{formatNumber(decant.margin)}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="collapse-content">
		<div class="border border-base-content/8 bg-base-100">
			<Details {decant} {color} />
		</div>
	</div>
</li>
