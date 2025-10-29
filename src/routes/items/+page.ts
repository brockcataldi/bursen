import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { items } = await parent();

	return {
		items
	};
};
