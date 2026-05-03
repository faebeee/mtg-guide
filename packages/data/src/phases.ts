export type PhaseMode = "simplified" | "full";

export interface Tip {
	text: string;
}

export interface PriorityNote {
	/** Short explanation of how priority works in this step */
	text: string;
}

export interface Phase {
	id: string;
	name: string;
	/** Short label used in the progress bar */
	shortName: string;
	/** Which simplified group this belongs to (for simplified mode grouping) */
	group: string;
	icon: string;
	color: string;
	description: string;
	playerActions: string[];
	tips: Tip[];
	priority: PriorityNote;
	/** Keyword terms mentioned in this phase (linked to glossary) */
	keywords: string[];
}

export const FULL_PHASES: Phase[] = [
	{
		id: "untap",
		name: "Untap Step",
		shortName: "Untap",
		group: "beginning",
		icon: "↺",
		color: "#c8a951",
		description:
			"You untap all of your permanents (cards on the battlefield). Tap symbols rotate to show a card has been used — this step resets them so they are ready to use again.",
		playerActions: [
			"All your tapped permanents become untapped automatically.",
			"You do not need to do anything — this step is automatic.",
		],
		tips: [
			{
				text: 'Cards with "vigilance" stay untapped when they attack, so they\'ll still be untapped now.',
			},
			{
				text: "Some effects prevent a permanent from untapping — watch out for those.",
			},
		],
		priority: {
			text: "Neither player receives priority during the Untap Step. No spells or abilities can be played here. It happens automatically.",
		},
		keywords: ["untap", "vigilance", "permanent", "tapped"],
	},
	{
		id: "upkeep",
		name: "Upkeep Step",
		shortName: "Upkeep",
		group: "beginning",
		icon: "⏰",
		color: "#c8a951",
		description:
			'Many cards have triggered abilities that say "at the beginning of your upkeep." These abilities trigger now. This is also a common moment to pay ongoing costs.',
		playerActions: [
			'Resolve any "at the beginning of your upkeep" triggers.',
			"Pay any upkeep costs on cards you control (or sacrifice them if you can't).",
			"Cast instants or activate abilities if you want to.",
		],
		tips: [
			{
				text: "Read your cards carefully — many have upkeep triggers you might forget.",
			},
			{
				text: "Your opponent can also play instants and abilities during your upkeep.",
			},
		],
		priority: {
			text: "Both players receive priority here. You (the active player) get priority first. You and your opponent can cast instants and activate abilities before moving on.",
		},
		keywords: ["upkeep", "triggered ability", "instant", "activate"],
	},
	{
		id: "draw",
		name: "Draw Step",
		shortName: "Draw",
		group: "beginning",
		icon: "🃏",
		color: "#c8a951",
		description:
			"You draw one card from the top of your library. On the very first turn of the game, the first player skips this step.",
		playerActions: [
			"Draw one card from the top of your library.",
			"You may cast instants or activate abilities after drawing.",
		],
		tips: [
			{ text: "The first player in a game skips their draw step on turn 1." },
			{
				text: "Some effects let you draw additional cards or replace your draw.",
			},
		],
		priority: {
			text: "After you draw, both players get priority. You can cast instants or activate abilities before moving to your main phase.",
		},
		keywords: ["draw", "library"],
	},
	{
		id: "main1",
		name: "Pre-Combat Main Phase",
		shortName: "Main 1",
		group: "precombat-main",
		icon: "⚡",
		color: "#4a9eff",
		description:
			"Your first main phase — the heart of your turn. You can play a land and cast spells here. Most creatures and sorceries are cast during main phases.",
		playerActions: [
			"Play one land from your hand (you may only do this once per turn).",
			"Cast creature, sorcery, enchantment, artifact, or planeswalker spells.",
			"Cast instants and activate abilities.",
			"Activate planeswalker loyalty abilities.",
		],
		tips: [
			{
				text: "Only one land per turn — choose wisely if you have multiple options.",
			},
			{
				text: "Sorceries and creatures can only be cast during your main phase, when the stack is empty.",
			},
			{
				text: "Consider attacking before casting if you want a creature to be a surprise.",
			},
		],
		priority: {
			text: "You have priority as the active player. After each spell you cast, your opponent gets a chance to respond with instants or abilities before the spell resolves.",
		},
		keywords: [
			"land",
			"sorcery",
			"creature",
			"enchantment",
			"artifact",
			"planeswalker",
			"cast",
			"stack",
		],
	},
	{
		id: "begin-combat",
		name: "Beginning of Combat Step",
		shortName: "Begin Combat",
		group: "combat",
		icon: "⚔️",
		color: "#e05555",
		description:
			"Combat is about to begin. This is the last chance for your opponent to remove or tap creatures before you declare attackers.",
		playerActions: [
			"Cast instants or activate abilities.",
			"Consider whether you want to proceed with attacking.",
		],
		tips: [
			{
				text: "Your opponent may tap or destroy your creatures here before attackers are declared.",
			},
			{
				text: 'Effects that trigger "at the beginning of combat" go on the stack now.',
			},
		],
		priority: {
			text: "Both players receive priority. Your opponent can use removal spells here to eliminate your attackers before you even get to swing!",
		},
		keywords: ["combat", "instant", "removal"],
	},
	{
		id: "declare-attackers",
		name: "Declare Attackers Step",
		shortName: "Attackers",
		group: "combat",
		icon: "⚔️",
		color: "#e05555",
		description:
			"You choose which of your creatures will attack and what they are attacking (your opponent directly, or their planeswalkers). Attacking creatures become tapped.",
		playerActions: [
			"Choose any of your untapped creatures to attack with.",
			"Declare what each attacker is targeting: your opponent or one of their planeswalkers.",
			"Tap all attacking creatures (unless they have vigilance).",
		],
		tips: [
			{
				text: 'Creatures with "summoning sickness" (entered this turn) cannot attack.',
			},
			{
				text: "Vigilance creatures do not tap when they attack — they can still block next turn.",
			},
			{ text: "You don't have to attack if you don't want to." },
		],
		priority: {
			text: "After attackers are declared, both players get priority. Your opponent can now cast instants to kill or pump your attackers before blockers are declared.",
		},
		keywords: [
			"attack",
			"tap",
			"summoning sickness",
			"vigilance",
			"planeswalker",
		],
	},
	{
		id: "declare-blockers",
		name: "Declare Blockers Step",
		shortName: "Blockers",
		group: "combat",
		icon: "🛡️",
		color: "#e05555",
		description:
			"Your opponent chooses which of their untapped creatures will block your attackers. Multiple creatures can block a single attacker.",
		playerActions: [
			"Wait while your opponent declares their blockers.",
			"If multiple creatures block one of your attackers, you choose the order they take damage.",
			"Cast instants or activate abilities in response.",
		],
		tips: [
			{
				text: "Your opponent does not have to block — they can let attackers through to deal damage directly.",
			},
			{
				text: 'Creatures with "flying" can only be blocked by creatures with flying or reach.',
			},
			{
				text: "When multiple creatures block one attacker, you assign the order damage is dealt.",
			},
		],
		priority: {
			text: "After blockers are declared, both players get priority again. This is a common moment for combat tricks — instants that pump power/toughness or grant abilities.",
		},
		keywords: [
			"block",
			"flying",
			"reach",
			"trample",
			"deathtouch",
			"first strike",
		],
	},
	{
		id: "first-strike-damage",
		name: "First Strike Damage Step",
		shortName: "First Strike",
		group: "combat",
		icon: "💥",
		color: "#e05555",
		description:
			"Only exists if a creature with first strike or double strike is in combat. Those creatures deal their damage before other creatures.",
		playerActions: [
			"Creatures with first strike or double strike deal damage now.",
			"A creature that dies here cannot deal damage in the normal damage step.",
		],
		tips: [
			{
				text: "This step only happens if a first strike or double strike creature is in combat.",
			},
			{
				text: "Creatures with deathtouch and first strike are especially powerful — they kill blockers before those blockers deal damage back.",
			},
		],
		priority: {
			text: "After first strike damage is dealt, both players get priority before the regular damage step. You can cast instants based on what survived.",
		},
		keywords: ["first strike", "double strike", "deathtouch"],
	},
	{
		id: "combat-damage",
		name: "Combat Damage Step",
		shortName: "Damage",
		group: "combat",
		icon: "💥",
		color: "#e05555",
		description:
			"All remaining creatures in combat deal their damage simultaneously. Creatures that take damage equal to or greater than their toughness are destroyed.",
		playerActions: [
			"All creatures in combat deal damage equal to their power simultaneously.",
			"Creatures with lethal damage are destroyed and go to the graveyard.",
			"Unblocked attackers deal their damage to the defending player (or planeswalker).",
		],
		tips: [
			{
				text: "Damage is dealt simultaneously — both a 2/2 and a 3/3 die when they fight each other.",
			},
			{
				text: '"Trample" lets excess damage carry over to the defending player even if blocked.',
			},
			{
				text: '"Lifelink" means your creature\'s damage also heals you for that amount.',
			},
		],
		priority: {
			text: "After damage is assigned, both players get priority. You can cast instants here — for example, to save a creature with regenerate or a pump spell.",
		},
		keywords: [
			"power",
			"toughness",
			"trample",
			"lifelink",
			"deathtouch",
			"graveyard",
		],
	},
	{
		id: "end-of-combat",
		name: "End of Combat Step",
		shortName: "End Combat",
		group: "combat",
		icon: "🏁",
		color: "#e05555",
		description:
			'Combat is wrapping up. Effects that last "until end of combat" expire. Creatures leave combat.',
		playerActions: [
			"Cast instants or activate abilities.",
			'Effects that last "until end of combat" end here.',
		],
		tips: [
			{
				text: "A good time to use any abilities that should happen after combat but before your second main phase.",
			},
		],
		priority: {
			text: "Both players have priority here. Last chance to interact before the post-combat main phase.",
		},
		keywords: ["combat"],
	},
	{
		id: "main2",
		name: "Post-Combat Main Phase",
		shortName: "Main 2",
		group: "postcombat-main",
		icon: "⚡",
		color: "#4a9eff",
		description:
			"Your second main phase. Works exactly like the first — you can cast spells and (if you haven't yet) play a land. Use this to follow up after combat.",
		playerActions: [
			"Play a land if you haven't this turn.",
			"Cast creature, sorcery, enchantment, artifact, or planeswalker spells.",
			"Cast instants and activate abilities.",
		],
		tips: [
			{
				text: "Often a good time to play creatures you didn't want to tap before attacking.",
			},
			{ text: "Spend remaining mana here — use it or lose it at end of turn." },
		],
		priority: {
			text: "Same as the first main phase — you have priority, but your opponent can respond to anything you cast with instants and abilities.",
		},
		keywords: [
			"land",
			"sorcery",
			"creature",
			"enchantment",
			"artifact",
			"planeswalker",
		],
	},
	{
		id: "end-step",
		name: "End Step",
		shortName: "End Step",
		group: "ending",
		icon: "🌙",
		color: "#9b6dd1",
		description:
			'Your turn is almost over. Triggered abilities that say "at the beginning of your end step" or "at end of turn" trigger now. Your opponent can cast instants.',
		playerActions: [
			'Resolve any "at end of turn" or "at beginning of end step" triggers.',
			"Cast instants or activate abilities.",
		],
		tips: [
			{
				text: 'Common triggers: "at end of turn, sacrifice this creature" or "at end of turn, draw a card."',
			},
			{
				text: "Your opponent may cast instants here — they might be saving up for this moment.",
			},
		],
		priority: {
			text: "Both players receive priority. Your opponent can still cast instants! This is a popular time to cast instants since after your cleanup you'll discard — your opponent might want to act before then.",
		},
		keywords: ["end of turn", "triggered ability", "instant"],
	},
	{
		id: "cleanup",
		name: "Cleanup Step",
		shortName: "Cleanup",
		group: "ending",
		icon: "🧹",
		color: "#9b6dd1",
		description:
			'The final step. You discard down to your maximum hand size (usually 7 cards). All damage is removed from creatures. "Until end of turn" effects expire.',
		playerActions: [
			"If you have more than 7 cards in hand, discard down to 7.",
			"All damage is removed from all creatures.",
			'Effects that last "until end of turn" or "this turn" expire.',
		],
		tips: [
			{
				text: "Choose carefully which cards to discard — you can't get them back easily.",
			},
			{
				text: "Damage wears off at cleanup — a 2/2 that took 1 damage is fully healed for your opponent's turn.",
			},
		],
		priority: {
			text: "Normally no priority is given here. However, if a triggered ability goes on the stack during cleanup, both players do receive priority to respond before it resolves.",
		},
		keywords: ["hand size", "discard", "graveyard"],
	},
];

