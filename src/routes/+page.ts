import { PAGE_SIZE } from '$lib/constants';
import { clamp, getSortValue } from '$lib/functions';
import { isItemKey, type ItemKey } from '$lib/types';
import DOMPurify from 'isomorphic-dompurify';
import z from 'zod';

import type { PageLoad } from './$types';

const PageSchema = z.preprocess(
	(val) => DOMPurify.sanitize(String(val ?? '1')),
	z.coerce.number().int().min(1)
);

const DirectionSchema = z
	.preprocess(
		(val) => DOMPurify.sanitize(String(val ?? '-1')),
		z.coerce.number()
	)
	.refine((val) => [-1, 0, 1].includes(val), {
		message: 'Direction must be -1, 0, or 1'
	});

const ItemKeySchema = z.custom<ItemKey>(
	(val) => typeof val === 'string' && isItemKey(val),
	{
		message: 'Invalid column key'
	}
);

const ColumnSchema = z.preprocess(
	(val) => DOMPurify.sanitize(String(val ?? 'margin')),
	ItemKeySchema
);

const QuerySchema = z.preprocess(
	(val) => DOMPurify.sanitize(String(val ?? '')),
	z.string()
);

export const load: PageLoad = async ({ parent, url }) => {
	const { items } = await parent();

	const parseResults = {
		page: PageSchema.safeParse(url.searchParams.get('page')),
		direction: DirectionSchema.safeParse(url.searchParams.get('direction')),
		column: ColumnSchema.safeParse(url.searchParams.get('column')),
		query: QuerySchema.safeParse(url.searchParams.get('query'))
	};

	const max = Math.floor(items.length / PAGE_SIZE) + 1;
	const page = parseResults.page.success
		? clamp(parseResults.page.data, 1, max)
		: 1;
	const direction = parseResults.direction.success
		? parseResults.direction.data
		: 1;
	const column: ItemKey = parseResults.column.success
		? parseResults.column.data
		: ('margin' as ItemKey);
	const query = parseResults.query.success ? parseResults.query.data : '';

	const start = (page - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;

	const pageItems = items
		.sort((a, b) => {
			const aVal = getSortValue(a, column);
			const bVal = getSortValue(b, column);

			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return aVal.localeCompare(bVal) * direction * -1;
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
		query,
		column,
		direction
	};
};
