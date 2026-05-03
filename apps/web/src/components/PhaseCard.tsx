import type { AnyPhase } from "@mtg-guide/hooks";
import { useTranslation } from "@mtg-guide/i18n";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function KeywordChip({ keyword }: { keyword: string }) {
	return (
		<Link to="/glossary" search={{ q: keyword }} className="keyword-chip">
			{keyword}
		</Link>
	);
}

export function PhaseProgressBar({
	phases,
	currentIndex,
	onSelect,
}: {
	phases: AnyPhase[];
	currentIndex: number;
	onSelect: (i: number) => void;
}) {
	const { t } = useTranslation("phases");

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "6px",
				justifyContent: "center",
				flexWrap: "wrap",
				padding: "4px 0",
			}}
		>
			{phases.map((phase, i) => (
				<button
					key={phase.id}
					type="button"
					onClick={() => onSelect(i)}
					title={t(`${phase.id}.shortName`)}
					className={`phase-dot${i === currentIndex ? " active" : i < currentIndex ? " completed" : ""}`}
					style={{
						background:
							i === currentIndex
								? phase.color
								: i < currentIndex
									? `${phase.color}60`
									: undefined,
						borderColor:
							i === currentIndex
								? phase.color
								: i < currentIndex
									? `${phase.color}60`
									: undefined,
						boxShadow:
							i === currentIndex ? `0 0 8px ${phase.color}60` : undefined,
					}}
				/>
			))}
		</div>
	);
}

export function PhaseCard({
	phase,
	index,
	total,
}: {
	phase: AnyPhase;
	index: number;
	total: number;
}) {
	const [priorityOpen, setPriorityOpen] = useState(false);
	const { t } = useTranslation(["ui", "phases"]);

	const playerActions = t(`phases:${phase.id}.playerActions`, {
		returnObjects: true,
	}) as string[];
	const tips = t(`phases:${phase.id}.tips`, {
		returnObjects: true,
	}) as string[];
	const priorityText = t(`phases:${phase.id}.priority`);
	const phaseName = t(`phases:${phase.id}.name`);
	const phaseDescription = t(`phases:${phase.id}.description`);

	// Fall back to data values if translation returns the key itself (pre-npm-install)
	const displayActions = Array.isArray(playerActions)
		? playerActions
		: phase.playerActions;
	const displayTips = Array.isArray(tips)
		? tips
		: phase.tips.map((tp) => tp.text);

	return (
		<div className="animate-fade-up">
			{/* Step indicator */}
			<div className="page-container" style={{ marginBottom: "6px" }}>
				<span
					style={{
						fontSize: "0.75rem",
						color: "var(--text-dim)",
						fontWeight: 500,
					}}
				>
					{t("ui:guide.stepOf", { current: index + 1, total })}
				</span>
			</div>

			{/* Main card — full width */}
			<div className="phase-card-full">
				{/* Phase name & icon */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						marginBottom: "1rem",
					}}
				>
					<span style={{ fontSize: "1.25rem", lineHeight: 1 }}>
						{phase.icon}
					</span>
					<h1
						className="page-heading"
						style={{
							color: phase.color,
							fontSize: "1.4rem",
							fontWeight: 700,
							margin: 0,
							lineHeight: 1.1,
							wordBreak: "break-word",
							letterSpacing: "-0.01em",
						}}
					>
						{phaseName}
					</h1>
				</div>

				{/* Description */}
				<p
					style={{
						color: "var(--text-muted)",
						fontSize: "0.95rem",
						lineHeight: 1.65,
						margin: "0 0 1.25rem",
					}}
				>
					{phaseDescription}
				</p>

				{/* What you can do */}
				<div
					style={{
						borderLeft: `2px solid ${phase.color}60`,
						paddingLeft: "1rem",
						marginBottom: "1.25rem",
					}}
				>
					<p
						style={{
							color: "var(--text-dim)",
							fontSize: "0.72rem",
							fontWeight: 600,
							textTransform: "uppercase",
							letterSpacing: "0.06em",
							margin: "0 0 0.6rem",
						}}
					>
						{t("ui:guide.whatToDo")}
					</p>
					<ul style={{ margin: 0, padding: "0 0 0 1rem" }}>
						{displayActions.map((action, i) => (
							<li
								key={i}
								style={{
									color: "var(--text)",
									fontSize: "0.95rem",
									lineHeight: 1.6,
									marginBottom: "4px",
								}}
							>
								{action}
							</li>
						))}
					</ul>
				</div>

				{/* Tips */}
				{displayTips.length > 0 && (
					<div style={{ marginBottom: "1.25rem" }}>
						<p
							style={{
								color: "var(--text-dim)",
								fontSize: "0.72rem",
								fontWeight: 600,
								textTransform: "uppercase",
								letterSpacing: "0.06em",
								margin: "0 0 0.5rem",
							}}
						>
							{t("ui:guide.tips")}
						</p>
						<div
							style={{ display: "flex", flexDirection: "column", gap: "6px" }}
						>
							{displayTips.map((tip, i) => (
								<p
									key={i}
									style={{
										color: "var(--text-muted)",
										fontSize: "0.9rem",
										lineHeight: 1.55,
										margin: 0,
										paddingLeft: "0.75rem",
										borderLeft: "1px solid var(--border)",
									}}
								>
									{tip}
								</p>
							))}
						</div>
					</div>
				)}

				{/* Priority section */}
				<button
					type="button"
					onClick={() => setPriorityOpen((o) => !o)}
					style={{
						width: "100%",
						background: priorityOpen ? "var(--surface-2)" : "transparent",
						border: "1px solid var(--border)",
						borderRadius: "8px",
						padding: "10px 14px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						cursor: "pointer",
						transition: "background 150ms ease",
						minHeight: "44px",
					}}
				>
					<span
						style={{
							color: "var(--blue)",
							fontSize: "0.8rem",
							fontWeight: 500,
							textAlign: "left",
						}}
					>
						{t("ui:guide.priority")}
					</span>
					<span
						style={{
							color: "var(--text-dim)",
							fontSize: "0.7rem",
							flexShrink: 0,
							marginLeft: "8px",
						}}
					>
						{priorityOpen ? "▲" : "▼"}
					</span>
				</button>

				{priorityOpen && (
					<div
						className="priority-callout animate-fade-in"
						style={{ marginTop: "6px", padding: "12px 16px" }}
					>
						<p
							style={{
								color: "var(--text-muted)",
								fontSize: "0.9rem",
								lineHeight: 1.6,
								margin: 0,
							}}
						>
							{priorityText}
						</p>
					</div>
				)}

				{/* Keywords */}
				{"keywords" in phase && phase.keywords.length > 0 && (
					<div
						style={{
							marginTop: "1.25rem",
							paddingTop: "1rem",
							borderTop: "1px solid var(--border)",
						}}
					>
						<div className="keywords-row">
							<span
								style={{
									color: "var(--text-dim)",
									fontSize: "0.72rem",
									fontWeight: 600,
									textTransform: "uppercase",
									letterSpacing: "0.06em",
								}}
							>
								{t("ui:guide.keywords")}
							</span>
							{phase.keywords.map((kw) => (
								<KeywordChip key={kw} keyword={kw} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
