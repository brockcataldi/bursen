import { IMAGE_URL, MISSING_LATEST } from './constants';
import {
	isCalculatedLatestItemKey,
	isMappingItemKey,
	type Item,
	type ItemKey,
	type LatestResponse,
	type MappingResponse
} from './types';

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function getSalesTax(value: number) {
	const tax = Math.min(Math.floor(value * 0.2), 5_000_000);
	return tax < 1 ? 0 : tax;
}

export function getSellPrice(value: number) {
	return value - getSalesTax(value);
}

export function formatNumber(value: number) {
	return new Intl.NumberFormat('en-US').format(value);
}

export function formatDateTime(value: Date | number) {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(value);
}

export function getSortValue(
	item: Item,
	key: ItemKey
): string | number | undefined {
	if (isCalculatedLatestItemKey(key)) {
		return item.latest[key];
	}
	if (isMappingItemKey(key)) {
		return item[key];
	}

	return undefined;
}

export function mergeLatest(
	latest: LatestResponse,
	mapping: MappingResponse
): Item[] {
	return mapping
		.map((m) => {
			const icon = `${IMAGE_URL}${m.icon.replaceAll(' ', '_')}`;
			const values = latest.data[m.id];

			if (values === undefined) {
				return {
					...m,
					latest: MISSING_LATEST,
					icon
				};
			}

			const tax = getSalesTax(values.high);
			const sell = values.high - tax;

			return {
				...m,
				latest: {
					...values,
					tax,
					sell,
					margin: sell - values.low
				},
				icon
			};
		})
		.filter((item) => {
			return item.latest.low !== -1;
		});
}

export function dateToInputValue(d: Date): string {
	return d.toISOString().slice(0, 10);
}

export function inputValueToDate(s: string): Date {
	return new Date(s + 'T00:00');
}

export function parseShorthand(input: string): number {
	if (!input) return 0;

	const trimmed = input.trim().toLowerCase();
	const match = /^([0-9]*\.?[0-9]+)\s*([kmbt])?$/.exec(trimmed);

	if (!match) {
		const num = Number(trimmed);
		return Number.isFinite(num) ? num : 0;
	}

	const value = parseFloat(match[1]);
	if (isNaN(value)) return 0;

	const unit = match[2];
	switch (unit) {
		case 'k':
			return value * 1_000;
		case 'm':
			return value * 1_000_000;
		case 'b':
			return value * 1_000_000_000;
		case 't':
			return value * 1_000_000_000_000;
		default:
			return value;
	}
}
