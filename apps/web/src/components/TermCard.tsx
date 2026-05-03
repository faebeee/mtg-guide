import { GLOSSARY_TERMS, type GlossaryTerm } from "@mtg-guide/data";
import { termToI18nKey, useTranslation } from "@mtg-guide/i18n";

export function TermCard({
	term,
	isOpen,
	onToggle,
}: {
	term: GlossaryTerm;
	isOpen: boolean;
	onToggle: () => void;
}) {
	const { t } = useTranslation(["ui", "glossary"]);
	const key = termToI18nKey(term.term);
	const displayTerm = t(`glossary:${key}.term`);
	const displayDef = t(`glossary:${key}.definition`);

	return (
		<div
			className="mtg-card-glow"
			style={{
				border: "1px solid var(--border)",
				borderRadius: "8px",
				overflow: "hidden",
				background: isOpen ? "var(--surface-2)" : "var(--surface)",
				transition: "background 150ms ease",
			}}
		>
			<button
				type="button"
				onClick={onToggle}
				className="term-toggle-btn"
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "14px 16px",
					background: "transparent",
					border: "none",
					cursor: "pointer",
					textAlign: "left",
					gap: "12px",
					minHeight: "52px",
				}}
			>
				<span
					style={{
						color: isOpen ? "var(--text)" : "var(--text-muted)",
						fontSize: "0.9rem",
						fontWeight: 600,
						transition: "color 150ms ease",
					}}
				>
					{displayTerm}
				</span>
				<span
					style={{
						color: "var(--text-dim)",
						fontSize: "0.75rem",
						flexShrink: 0,
					}}
				>
					{isOpen ? "▲" : "▼"}
				</span>
			</button>

			{isOpen && (
				<div
					className="animate-fade-in"
					style={{
						padding: "0 16px 16px",
						borderTop: "1px solid var(--border)",
					}}
				>
					<p
						style={{
							color: "var(--text)",
							fontSize: "0.9rem",
							lineHeight: 1.65,
							margin: "12px 0",
						}}
					>
						{displayDef}
					</p>

					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "8px",
							alignItems: "center",
						}}
					>
						{term.ruleRef && (
							<span
								className="font-mono"
								style={{
									color: "var(--text-dim)",
									fontSize: "0.72rem",
									background: "var(--surface-2)",
									padding: "2px 8px",
									borderRadius: "4px",
									border: "1px solid var(--border)",
								}}
							>
								{t("ui:glossary.rule", { ref: term.ruleRef })}
							</span>
						)}
						{term.related && term.related.length > 0 && (
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "4px",
									alignItems: "center",
								}}
							>
								<span
									style={{
										color: "var(--text-dim)",
										fontSize: "0.75rem",
										marginRight: "2px",
									}}
								>
									{t("ui:glossary.seeAlso")}
								</span>
								{term.related.map((rel) => {
									const found = GLOSSARY_TERMS.find(
										(t) => t.term.toLowerCase() === rel.toLowerCase(),
									);
									return found ? (
										<span key={rel} className="keyword-chip">
											{rel}
										</span>
									) : (
										<span
											key={rel}
											style={{
												color: "var(--text-muted)",
												fontSize: "0.8rem",
											}}
										>
											{rel}
										</span>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
