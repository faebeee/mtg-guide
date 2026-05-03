import { GLOSSARY_TERMS } from "@mtg-guide/data";
import { useGlossarySearch } from "@mtg-guide/hooks";
import { i18n, termToI18nKey, useTranslation } from "@mtg-guide/i18n";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TermCard } from "#/components/TermCard";

export const Route = createFileRoute("/glossary")({
	validateSearch: (search: Record<string, unknown>) => ({
		q: typeof search.q === "string" ? search.q : undefined,
	}),
	component: GlossaryPage,
});

function GlossaryPage() {
	const { q } = Route.useSearch();
	const navigate = useNavigate({ from: "/glossary" });
	const { query, setQuery } = useGlossarySearch(q ?? "");
	const [openTerm, setOpenTerm] = useState<string | null>(q ?? null);
	const { t } = useTranslation(["ui", "glossary"]);

	const filtered = useMemo(() => {
		if (!query.trim()) return null;
		const lower = query.toLowerCase();
		return GLOSSARY_TERMS.filter((term) => {
			const key = termToI18nKey(term.term);
			const translatedName = t(`glossary:${key}.term`);
			const translatedDef = t(`glossary:${key}.definition`);
			return (
				translatedName.toLowerCase().includes(lower) ||
				translatedDef.toLowerCase().includes(lower)
			);
		}).sort((a, b) => {
			const ta = t(`glossary:${termToI18nKey(a.term)}.term`);
			const tb = t(`glossary:${termToI18nKey(b.term)}.term`);
			return ta.localeCompare(tb, i18n.language);
		});
	}, [query, t]);

	const byLetter = useMemo(() => {
		const grouped: Record<string, typeof GLOSSARY_TERMS> = {};
		const sorted = [...GLOSSARY_TERMS].sort((a, b) => {
			const ta = t(`glossary:${termToI18nKey(a.term)}.term`);
			const tb = t(`glossary:${termToI18nKey(b.term)}.term`);
			return ta.localeCompare(tb, i18n.language);
		});
		for (const term of sorted) {
			const translatedName = t(`glossary:${termToI18nKey(term.term)}.term`);
			const letter = translatedName[0].toUpperCase();
			if (!grouped[letter]) grouped[letter] = [];
			grouped[letter].push(term);
		}
		return grouped;
	}, [t]);

	const letters = Object.keys(byLetter).sort((a, b) =>
		a.localeCompare(b, i18n.language),
	);

	function handleSearch(v: string) {
		setQuery(v);
		navigate({ search: v ? { q: v } : { q: undefined } });
		if (v) setOpenTerm(null);
	}

	return (
		<div className="page-container" style={{ paddingTop: "1.5rem" }}>
			{/* Header */}
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
					{t("ui:glossary.reference")}
				</p>
				<h1
					className="page-heading"
					style={{
						fontSize: "1.6rem",
						fontWeight: 700,
						margin: "0 0 4px",
						letterSpacing: "-0.02em",
					}}
				>
					{t("ui:glossary.title")}
				</h1>
				<p
					style={{
						color: "var(--text-muted)",
						fontSize: "0.9rem",
						margin: "0 0 1.5rem",
					}}
				>
					{t("ui:glossary.subtitle", { count: GLOSSARY_TERMS.length })}
				</p>

				{/* Search */}
				<div
					style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}
				>
					<span
						style={{
							position: "absolute",
							left: "14px",
							top: "50%",
							transform: "translateY(-50%)",
							color: "var(--text-dim)",
							fontSize: "0.9rem",
							pointerEvents: "none",
						}}
					>
						⌕
					</span>
					<input
						className="mtg-input"
						type="text"
						placeholder={t("ui:glossary.searchPlaceholder")}
						value={query}
						onChange={(e) => handleSearch(e.target.value)}
						style={{ paddingLeft: "36px" }}
					/>
					{query && (
						<button
							type="button"
							onClick={() => handleSearch("")}
							style={{
								position: "absolute",
								right: "12px",
								top: "50%",
								transform: "translateY(-50%)",
								background: "none",
								border: "none",
								color: "var(--text-dim)",
								cursor: "pointer",
								fontSize: "1rem",
							}}
						>
							×
						</button>
					)}
				</div>
			</div>

			{/* A-Z jump */}
			{!query && (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "4px",
						justifyContent: "center",
						marginBottom: "2rem",
					}}
				>
					{letters.map((letter) => (
						<a
							key={letter}
							href={`#letter-${letter}`}
							style={{
								color: "var(--text-muted)",
								fontSize: "0.78rem",
								fontWeight: 600,
								padding: "4px 8px",
								border: "1px solid var(--border)",
								borderRadius: "4px",
								textDecoration: "none",
								transition: "all 120ms ease",
							}}
						>
							{letter}
						</a>
					))}
				</div>
			)}

			{/* Search results */}
			{filtered !== null ? (
				<div>
					{filtered.length === 0 ? (
						<div style={{ textAlign: "center", padding: "3rem 0" }}>
							<p style={{ color: "var(--text-muted)" }}>
								{t("ui:glossary.noResults", { query })}
							</p>
						</div>
					) : (
						<div
							style={{ display: "flex", flexDirection: "column", gap: "6px" }}
						>
							{filtered.map((term) => (
								<TermCard
									key={term.term}
									term={term}
									isOpen={openTerm === term.term}
									onToggle={() =>
										setOpenTerm(openTerm === term.term ? null : term.term)
									}
								/>
							))}
						</div>
					)}
				</div>
			) : (
				/* Alphabetical listing */
				<div
					style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
				>
					{letters.map((letter) => (
						<section key={letter} id={`letter-${letter}`}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "12px",
									marginBottom: "12px",
								}}
							>
								<h2
									style={{
										color: "var(--text)",
										fontSize: "1rem",
										fontWeight: 700,
										margin: 0,
									}}
								>
									{letter}
								</h2>
								<div
									style={{ flex: 1, height: 1, background: "var(--border)" }}
								/>
							</div>
							<div
								style={{ display: "flex", flexDirection: "column", gap: "6px" }}
							>
								{byLetter[letter].map((term) => (
									<TermCard
										key={term.term}
										term={term}
										isOpen={openTerm === term.term}
										onToggle={() =>
											setOpenTerm(openTerm === term.term ? null : term.term)
										}
									/>
								))}
							</div>
						</section>
					))}
				</div>
			)}
		</div>
	);
}
