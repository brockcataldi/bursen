import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, url }) => {
	const { items } = await parent();

	return {
		items
	};
};
