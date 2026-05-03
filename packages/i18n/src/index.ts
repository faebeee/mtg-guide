import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import deGlossary from "./locales/de/glossary.json";
import dePhases from "./locales/de/phases.json";
import deUi from "./locales/de/ui.json";
import enGlossary from "./locales/en/glossary.json";
import enPhases from "./locales/en/phases.json";
import enUi from "./locales/en/ui.json";

export type SupportedLocale = "en" | "de";
export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "de"];

// Initialise synchronously — all resources are bundled, no async plugins.
i18next.use(initReactI18next).init({
	lng: "en",
	fallbackLng: "en",
	ns: ["ui", "phases", "glossary"],
	defaultNS: "ui",
	resources: {
		en: { ui: enUi, phases: enPhases, glossary: enGlossary },
		de: { ui: deUi, phases: dePhases, glossary: deGlossary },
	},
	interpolation: { escapeValue: false },
});

export const i18n = i18next;
export { useTranslation } from "react-i18next";

export function changeLanguage(lng: SupportedLocale): Promise<unknown> {
	return i18next.changeLanguage(lng);
}

/**
 * Converts an English glossary term string to its i18n key.
 * e.g. "First Strike" → "firstStrike", "Counter (a spell)" → "counterASpell"
 */
export function termToI18nKey(term: string): string {
	return term
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, "")
		.trim()
		.replace(/ +(\w)/g, (_, c: string) => c.toUpperCase());
}
