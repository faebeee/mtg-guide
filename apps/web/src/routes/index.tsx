import { usePhaseWizard } from "@mtg-guide/hooks";
import { useTranslation } from "@mtg-guide/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { PhaseCard, PhaseProgressBar } from "#/components/PhaseCard";

export const Route = createFileRoute("/")({ component: Home });

const storage = {
	getItem: (key: string) => localStorage.getItem(key),
	setItem: (key: string, value: string) => localStorage.setItem(key, value),
};

/** Detect horizontal swipe on a container element. */
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
	const touchStartX = useRef<number | null>(null);

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	}, []);

	const onTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			if (touchStartX.current === null) return;
			const delta = e.changedTouches[0].clientX - touchStartX.current;
			touchStartX.current = null;
			if (Math.abs(delta) < 40) return;
			if (delta < 0) onSwipeLeft();
			else onSwipeRight();
		},
		[onSwipeLeft, onSwipeRight],
	);

	return { onTouchStart, onTouchEnd };
}

function Home() {
	const { t } = useTranslation("ui");
	const {
		mode,
		phases,
		phase,
		currentIndex,
		setCurrentIndex,
		turnCount,
		isLast,
		justReset,
		changeMode,
		next,
		prev,
	} = usePhaseWizard(storage);

	const swipe = useSwipe(next, prev);

	return (
		<div style={{ paddingTop: "1.5rem" }}>
			{/* Page header — constrained width */}
			<div className="page-container">
				<div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
					<p
						style={{
							color: "var(--text-dim)",
							fontSize: "0.72rem",
							fontWeight: 600,
							textTransform: "uppercase",
							letterSpacing: "0.06em",
							margin: "0 0 4px",
						}}
					>
						{t("guide.turn", { count: turnCount })}
					</p>
					<h1
						className="page-heading"
						style={{
							fontSize: "1.6rem",
							fontWeight: 700,
							margin: "0 0 4px",
							lineHeight: 1,
							letterSpacing: "-0.02em",
							color: "var(--text)",
						}}
					>
						{t("guide.title")}
					</h1>
					<p
						style={{
							color: "var(--text-muted)",
							fontSize: "0.9rem",
							margin: "0 0 1.25rem",
						}}
					>
						{t("guide.subtitle")}
					</p>

					{/* Mode toggle */}
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginBottom: "1.25rem",
						}}
					>
						<div className="toggle-pill">
							<button
								type="button"
								className={`toggle-option${mode === "simplified" ? " active" : ""}`}
								onClick={() => changeMode("simplified")}
							>
								{t("guide.simplified")}
							</button>
							<button
								type="button"
								className={`toggle-option${mode === "full" ? " active" : ""}`}
								onClick={() => changeMode("full")}
							>
								{t("guide.allSteps")}
							</button>
						</div>
					</div>

					{/* Progress dots */}
					<PhaseProgressBar
						phases={phases}
						currentIndex={currentIndex}
						onSelect={setCurrentIndex}
					/>
				</div>
			</div>

			{/* Turn reset toast */}
			{justReset && (
				<div
					className="page-container animate-fade-up"
					style={{ textAlign: "center", marginBottom: "1rem" }}
				>
					<span
						style={{
							display: "inline-block",
							color: "var(--text-muted)",
							fontSize: "0.8rem",
							fontWeight: 500,
							padding: "6px 18px",
							background: "var(--surface-2)",
							border: "1px solid var(--border)",
							borderRadius: "999px",
						}}
					>
						{t("guide.turnBegins", { count: turnCount })}
					</span>
				</div>
			)}

			{/* Phase card — full width, swipeable on mobile */}
			<div {...swipe}>
				<PhaseCard
					key={phase.id}
					phase={phase}
					index={currentIndex}
					total={phases.length}
				/>
			</div>

			{/* Navigation */}
			<div className="wizard-nav-bar page-container">
				<button
					type="button"
					className="btn-ghost"
					onClick={prev}
					disabled={currentIndex === 0}
					style={{ minWidth: "100px" }}
				>
					{t("guide.prev")}
				</button>

				<span className="phase-label font-display">
					{t(`phases:${phase.id}.shortName`)}
				</span>

				<button
					type="button"
					className="btn-gold"
					onClick={next}
					style={{ minWidth: "100px" }}
				>
					{isLast ? t("guide.endTurn") : t("guide.next")}
				</button>
			</div>

			<div className="wizard-bottom-space" />
		</div>
	);
}
