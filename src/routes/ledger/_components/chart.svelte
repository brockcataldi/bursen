<script lang="ts">
	import type { ChartTransaction } from '$lib/types';
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	type Props = {
		entries: ChartTransaction[];
	};

	let { entries }: Props = $props();

	let canvas = $state<HTMLCanvasElement | null>(null);
	let chart = $state<Chart | null>(null);

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'line',
				data: {
					labels: entries.map((entry) => entry.label),
					datasets: [
						{
							label: 'Transactions',
							data: entries.map((entry) => entry.value)
						}
					]
				}
			});
		}

		return () => {
			chart?.destroy();
		};
	});

	$effect(() => {
		if (chart) {
			chart.data.labels = entries.map((_, index) => index.toString());
			chart.data.datasets[0].data = entries.map((entry) => entry.value);
			chart.update();
		}
	});
</script>

<canvas class="h-60" bind:this={canvas}></canvas>
