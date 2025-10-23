import z from 'zod';

export interface LatestResponse {
	data: { [id: number]: LatestItem };
}
export interface LatestItem {
	high: number;
	highTime: number;
	low: number;
	lowTime: number;
}

export type MappingResponse = { [key: string]: MappingItem };

export interface MappingItem {
	examine: string;
	id: number;
	members: boolean;
	lowalch: number;
	limit: number;
	value: number;
	highalch: number;
	icon: string;
	name: string;
	price: number;
	last: number;
	volume: number;
}

const mappingItemKeys: MappingItemKey[] = [
	'examine',
	'id',
	'members',
	'lowalch',
	'limit',
	'value',
	'highalch',
	'icon',
	'name',
	'price',
	'last',
	'volume'
] as const;

export type MappingItemKey = keyof MappingItem;

export function isMappingItemKey(key: string): key is MappingItemKey {
	return (mappingItemKeys as readonly string[]).includes(key);
}

export type CalculatedLatestItem = LatestItem & {
	tax: number;
	sell: number;
	margin: number;
};

const calculatedLatestItemKeys: CalculatedLatestItemKey[] = [
	'high',
	'highTime',
	'low',
	'lowTime',
	'tax',
	'sell',
	'margin'
] as const;

export type CalculatedLatestItemKey = keyof CalculatedLatestItem;

export function isCalculatedLatestItemKey(
	key: string
): key is CalculatedLatestItemKey {
	return (calculatedLatestItemKeys as readonly string[]).includes(key);
}

export type ItemKey = CalculatedLatestItemKey | MappingItemKey;

export function isItemKey(key: string): key is ItemKey {
	return isMappingItemKey(key) || isCalculatedLatestItemKey(key);
}

export type ItemsMap = { [id: number]: Item };
export type Item = MappingItem & {
	latest: CalculatedLatestItem;
};

export type Transaction = {
	id: string;
	label: string;
	type: 'buy' | 'sell' | 'transfer';
	item?: number;
	value: number;
	quantity: number;
};

export const TransactionSchema = z.object({
	id: z.string(),
	date: z.date(),
	label: z.string(),
	type: z.enum(['buy', 'sell', 'transfer']),
	item: z.number().optional(),
	value: z.number(),
	quantity: z.number()
});

export function isTransaction(value: any): value is Transaction {
	return TransactionSchema.safeParse(value).success;
}
