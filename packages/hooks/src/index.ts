import {
	FULL_PHASES,
	type Phase,
	SIMPLIFIED_PHASES,
	type SimplifiedPhase,
} from "@mtg-guide/data";
import { useCallback, useEffect, useRef, useState } from "react";

export type PhaseMode = "simplified" | "full";
export type AnyPhase = Phase | SimplifiedPhase;

/** Platform-agnostic key/value storage adapter. */
export interface StorageAdapter {
	getItem(key: string): string | null | Promise<string | null>;
	setItem(key: string, value: string): void | Promise<void>;
}

export function getPhases(mode: PhaseMode): AnyPhase[] {
	return mode === "simplified" ? SIMPLIFIED_PHASES : FULL_PHASES;
}

/**
 * Encapsulates all Turn Phase Guide wizard state.
 * Storage is injected so web uses localStorage and native uses AsyncStorage.
 */
export function usePhaseWizard(storage?: StorageAdapter) {
	const [mode, setMode] = useState<PhaseMode>("simplified");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [turnCount, setTurnCount] = useState(1);
	const [justReset, setJustReset] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	// Capture storage in a ref so the load effect only runs once on mount
	const storageRef = useRef(storage);

	// Load persisted mode on mount
	useEffect(() => {
		async function load() {
			if (!storageRef.current) {
				setHydrated(true);
				return;
			}
			try {
				const saved = await storageRef.current.getItem("mtg-mode");
				if (saved === "simplified" || saved === "full") {
					setMode(saved);
				}
			} finally {
				setHydrated(true);
			}
		}
		load();
	}, []);

	const phases = getPhases(mode);
	const phase = phases[currentIndex];
	const isLast = currentIndex === phases.length - 1;

	const changeMode = useCallback(
		(m: PhaseMode) => {
			setMode(m);
			setCurrentIndex(0);
			storage?.setItem("mtg-mode", m);
		},
		[storage],
	);

	const next = useCallback(() => {
		if (isLast) {
			setTurnCount((t) => t + 1);
			setCurrentIndex(0);
			setJustReset(true);
			setTimeout(() => setJustReset(false), 1600);
		} else {
			setCurrentIndex((i) => i + 1);
		}
	}, [isLast]);

	const prev = useCallback(() => {
		if (currentIndex > 0) setCurrentIndex((i) => i - 1);
	}, [currentIndex]);

	return {
		mode,
		phases,
		phase,
		currentIndex,
		setCurrentIndex,
		turnCount,
		isLast,
		justReset,
		hydrated,
		changeMode,
		next,
		prev,
	};
}

/**
 * Encapsulates glossary search/filter state.
 * No routing — callers handle URL sync if needed.
 */
export function useGlossarySearch(initialQuery = "") {
	const [query, setQuery] = useState(initialQuery);

	// Keep in sync if initialQuery changes (e.g., from URL params on web)
	const prevInitial = useRef(initialQuery);
	useEffect(() => {
		if (prevInitial.current !== initialQuery) {
			prevInitial.current = initialQuery;
			setQuery(initialQuery);
		}
	}, [initialQuery]);

	return { query, setQuery };
}
