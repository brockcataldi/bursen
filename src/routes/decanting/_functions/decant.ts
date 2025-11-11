import type { DecantRecipe, Potion, Decant } from '../types';
import type { Item } from '$lib/types';
import { recipes } from '../_data/recipes';

const _decant = (map: DecantRecipe, potion: Potion, vial: Item): Decant => {
	let inputValue = 0;
	let outputValue = 0;
	const input = [];
	const output = [];

	for (const [item, count] of map.input) {
		const _item = item === 0 ? vial : potion.doses[item];
		input.push({
			item: item === 0 ? vial : potion.doses[item],
			count
		});

		inputValue += _item.latest.low * count;
	}

	for (const [item, count] of map.output) {
		const _item = item === 0 ? vial : potion.doses[item];
		output.push({
			item: item === 0 ? vial : potion.doses[item],
			count
		});

		outputValue += _item.latest.low * count;
	}

	const margin = outputValue - inputValue;

	return {
		id: `${potion.label}-${map.from}-${map.to}`,
		label: potion.label,
		from: map.from,
		fromIcon: potion.doses[map.to].icon,
		to: map.to,
		toIcon: potion.doses[map.from].icon,
		input,
		output,
		inputValue,
		outputValue,
		margin
	};
};

const decant = (potion: Potion, vial: Item): Decant[] => {
	return recipes.map((recipe) => _decant(recipe, potion, vial));
};

export default decant;
