import {
	isCalculatedLatestItemKey,
	isMappingItemKey,
	type Item,
	type ItemKey
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
): string | boolean | number | undefined {

	if (isCalculatedLatestItemKey(key)) {
		return item.latest[key];
	}

	if (isMappingItemKey(key)) {
		return item[key];
	}

	return undefined;
}

export function getSortUrl(
	current: string,
	column: string,
	direction: number = 1
): string {
	if (current !== column) {
		return `/?column=${column}&direction=${-1}`;
	}

	return `/?column=${column}&direction=${-1 * direction}`;
}
