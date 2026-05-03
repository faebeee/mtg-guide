/** MTG Guide design tokens — shared between web (inline styles) and React Native (StyleSheet). */

export const colors = {
	// Backgrounds
	bg: "#0c0e12",
	surface: "#14161c",
	surface2: "#1c1f27",

	// Borders
	border: "#2a2e3a",
	borderBright: "#3a3f52",

	// Accent (gold)
	accent: "#c9a84c",
	accentDim: "#7a6530",

	// Semantic text
	text: "#dde1ec",
	textMuted: "#7a7e96",
	textDim: "#4a4e62",

	// Palette
	blue: "#5b9cf6",
	red: "#e05555",
	purple: "#a07dd6",
	green: "#5ab87a",

	// Phase group colors
	phaseBeginning: "#c9a84c",
	phaseMain: "#5b9cf6",
	phaseCombat: "#e05555",
	phaseEnding: "#a07dd6",
} as const;

export const fontSizes = {
	xs: 11,
	sm: 13,
	base: 15,
	md: 16,
	lg: 18,
	xl: 22,
	"2xl": 26,
} as const;

export const fontWeights = {
	regular: "400" as const,
	medium: "500" as const,
	semibold: "600" as const,
	bold: "700" as const,
};

export const spacing = {
	"0.5": 4,
	"1": 8,
	"1.5": 12,
	"2": 16,
	"3": 24,
	"4": 32,
	"5": 40,
	"6": 48,
} as const;

export const radii = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	full: 9999,
} as const;
