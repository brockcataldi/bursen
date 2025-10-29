import type { ItemSetIndexes } from '$lib/types';

const sets: ItemSetIndexes[] = [
	// Bronze set (lg)
	{
		set: 12960,
		items: [1155, 1117, 1075, 1189]
	},
	// Bronze set (sk)
	{
		set: 12962,
		items: [1155, 1117, 1087, 1189]
	},
	// Bronze gold-trimmed set (lg)
	{
		set: 12968,
		items: [12211, 12205, 12207, 12213]
	},
	// Bronze gold-trimmed set (sk)
	{
		set: 12970,
		items: [12211, 12205, 12209, 12213]
	},
	// Bronze trimmed set (lg)
	{
		set: 12964,
		items: [12221, 12215, 12217, 12223]
	},
	// Bronze trimmed set (sk)
	{
		set: 12966,
		items: [12221, 12215, 12219, 12223]
	},
	// Iron set (lg)
	{
		set: 12972,
		items: [1153, 1115, 1067, 1193]
	},
	// Iron set (sk)
	{
		set: 12974,
		items: [1153, 1115, 1081, 1191]
	},
	// Iron gold-trimmed set (lg)
	{
		set: 12980,
		items: [12241, 12235, 12237, 12243]
	},
	// Iron gold-trimmed set (sk)
	{
		set: 12982,
		items: [12241, 12235, 12239, 12243]
	},
	// Iron trimmed set (lg)
	{
		set: 12976,
		items: [12231, 12225, 12227, 12233]
	},
	// Iron trimmed set (sk)
	{
		set: 12978,
		items: [12231, 12225, 12229, 12233]
	},
	// Steel set (lg)
	{
		set: 12984,
		items: [1157, 1119, 1069, 1193]
	},
	// Steel set (sk)
	{
		set: 12986,
		items: [1157, 1119, 1083, 1193]
	},
	// Steel gold-trimmed set (lg)
	{
		set: 20382,
		items: [20178, 20169, 20172, 20181]
	},
	// Steel gold-trimmed set (sk)
	{
		set: 20385,
		items: [20178, 20169, 20175, 20181]
	},
	// Steel trimmed set (lg)
	{
		set: 20376,
		items: [20193, 20184, 20187, 20196]
	},
	// Steel trimmed set (sk)
	{
		set: 20379,
		items: [20193, 20184, 20190, 20196]
	},
	// Black set (lg)
	{
		set: 12988,
		items: [1165, 1125, 1077, 1195]
	},
	// Black set (sk)
	{
		set: 12990,
		items: [1165, 1125, 1089, 1195]
	},
	// Black gold-trimmed set (lg)
	{
		set: 12996,
		items: [2595, 2591, 2593, 2597]
	},
	// Black gold-trimmed set (sk)
	{
		set: 12998,
		items: [2595, 2591, 3473, 2597]
	},
	// Black trimmed set (lg)
	{
		set: 12992,
		items: [2587, 2583, 2585, 2589]
	},
	// Black trimmed set (sk)
	{
		set: 12994,
		items: [2587, 2583, 3472, 2589]
	},
	// Mithril set (lg)
	{
		set: 13000,
		items: [1159, 1121, 1071, 1197]
	},
	// Mithril set (sk)
	{
		set: 13002,
		items: [1159, 1121, 1085, 1197]
	},
	// Mithril gold-trimmed set (lg)
	{
		set: 13008,
		items: [12283, 12277, 12279, 12281]
	},
	// Mithril gold-trimmed set (sk)
	{
		set: 13010,
		items: [12283, 12277, 12285, 12281]
	},
	// Mithril trimmed set (lg)
	{
		set: 13004,
		items: [12293, 12287, 12289, 12291]
	},
	// Mithril trimmed set (sk)
	{
		set: 13006,
		items: [12293, 12287, 12295, 12291]
	},
	// Adamant set (lg)
	{
		set: 13012,
		items: [1161, 1123, 1073, 1199]
	},
	// Adamant set (sk)
	{
		set: 13014,
		items: [1161, 1123, 1091, 1199]
	},
	// Adamant gold-trimmed set (lg)
	{
		set: 13020,
		items: [2613, 2607, 2609, 2611]
	},
	// Adamant gold-trimmed set (sk)
	{
		set: 13022,
		items: [2613, 2607, 3475, 2611]
	},
	// Adamant trimmed set (lg)
	{
		set: 13016,
		items: [2605, 2599, 2601, 2603]
	},
	// Adamant trimmed set (sk)
	{
		set: 13018,
		items: [2605, 2599, 3474, 2603]
	},
	// Rune armour set (lg)
	{
		set: 13024,
		items: [1163, 1127, 1079, 1201]
	},
	// Rune armour set (sk)
	{
		set: 13026,
		items: [1163, 1127, 1093, 1201]
	},
	// Rune gold-trimmed set (lg)
	{
		set: 13032,
		items: [2619, 2615, 2617, 2621]
	},
	// Rune gold-trimmed set (sk)
	{
		set: 13034,
		items: [2619, 2615, 3476, 2621]
	},
	// Rune trimmed set (lg)
	{
		set: 13028,
		items: [2627, 2623, 2625, 2629]
	},
	// Rune trimmed set (sk)
	{
		set: 13030,
		items: [2627, 2623, 3477, 2629]
	},
	// Dragon armour set (lg)
	{
		set: 21882,
		items: [11335, 21892, 4087, 21895]
	},
	// Dragon armour set (sk)
	{
		set: 21885,
		items: [11335, 21892, 4585, 21895]
	},
	// Gilded armour set (lg)
	{
		set: 13036,
		items: [3486, 3481, 3483, 3488]
	},
	// Gilded armour set (sk)
	{
		set: 13038,
		items: [3486, 3481, 3485, 3488]
	},
	// Guthix armour set (lg)
	{
		set: 13048,
		items: [2673, 2669, 2671, 2675]
	},
	// Guthix armour set (sk)
	{
		set: 13050,
		items: [2673, 2669, 3480, 2675]
	},
	// Saradomin armour set (lg)
	{
		set: 13040,
		items: [2665, 2661, 2663, 2667]
	},
	// Saradomin armour set (sk)
	{
		set: 13042,
		items: [2665, 2661, 3479, 2667]
	},
	// Zamorak armour set (lg)
	{
		set: 13044,
		items: [2657, 2653, 2655, 2659]
	},
	// Zamorak armour set (sk)
	{
		set: 13046,
		items: [2657, 2653, 3478, 2659]
	},
	// Ancient rune armour set (lg)
	{
		set: 13060,
		items: [12466, 12460, 12462, 12468]
	},
	// Ancient rune armour set (sk)
	{
		set: 13062,
		items: [12466, 12460, 12464, 12468]
	},
	// Armadyl rune armour set (lg)
	{
		set: 13052,
		items: [12476, 12470, 12472, 12478]
	},
	// Armadyl rune armour set (sk)
	{
		set: 13054,
		items: [12476, 12470, 12474, 12478]
	},
	// Bandos rune armour set (lg)
	{
		set: 13056,
		items: [12486, 12480, 12482, 12488]
	},
	// Bandos rune armour set (sk)
	{
		set: 13058,
		items: [12486, 12480, 12484, 12488]
	},
	// Initiate harness m
	{
		set: 9668,
		items: [5574, 5575, 5576]
	},
	// Proselyte harness m
	{
		set: 9666,
		items: [9672, 9674, 9676]
	},
	// Proselyte harness f
	{
		set: 9670,
		items: [9672, 9674, 9678]
	},
	// Green dragonhsete set
	{
		set: 12865,
		items: [1135, 1099, 1065]
	},
	// Blue dragonhsete set
	{
		set: 12867,
		items: [2499, 2493, 2487]
	},
	// Red dragonhsete set
	{
		set: 12869,
		items: [2501, 2495, 2489]
	},
	// Black dragonhsete set
	{
		set: 12871,
		items: [2503, 2497, 2491]
	},
	// Gilded dragonhsete set
	{
		set: 23124,
		items: [23264, 23267, 23261]
	},
	// Guthix dragonhsete set
	{
		set: 13165,
		items: [10382, 10378, 10380, 10376]
	},
	// Saradomin dragonhsete set
	{
		set: 13163,
		items: [10390, 10386, 10388, 10384]
	},
	// Zamorak dragonhsete set
	{
		set: 13161,
		items: [10374, 10370, 10372, 10368]
	},
	// Ancient dragonhsete set
	{
		set: 13171,
		items: [12496, 12492, 12494, 12490]
	},
	// Armadyl dragonhsete set
	{
		set: 13169,
		items: [12512, 12508, 12510, 12506]
	},
	// Bandos dragonhsete set
	{
		set: 13167,
		items: [12504, 12500, 12502, 12498]
	},
	// Ahrim's armour set
	{
		set: 12881,
		items: [4708, 4712, 4714, 4710]
	},
	// Dharok's armour set
	{
		set: 12877,
		items: [4716, 4720, 4722, 4718]
	},
	// Guthan's armour set
	{
		set: 12873,
		items: [4724, 4728, 4730, 4726]
	},
	// Karil's armour set
	{
		set: 12883,
		items: [4732, 4736, 4738, 4734]
	},
	// Torag's armour set
	{
		set: 12879,
		items: [4745, 4749, 4751, 4747]
	},
	// Verac's armour set
	{
		set: 12875,
		items: [4753, 4757, 4759, 4755]
	},
	// Mystic set (blue)
	{
		set: 23113,
		items: [4089, 4091, 4093, 4095, 4097]
	},
	// Mystic set (light)
	{
		set: 23110,
		items: [4109, 4111, 4113, 4115, 4117]
	},
	// Mystic set (dark)
	{
		set: 23116,
		items: [4099, 4101, 4103, 4105, 4107]
	},
	// Mystic set (dusk)
	{
		set: 23119,
		items: [23047, 23050, 23053, 23056, 23059]
	},
	// Book of balance page set
	{
		set: 13153,
		items: [3835, 3836, 3837, 3838]
	},
	// Holy book page set
	{
		set: 13149,
		items: [3827, 3828, 3829, 3830]
	},
	// Unholy book page set
	{
		set: 13151,
		items: [3831, 3832, 3833, 3834]
	},
	// Book of darkness page set
	{
		set: 13159,
		items: [12621, 12622, 12623, 12624]
	},
	// Book of law page set
	{
		set: 13157,
		items: [12617, 12618, 12619, 12620]
	},
	// Book of war page set
	{
		set: 13155,
		items: [12613, 12614, 12615, 12616]
	},
	// Blood moon armour set
	{
		set: 31136,
		items: [29028, 29022, 29025, 28997]
	},
	// Blue moon armour set
	{
		set: 31139,
		items: [29019, 29013, 29016, 28988]
	},
	// Eclipse moon armour set
	{
		set: 31142,
		items: [29010, 29004, 29007, 29000]
	},
	// Spined armour set
	{
		set: 31157,
		items: [6131, 6133, 6135, 6149, 6143]
	},
	// Rock-shell armour set
	{
		set: 31151,
		items: [6128, 6129, 6130, 6151, 6145]
	},
	// Skeletal armour set
	{
		set: 31154,
		items: [6137, 6139, 6141, 6153, 6147]
	},
	// Dwarf cannon set
	{
		set: 12863,
		items: [10, 6, 8, 12]
	},
	// Combat potion set
	{
		set: 13064,
		items: [2428, 2432, 113]
	},
	// Super potion set
	{
		set: 13066,
		items: [2436, 2442, 2440]
	},
	// Partyhat set
	{
		set: 13173,
		items: [1038, 1040, 1042, 1044, 1046, 1048]
	},
	// Halloween mask set
	{
		set: 13175,
		items: [1057, 1055, 1053]
	},
	// Ancestral robes set
	{
		set: 21049,
		items: [21018, 21021, 21024]
	},
	// Inquisitor's armour set
	{
		set: 24488,
		items: [24419, 24420, 24421]
	},
	// Dagon'hai robes set
	{
		set: 24333,
		items: [24288, 24291, 24294]
	},
	// Justiciar armour set
	{
		set: 22438,
		items: [22326, 22327, 22328]
	},
	// Oathplate armour set
	{
		set: 30744,
		items: [30750, 30753, 30756]
	},
	// Obssetian armour set
	{
		set: 21279,
		items: [21298, 21301, 21304]
	},
	// Sunfire fanatic armour set
	{
		set: 29424,
		items: [28933, 28936, 28939]
	},
	// Dragonstone armour set
	{
		set: 23667,
		items: [24034, 24037, 24040, 24046, 24043]
	},
	// Masori armour set (f)
	{
		set: 27355,
		items: [27235, 27238, 27241]
	},
	// Torva armour set
	{
		set: 31145,
		items: [26382, 26384, 26386]
	},
	// Virtus armour set
	{
		set: 31148,
		items: [26241, 26243, 26245]
	},
	// Swampbark armour set
	{
		set: 31160,
		items: [25398, 25389, 25401, 25392, 25395]
	},
	// Bloodbark armour set
	{
		set: 31163,
		items: [25413, 25404, 25416, 25407, 25410]
	},
	// Mixed hsete armour set
	{
		set: 31166,
		items: [29280, 29283, 29286, 29289]
	},
	// Hueycoatl hsete armour set
	{
		set: 31169,
		items: [30073, 30076, 30079, 30082]
	}
];

export default sets;
