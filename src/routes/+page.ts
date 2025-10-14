import { PAGE_SIZE } from '$lib/constants';
import { clamp, getSortValue } from '$lib/functions';
import type { ItemKey } from '$lib/types';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, url }) => {
	const { items } = await parent();

	const max = Math.floor(items.length / PAGE_SIZE) + 1;

	const pageParam = parseInt(url.searchParams.get('page') || '1', 10);
	const directionParam = parseInt(url.searchParams.get('direction') || '-1', 10);
	const columnParam: ItemKey = (url.searchParams.get('column') || 'margin') as ItemKey;

	const page = Number.isNaN(pageParam) ? 1 : clamp(pageParam, 1, max);
	const direction = Number.isNaN(directionParam) ? 1 : Math.sign(directionParam);

	const start = (page - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;
	const pageItems = items
		.sort((a, b) => {
			const aVal = getSortValue(a, columnParam);
			const bVal = getSortValue(b, columnParam);

			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return aVal.localeCompare(bVal) * direction;
			}

			if (typeof aVal === 'number' && typeof bVal === 'number') {
				return (aVal - bVal) * direction;
			}

			return 0;
		})
		.slice(start, end);

	return {
		items: pageItems,
		page,
		max,
		column: columnParam,
		direction: direction
	};
};
