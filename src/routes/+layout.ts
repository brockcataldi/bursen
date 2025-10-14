import type { LayoutLoad } from './$types';
import type {
	LatestResponse,
	MappingResponse,
	Item,
	ItemsMap
} from '$lib/types';

import { mergeLatest } from '$lib/functions';
import { API_LATEST_URL, API_MAPPING_URL } from '$lib/constants';

export const prerender = false;

export const load: LayoutLoad = async ({ fetch }) => {
	const headers = {
		'User-Agent': 'bursen/1.0 Discord @broooooooooooooooooooooo'
	};

	const latestRequest = await fetch(API_LATEST_URL, {
		headers
	});

	const latest: LatestResponse | null = latestRequest.ok
		? await latestRequest.json()
		: null;

	const mappingRequest = await fetch(API_MAPPING_URL, {
		headers
	});

	const mapping: MappingResponse | null = mappingRequest.ok
		? await mappingRequest.json()
		: null;

	if (!latest || !mapping) {
		return { items: [] as Item[] };
	}

	const items: Item[] = mergeLatest(latest, mapping);

	const map: ItemsMap = items.reduce((p, c) => {
		return {
			...p,
			[c.id]: c
		};
	}, {});

	return {
		items,
		map,
		when: Date.now()
	};
};
