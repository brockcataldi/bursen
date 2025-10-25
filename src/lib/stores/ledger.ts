import { writable } from 'svelte/store';
import type { Transaction } from '../types';

function loadLedger() {
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

export const ledger = writable<Transaction[]>(loadLedger());

export function addEntry(transaction?: Transaction) {
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

export function deleteEntry(id: string) {
	ledger.update((value) =>
		value.filter((transaction) => transaction.id !== id)
	);
}

export function updateEntry(entry: Transaction) {
	ledger.update((value) =>
		value.map((transaction) =>
			transaction.id === entry.id ? entry : transaction
		)
	);
}

export function duplicateEntry(id: string) {
	ledger.update((value) => {
		const entry = value.find((transaction) => transaction.id === id);
		if (entry) {
			return [...value, { ...entry, id: crypto.randomUUID() }];
		}
		return value;
	});
}

export function moveEntryUp(id: string) {
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

export function moveEntryDown(id: string) {
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

ledger.subscribe((value) => {
	localStorage.setItem('ledger', JSON.stringify(value));
});
