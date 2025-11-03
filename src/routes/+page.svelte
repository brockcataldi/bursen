<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Bursen</title>
</svelte:head>

<main class="mx-auto max-w-3xl">
	<header class="flex flex-row items-center justify-start gap-4 px-4 py-10">
		<img
			src="https://oldschool.runescape.wiki/images/Brugsen_Bursen_chathead.png?78f37"
			alt="Bursen"
			class="w-12"
		/>
		<h1 class="text-6xl font-bold">Bursen</h1>
	</header>
	<h2 class="px-4 text-2xl font-bold">Base Tools</h2>
	<div class="grid grid-cols-2 gap-4">
		<div class="card w-full bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title">Index</h2>
				<p class="card-text">All of the items in the database.</p>
				<a href={resolve('/items')} class="btn btn-primary">View</a>
			</div>
		</div>

		<div class="card w-full bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title">Ledger</h2>
				<p class="card-text">Track your transactions.</p>
				<a href={resolve('/ledger')} class="btn btn-primary">View</a>
			</div>
		</div>
	</div>

	<h2 class="px-4 text-2xl font-bold">Advanced Tools</h2>
	<div class="grid grid-cols-2 gap-4">
		<div class="card w-full bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title">Item Sets</h2>
				<p class="card-text">All of the item sets in the database.</p>
				<a href={resolve('/packing')} class="btn btn-primary">View</a>
			</div>
		</div>
	</div>
</main>
