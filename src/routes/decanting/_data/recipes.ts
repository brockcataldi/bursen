import type { DecantRecipe } from '../types';

export const recipes: DecantRecipe[] = [
	{
		to: 1,
		from: 2,
		input: [[1, 2]],
		output: [
			[2, 1],
			[0, 1]
		]
	},
	{
		to: 1,
		from: 3,
		input: [[1, 3]],
		output: [
			[3, 1],
			[0, 2]
		]
	},
	{
		to: 1,
		from: 4,
		input: [[1, 4]],
		output: [
			[4, 1],
			[0, 3]
		]
	},
	{
		to: 2,
		from: 1,
		input: [
			[2, 1],
			[0, 1]
		],
		output: [[1, 2]]
	},
	{
		to: 2,
		from: 3,
		input: [[2, 2]],
		output: [
			[3, 1],
			[1, 1]
		]
	},
	{
		to: 2,
		from: 4,
		input: [[2, 2]],
		output: [
			[4, 1],
			[0, 1]
		]
	},
	{
		to: 3,
		from: 1,
		input: [
			[3, 1],
			[0, 2]
		],
		output: [[1, 3]]
	},
	{
		to: 3,
		from: 2,
		input: [
			[3, 1],
			[0, 1]
		],
		output: [
			[2, 1],
			[1, 1]
		]
	},
	{
		to: 3,
		from: 4,
		input: [
			[3, 2],
			[0, 1]
		],
		output: [
			[4, 1],
			[2, 1]
		]
	},
	{
		to: 4,
		from: 1,
		input: [
			[4, 1],
			[0, 3]
		],
		output: [[1, 4]]
	},
	{
		to: 4,
		from: 2,
		input: [
			[4, 1],
			[0, 1]
		],
		output: [[2, 2]]
	},
	{
		to: 4,
		from: 3,
		input: [
			[4, 1],
			[0, 1]
		],
		output: [
			[3, 1],
			[1, 1]
		]
	}
] as const;
