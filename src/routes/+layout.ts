import type { LayoutLoad } from './$types';
import type {
	LatestResponse,
	MappingResponse,
	Item,
	ItemsMap
} from '$lib/types';

import { getSalesTax } from '$lib/functions';
import {
	API_LATEST_URL,
	API_MAPPING_URL,
	HEADERS,
	IMAGE_URL,
	TTL
} from '$lib/constants';

export const ssr = false;

const getMapping = async (): Promise<MappingResponse | null> => {
	const cache = localStorage.getItem('mapping');
	const last = localStorage.getItem('mapping-pulled');

	if (cache && last) {
		if (Date.now() - parseInt(last) > TTL) {
			try {
				return JSON.parse(cache) as MappingResponse;
			} catch (err) {
				// bro I don't care fetch it.
			}
		}
	}

	const mappingRequest = await fetch(API_MAPPING_URL, HEADERS);
	const mapping: MappingResponse | null = mappingRequest.ok
		? await mappingRequest.json()
		: null;

	localStorage.setItem('mapping', JSON.stringify(mapping));
	localStorage.setItem('mapping-pulled', Date.now().toString());

	return mapping;
};

export const load: LayoutLoad = async ({ fetch }) => {
	const latestRequest = await fetch(API_LATEST_URL, HEADERS);
	const latest: LatestResponse | null = latestRequest.ok
		? await latestRequest.json()
		: null;

	const mapping = await getMapping();

	if (!latest || !mapping) {
		return { items: [] as Item[] };
	}

	const items: Item[] = [];
	const map: ItemsMap = {};

	for (const m of Object.values(mapping)) {
		const l = latest.data[m.id];

		if (l === undefined || l.low < 0) {
			continue;
		}

		const icon = `${IMAGE_URL}${m.icon.replaceAll(' ', '_')}`;
		const tax = getSalesTax(l.high);
		const sell = l.high - tax;

		const item = {
			...m,
			limit: m.limit ?? 0,
			icon,
			latest: {
				...l,
				tax,
				sell,
				margin: sell - l.low
			}
		};

		items.push(item);
		map[m.id] = item;
	}

	return {
		items,
		map,
		when: Date.now()
	};
};
