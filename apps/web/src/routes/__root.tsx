import { changeLanguage, i18n, useTranslation } from "@mtg-guide/i18n";
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0c0e12" },
      { title: "MTG Guide — New Player Companion" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function LangToggle() {
  const { t } = useTranslation("ui");
  const currentLang = i18n.language;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mtg-lang");
      if (saved === "de" || saved === "en") {
        changeLanguage(saved);
      }
    }
  }, []);

  function toggle(lng: "en" | "de") {
    changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem("mtg-lang", lng);
    }
  }

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {(["en", "de"] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => toggle(lng)}
          style={{
            padding: "4px 10px",
            fontSize: "0.75rem",
            fontWeight: 600,
            border: "1px solid var(--border)",
            borderRadius: "4px",
            cursor: "pointer",
            background:
              currentLang === lng ? "var(--surface-2)" : "transparent",
            color: currentLang === lng ? "var(--text)" : "var(--text-dim)",
            transition: "all 120ms ease",
          }}
        >
          {t(`language.${lng}`)}
        </button>
      ))}
    </div>
  );
}

function Nav() {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation("ui");

  return (
    <header
      className="top-nav-header"
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(12, 14, 18, 0.95)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="page-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 1rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "var(--text-dim)",
              fontSize: "1rem",
              lineHeight: 1,
            }}
          >
            ⚔
          </span>
          <span
            className="font-display"
            style={{
              color: "var(--text)",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            {t("nav.title")}
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Nav links — hidden on mobile, shown on desktop */}
          <nav
            className="top-nav-links"
            style={{ display: "flex", gap: "2px" }}
          >
            <Link to="/" className={`nav-link${path === "/" ? " active" : ""}`}>
              {t("nav.turnGuide")}
            </Link>
            <Link
              to="/glossary"
              search={{ q: undefined }}
              className={`nav-link${path === "/glossary" ? " active" : ""}`}
            >
              {t("nav.glossary")}
            </Link>
          </nav>

          <LangToggle />
        </div>
      </div>
    </header>
  );
}

function BottomTabBar() {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation("ui");

  return (
    <nav className="bottom-tab-bar" aria-label="Main navigation">
      <Link
        to="/"
        className={`bottom-tab-item${path === "/" ? " active" : ""}`}
        aria-current={path === "/" ? "page" : undefined}
      >
        <span className="tab-icon" aria-hidden="true">
          ⚔️
        </span>
        <span className="tab-label">{t("nav.guide")}</span>
      </Link>
      <Link
        to="/glossary"
        search={{ q: undefined }}
        className={`bottom-tab-item${path === "/glossary" ? " active" : ""}`}
        aria-current={path === "/glossary" ? "page" : undefined}
      >
        <span className="tab-icon" aria-hidden="true">
          📖
        </span>
        <span className="tab-label">{t("nav.glossary")}</span>
      </Link>
    </nav>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("ui");
  return (
    <html lang={i18n.language}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Nav />
        <main
          className="mobile-bottom-padding"
          style={{ minHeight: "calc(100vh - 60px)", paddingBottom: "3rem" }}
        >
          {children}
        </main>
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "20px 1rem",
            textAlign: "center",
          }}
          className="desktop-footer"
        >
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.75rem",
              margin: 0,
            }}
          >
            {t("footer.disclaimer")}
          </p>
        </footer>
        <BottomTabBar />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
