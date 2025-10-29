import type { PageLoad } from './$types';

import potions from '$lib/data/potions';
import type { DecantRecipe } from '$lib/types';

import decant from './_functions/decant';

export const load: PageLoad = async ({ parent }) => {
	const { map } = await parent();

	if (map === undefined) {
		return {
			potions: []
		};
	}

	const vial = map[227];

	if (vial === undefined) {
		return {
			potions: []
		};
	}

	const potionItems = potions
		.map((potion) => {
			return {
				label: potion.label,
				doses: {
					1: map[potion.doses[1]],
					2: map[potion.doses[2]],
					3: map[potion.doses[3]],
					4: map[potion.doses[4]]
				}
			};
		})
		.reduce((decants: DecantRecipe[], potion): DecantRecipe[] => {
			return [...decants, ...decant(potion, vial)];
		}, [])
		.map((decant) => {
			const inputValue = decant.input.reduce(
				(sum, item) => sum + item.item.latest.low * item.count,
				0
			);
			const outputValue = decant.output.reduce(
				(sum, item) => sum + item.item.latest.sell * item.count,
				0
			);
			const margin = outputValue - inputValue;
			return {
				...decant,
				inputValue,
				outputValue,
				margin
			};
		})
		.sort((a, b) => b.margin - a.margin);
	return {
		potions: potionItems
	};
};
