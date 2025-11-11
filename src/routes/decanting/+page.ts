import type { PageLoad } from './$types';
import type { Decant } from './types';

import potions from './_data/potions';
import decant from './_functions/decant';

export const load: PageLoad = async ({ parent }) => {
	const { map } = await parent();

	if (map === undefined) {
		return {
			potions: []
		};
	}

	const vial = map[229];

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
		.reduce((decants: Decant[], potion): Decant[] => {
			return [...decants, ...decant(potion, vial)];
		}, [])
		.sort((a, b) => b.margin - a.margin);
	return {
		potions: potionItems
	};
};