export interface SimplifiedPhase {
	id: string;
	name: string;
	shortName: string;
	icon: string;
	color: string;
	description: string;
	playerActions: string[];
	tips: Tip[];
	priority: PriorityNote;
	keywords: string[];
	/** The full step IDs this simplified phase covers */
	covers: string[];
}

export const SIMPLIFIED_PHASES: SimplifiedPhase[] = [
	{
		id: "beginning",
		name: "Beginning Phase",
		shortName: "Start",
		icon: "☀️",
		color: "#c8a951",
		description:
			"Your turn begins. First you automatically untap all your permanents. Then you handle any upkeep triggers on your cards. Finally, you draw one card from your library.",
		playerActions: [
			"Untap all your permanents (automatic — you don't need to do anything).",
			'Resolve any "at the beginning of your upkeep" triggers.',
			"Draw one card from your library.",
		],
		tips: [
			{ text: "Read your cards — many have upkeep triggers you might forget." },
			{ text: "The first player skips the draw step on turn 1." },
			{
				text: "Your opponent can cast instants during upkeep and after your draw.",
			},
		],
		priority: {
			text: "The Untap Step has no priority — it's automatic. During Upkeep and after your Draw, both players can cast instants and activate abilities. You go first.",
		},
		keywords: ["untap", "upkeep", "draw", "library", "triggered ability"],
		covers: ["untap", "upkeep", "draw"],
	},
	{
		id: "precombat-main",
		name: "Pre-Combat Main Phase",
		shortName: "Main 1",
		icon: "⚡",
		color: "#4a9eff",
		description:
			"Your first main phase. You can play a land and cast spells. Most players cast their most important spells here before knowing how combat will go.",
		playerActions: [
			"Play one land from your hand (once per turn total, shared with Main 2).",
			"Cast creatures, sorceries, enchantments, artifacts, and planeswalkers.",
			"Cast instants and activate abilities.",
		],
		tips: [
			{ text: "One land per turn — think carefully about which to play." },
			{
				text: "Sorceries can only be cast during your main phase when nothing else is on the stack.",
			},
		],
		priority: {
			text: "You have priority first. After each spell you cast, your opponent gets a chance to respond before it resolves.",
		},
		keywords: [
			"land",
			"sorcery",
			"creature",
			"enchantment",
			"artifact",
			"planeswalker",
			"stack",
		],
		covers: ["main1"],
	},
	{
		id: "combat",
		name: "Combat Phase",
		shortName: "Combat",
		icon: "⚔️",
		color: "#e05555",
		description:
			"Attack with your creatures! Your opponent can choose which of their creatures will block. Creatures deal damage equal to their power. Those with damage equal to or greater than their toughness are destroyed.",
		playerActions: [
			"Choose which untapped creatures to attack with (they become tapped).",
			"Your opponent chooses how to block your attackers.",
			"If multiple creatures block one attacker, you decide the damage order.",
			"Creatures deal damage equal to their power simultaneously.",
		],
		tips: [
			{
				text: "Creatures that entered the battlefield this turn have summoning sickness — they can't attack.",
			},
			{
				text: "Your opponent doesn't have to block — they can take the damage directly.",
			},
			{
				text: "Flying creatures can only be blocked by fliers or creatures with reach.",
			},
			{
				text: "Trample lets excess damage carry over to the defending player when blocked.",
			},
		],
		priority: {
			text: "Priority is passed multiple times during combat: before attackers are declared, after attackers, after blockers, and after damage. Your opponent can use instants and abilities at each of these moments — watch out for combat tricks!",
		},
		keywords: [
			"attack",
			"block",
			"power",
			"toughness",
			"summoning sickness",
			"flying",
			"reach",
			"trample",
			"first strike",
			"double strike",
			"deathtouch",
			"lifelink",
		],
		covers: [
			"begin-combat",
			"declare-attackers",
			"declare-blockers",
			"first-strike-damage",
			"combat-damage",
			"end-of-combat",
		],
	},
	{
		id: "postcombat-main",
		name: "Post-Combat Main Phase",
		shortName: "Main 2",
		icon: "⚡",
		color: "#4a9eff",
		description:
			"A second main phase after combat. Works exactly like the first. Great for casting creatures you were saving, or spending remaining mana.",
		playerActions: [
			"Play a land if you haven't this turn.",
			"Cast creatures, sorceries, enchantments, artifacts, and planeswalkers.",
			"Cast instants and activate abilities.",
		],
		tips: [
			{
				text: "Good time to play creatures you didn't want tapping before attacking.",
			},
			{
				text: "Spend your remaining mana here — unused mana is lost at end of turn.",
			},
		],
		priority: {
			text: "Same as the first main phase — you go first, but your opponent can respond to anything you cast.",
		},
		keywords: ["land", "mana"],
		covers: ["main2"],
	},
	{
		id: "ending",
		name: "Ending Phase",
		shortName: "End",
		icon: "🌙",
		color: "#9b6dd1",
		description:
			'Your turn ends. Resolve any "at end of turn" triggers, then discard down to 7 cards if needed. All damage is removed from creatures and "until end of turn" effects expire.',
		playerActions: [
			'Resolve "at end of turn" triggered abilities.',
			"Discard down to 7 cards if you have more.",
			"All damage on creatures is removed (automatic).",
			'All "until end of turn" effects expire (automatic).',
		],
		tips: [
			{
				text: "Choose carefully what to discard — consider what your opponent might do on their turn.",
			},
			{
				text: "Your opponent can still cast instants during the end step before cleanup.",
			},
		],
		priority: {
			text: "During the End Step, both players can cast instants and use abilities. The Cleanup Step normally has no priority, but can if a triggered ability fires.",
		},
		keywords: ["end of turn", "hand size", "discard"],
		covers: ["end-step", "cleanup"],
	},
];
