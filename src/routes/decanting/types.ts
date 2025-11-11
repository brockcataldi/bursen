import type { Item } from '$lib/types';

export type PotionIndexes = {
	label: string;
	doses: {
		1: number;
		2: number;
		3: number;
		4: number;
	};
};

export type Potion = {
	label: string;
	doses: {
		1: Item;
		2: Item;
		3: Item;
		4: Item;
	};
};

export type DecantRecipe = {
	to: 1 | 2 | 3 | 4;
	from: 1 | 2 | 3 | 4;
	input: [0 | 1 | 2 | 3 | 4, number][];
	output: [0 | 1 | 2 | 3 | 4, number][];
};

export type Decant = {
	id: string;
	label: string;
	from: number;
	fromIcon: string;
	to: number;
	toIcon: string;
	input: { item: Item; count: number }[];
	output: { item: Item; count: number }[];
	inputValue: number;
	outputValue: number;
	margin: number;
};
