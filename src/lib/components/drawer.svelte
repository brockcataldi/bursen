<script lang="ts">
	import type { Snippet } from 'svelte';

	import Home from '$lib/icons/home.svelte';
	import QueueList from '$lib/icons/queue-list.svelte';
	import ArrowPath from '$lib/icons/arrow-path.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="drawer-open drawer">
	<input id="navigation-drawer" type="checkbox" class="drawer-toggle" checked />
	<div class="drawer-content">
		{@render children?.()}
	</div>

	<div class="drawer-side is-drawer-close:overflow-visible">
		<div
			class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"
		>
			<ul class="menu w-full grow">
				<li>
					<a
						href="/items"
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Homepage"
					>
						<Home />
						<span class="is-drawer-close:hidden">Index</span>
					</a>
				</li>

				<li>
					<a
						href="/ledger"
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Ledger"
					>
						<QueueList />
						<span class="is-drawer-close:hidden">Ledger</span>
					</a>
				</li>
				<hr class="my-2" />
				<li>
					<a
						href="/sets"
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Settings"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="2"
							fill="none"
							stroke="currentColor"
							class="my-1.5 inline-block size-4"
							><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle
								cx="17"
								cy="17"
								r="3"
							></circle><circle cx="7" cy="7" r="3"></circle></svg
						>
						<span class="is-drawer-close:hidden">Item Sets</span>
					</a>
				</li>
			</ul>

			<ul class="menu w-full">
				<li>
					<a
						href="/"
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Refresh"
					>
						<ArrowPath />
						<span class="is-drawer-close:hidden">Refresh</span>
					</a>
				</li>
				<li>
					<label
						for="navigation-drawer"
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Open"
						aria-label="close sidebar"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="2"
							fill="none"
							stroke="currentColor"
							class="my-1.5 inline-block size-4 is-drawer-open:rotate-y-180"
							><path
								d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
							></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"
							></path></svg
						>
						<span class="is-drawer-close:hidden">Collapse</span>
					</label>
				</li>
			</ul>
		</div>
	</div>
</div>
