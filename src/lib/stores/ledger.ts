import { derived, writable } from 'svelte/store';
import type { ChartTransaction, Transaction, Item } from '../types';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

function load() {
	const ledger = localStorage.getItem('ledger');
	if (ledger) {
		return JSON.parse(ledger);
	}
	return [
		{
			id: crypto.randomUUID(),
			label: 'Tutorial Island Bank',
			type: 'transfer',
			value: 25,
			quantity: 1
		}
	];
}

export const ledger = writable<Transaction[]>(load());
export const length = derived(ledger, ($ledger) => $ledger.length);
export const chart = derived(ledger, ($ledger) => {
	let value = 0;
	return $ledger.map((entry): ChartTransaction => {
		value += (entry.type === 'buy' ? -1 : 1) * entry.value * entry.quantity;
		return {
			label: entry.label,
			value
		};
	});
});

export const profit = derived(ledger, (ledger) => {
	let buys = 0;
	let sells = 0;

	for (const entry of ledger) {
		if (entry.type === 'buy') {
			buys += entry.value * entry.quantity;
		}
		if (entry.type === 'sell') {
			sells += entry.value * entry.quantity;
		}
	}

	return sells - buys;
});

export const balance = derived(chart, ($chart) => $chart.at(-1)?.value ?? 0);

ledger.subscribe((value) => {
	localStorage.setItem('ledger', JSON.stringify(value));
});

export function onClear() {
	ledger.set([]);
}

export function onAdd(transaction?: Transaction) {
	if (transaction) {
		return ledger.update((value) => [...value, transaction]);
	}

	ledger.update((value) => [
		...value,
		{
			id: crypto.randomUUID(),
			label: '',
			type: 'transfer',
			value: 0,
			quantity: 1
		}
	]);
}

export function onDelete(id: string) {
	ledger.update((value) =>
		value.filter((transaction) => transaction.id !== id)
	);
}

export function onChange(entry: Transaction) {
	ledger.update((value) =>
		value.map((transaction) =>
			transaction.id === entry.id ? entry : transaction
		)
	);
}

export function onDuplicate(id: string) {
	ledger.update((value) => {
		const entry = value.find((transaction) => transaction.id === id);
		if (entry) {
			return [...value, { ...entry, id: crypto.randomUUID() }];
		}
		return value;
	});
}

export function onMoveUp(id: string) {
	ledger.update((value) => {
		const index = value.findIndex((transaction) => transaction.id === id);
		if (index > 0) {
			const entry = value[index];
			value[index] = value[index - 1];
			value[index - 1] = entry;
		}
		return value;
	});
}

export function onMoveDown(id: string) {
	ledger.update((value) => {
		const index = value.findIndex((transaction) => transaction.id === id);
		if (index < value.length - 1) {
			const entry = value[index];
			value[index] = value[index + 1];
			value[index + 1] = entry;
		}
		return value;
	});
}

export function onClickBuyItem(item: Item) {
	onAdd({
		id: crypto.randomUUID(),
		label: item.name,
		type: 'buy',
		value: item.latest.low,
		quantity: 1
	});

	goto(resolve('/ledger'));
}

export function onClickBuyItems(items: Item[]) {
	for (const item of items) {
		onAdd({
			id: crypto.randomUUID(),
			label: item.name,
			type: 'buy',
			value: item.latest.low,
			quantity: 1
		});
	}

	goto(resolve('/ledger'));
}

export function onClickSellItem(item: Item) {
	onAdd({
		id: crypto.randomUUID(),
		label: item.name,
		type: 'sell',
		value: item.latest.sell,
		quantity: 1
	});

	goto(resolve('/ledger'));
}

export function onClickSellItems(items: Item[]) {
	for (const item of items) {
		onAdd({
			id: crypto.randomUUID(),
			label: item.name,
			type: 'sell',
			value: item.latest.sell,
			quantity: 1
		});
	}

	goto(resolve('/ledger'));
}
