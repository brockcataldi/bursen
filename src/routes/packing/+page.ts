import type { PageLoad } from './$types';

import sets from '$lib/data/sets';

export const load: PageLoad = async ({ parent }) => {
	const { map } = await parent();

    if(map === undefined) {
        return {
            sets: []
        }
    }

    const itemSets = sets.map((set) => {
        const itemSet = map[set.set];
        const items = set.items.map((item) => map[item]);
        const setCost = items.reduce((acc, item) => acc + item.latest.low, 0);

        return {
            set: itemSet,
            items,
            cost: setCost,
            margin: itemSet.latest.sell - setCost
        }
    }).sort((a, b) => b.margin - a.margin);

	return {
		sets: itemSets
	};
};