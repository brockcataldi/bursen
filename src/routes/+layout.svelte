<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="drawer drawer-open">
  <input id="navigation-drawer" type="checkbox" class="drawer-toggle" checked/>
  <div class="drawer-content">
    {@render children?.()}
  </div>
  
  <div class="drawer-side is-drawer-close:overflow-visible">
    <label for="navigation-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
      <ul class="menu w-full grow">

        <li>
          <a href="/" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-4 my-1.5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span class="is-drawer-close:hidden">Index</span>
		  </a>
        </li>

        <li>
          <a href="/" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block size-4 my-1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
			</svg>
            <span class="is-drawer-close:hidden">Ledger</span>
		  </a>
        </li>
		<hr />
        <li>
          <a href="/item-sets" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-4 my-1.5"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span class="is-drawer-close:hidden">Item Sets</span>
		  </a>
        </li>
      </ul>


	  <ul class="menu w-full">
		<li>
          <a href="/" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block size-4 my-1.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

            <span class="is-drawer-close:hidden">Refresh</span>
		  </a>
        </li>
		<li>
			<label for="navigation-drawer" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-4 my-1.5 is-drawer-open:rotate-y-180"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
				<span class="is-drawer-close:hidden">Collapse</span>
			</label>
		</li>
	  </ul>
    </div>
  </div>
</div>

