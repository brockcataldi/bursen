import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import z from 'zod';
import type { PageLoad } from './$types';

const IdSchema = z.coerce.number().min(0).default(100);

export const load: PageLoad = async ({ parent, params }) => {
	const { map } = await parent();

	if (map === undefined) {
		goto(resolve('/'));
		return;
	}

	const id = IdSchema.safeParse(params.item);

	if (!id.success) {
		goto(resolve('/'));
		return;
	}

	return {
		item: map[id.data]
	};
};
