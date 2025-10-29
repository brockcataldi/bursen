import type { DecantRecipe, Item, Potion } from '$lib/types';

const decant = (potion: Potion, vial: Item): DecantRecipe[] => {
	return [
		{
			id: `${potion.label}-1-2`,
			label: potion.label,
			from: 1,
			fromIcon: potion.doses[1].icon,
			to: 2,
			toIcon: potion.doses[2].icon,
			input: [
				{
					item: potion.doses[1],
					count: 2
				}
			],
			output: [
				{
					item: potion.doses[2],
					count: 1
				},
				{
					item: vial,
					count: 1
				}
			]
		},
		{
			id: `${potion.label}-1-3`,
			label: potion.label,
			from: 1,
			fromIcon: potion.doses[1].icon,
			to: 3,
			toIcon: potion.doses[3].icon,
			input: [
				{
					item: potion.doses[1],
					count: 3
				}
			],
			output: [
				{
					item: potion.doses[3],
					count: 1
				},
				{
					item: vial,
					count: 2
				}
			]
		},
		{
			id: `${potion.label}-1-4`,
			label: potion.label,
			from: 1,
			fromIcon: potion.doses[1].icon,
			to: 4,
			toIcon: potion.doses[4].icon,
			input: [
				{
					item: potion.doses[1],
					count: 4
				}
			],
			output: [
				{
					item: potion.doses[4],
					count: 1
				},
				{
					item: vial,
					count: 3
				}
			]
		},
		{
			id: `${potion.label}-2-1`,
			label: potion.label,
			from: 2,
			fromIcon: potion.doses[2].icon,
			to: 1,
			toIcon: potion.doses[1].icon,
			input: [
				{
					item: potion.doses[2],
					count: 1
				},
				{
					item: vial,
					count: 1
				}
			],
			output: [
				{
					item: potion.doses[1],
					count: 2
				}
			]
		},
		{
			id: `${potion.label}-2-3`,
			label: potion.label,
			from: 2,
			fromIcon: potion.doses[2].icon,
			to: 3,
			toIcon: potion.doses[3].icon,
			input: [
				{
					item: potion.doses[2],
					count: 2
				}
			],
			output: [
				{
					item: potion.doses[3],
					count: 1
				},
				{
					item: potion.doses[1],
					count: 1
				}
			]
		},
		{
			id: `${potion.label}-2-4`,
			label: potion.label,
			from: 2,
			fromIcon: potion.doses[2].icon,
			to: 4,
			toIcon: potion.doses[4].icon,
			input: [
				{
					item: potion.doses[2],
					count: 2
				}
			],
			output: [
				{
					item: potion.doses[4],
					count: 1
				},
				{
					item: vial,
					count: 1
				}
			]
		},
		{
			id: `${potion.label}-3-1`,
			label: potion.label,
			from: 3,
			fromIcon: potion.doses[3].icon,
			to: 1,
			toIcon: potion.doses[1].icon,
			input: [
				{
					item: potion.doses[3],
					count: 1
				},
				{
					item: vial,
					count: 2
				}
			],
			output: [
				{
					item: potion.doses[1],
					count: 3
				}
			]
		},
		{
			id: `${potion.label}-3-2`,
			label: potion.label,
			from: 3,
			fromIcon: potion.doses[3].icon,
			to: 2,
			toIcon: potion.doses[2].icon,
			input: [
				{
					item: potion.doses[3],
					count: 1
				},
				{
					item: vial,
					count: 1
				}
			],
			output: [
				{
					item: potion.doses[2],
					count: 2
				},
				{
					item: potion.doses[1],
					count: 1
				}
			]
		},
		{
			id: `${potion.label}-3-4`,
			label: potion.label,
			from: 3,
			fromIcon: potion.doses[3].icon,
			to: 4,
			toIcon: potion.doses[4].icon,
			input: [
				{
					item: potion.doses[3],
					count: 2
				}
			],
			output: [
				{
					item: potion.doses[4],
					count: 1
				},
				{
					item: potion.doses[2],
					count: 1
				}
			]
		},
		{
			id: `${potion.label}-4-1`,
			label: potion.label,
			from: 4,
			fromIcon: potion.doses[4].icon,
			to: 1,
			toIcon: potion.doses[1].icon,
			input: [
				{
					item: potion.doses[4],
					count: 1
				},
				{
					item: vial,
					count: 3
				}
			],
			output: [
				{
					item: potion.doses[1],
					count: 4
				}
			]
		},
		{
			id: `${potion.label}-4-2`,
			label: potion.label,
			from: 4,
			fromIcon: potion.doses[4].icon,
			to: 2,
			toIcon: potion.doses[2].icon,
			input: [
				{
					item: potion.doses[4],
					count: 1
				},
				{
					item: vial,
					count: 1
				}
			],
			output: [
				{
					item: potion.doses[2],
					count: 2
				}
			]
		},
		{
			id: `${potion.label}-4-3`,
			label: potion.label,
			from: 4,
			fromIcon: potion.doses[4].icon,
			to: 3,
			toIcon: potion.doses[3].icon,
			input: [
				{
					item: potion.doses[4],
					count: 1
				},
				{
					item: vial,
					count: 1
				}
			],
			output: [
				{
					item: potion.doses[3],
					count: 1
				},
				{
					item: potion.doses[1],
					count: 1
				}
			]
		}
	];
};

export default decant;
