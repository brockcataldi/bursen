import { writable } from 'svelte/store';

export type Settings = {
	drawer: boolean;
	balance: boolean;
	ledger: boolean;
};

function load() {
	const settings = localStorage.getItem('settings');

	if (settings) {
		return JSON.parse(settings) as Settings;
	}

	return {
		drawer: true,
		balance: false,
		ledger: false
	};
}

export const settings = writable<Settings>(load());

settings.subscribe((settings) => {
	localStorage.setItem('settings', JSON.stringify(settings));
});
