<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { invalidateAll } from '$app/navigation';

	import Home from '$lib/icons/home.svelte';
	import QueueList from '$lib/icons/queue-list.svelte';
	import ArrowPath from '$lib/icons/arrow-path.svelte';
	import ArchiveBoxArrowDown from '$lib/icons/archive-box-arrow-down.svelte';
	import ArchiveBoxXMark from '$lib/icons/archive-box-x-mark.svelte';
	import Beaker from '$lib/icons/beaker.svelte';

	type Props = {
		children: Snippet;
		when?: number | null;
	};

	let { children, when }: Props = $props();

	let refreshing = $state(false);

	async function handleRefresh() {
		refreshing = true;
		await invalidateAll();
		refreshing = false;
	}
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
						href={resolve('/items')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Homepage"
					>
						<Home />
						<span class="is-drawer-close:hidden">Index</span>
					</a>
				</li>

				<li>
					<a
						href={resolve('/ledger')}
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
						href={resolve('/decanting')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Decanting"
					>
						<Beaker />
						<span class="is-drawer-close:hidden">Decanting</span>
					</a>
				</li>
				<li>
					<a
						href={resolve('/packing')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Packing"
					>
						<ArchiveBoxArrowDown />
						<span class="is-drawer-close:hidden">Packing</span>
					</a>
				</li>
				<li>
					<a
						href={resolve('/unpacking')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Unpacking"
					>
						<ArchiveBoxXMark />
						<span class="is-drawer-close:hidden">Unpacking</span>
					</a>
				</li>
			</ul>

			<ul class="menu w-full">
				<li>
					<button
						onclick={handleRefresh}
						disabled={refreshing}
						class="tooltip tooltip-right gap-2"
						class:btn-disabled={refreshing}
						data-tip="Last updated {when
							? new Date(when).toLocaleString()
							: 'never'}"
					>
						<ArrowPath />
						<div class="flex flex-col items-start is-drawer-close:hidden">
							<span class="block">Refresh</span>
							<span class="block text-xs"
								>{when ? new Date(when).toLocaleString() : 'never'}</span
							>
						</div>
					</button>
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
