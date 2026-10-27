import Link from "next/link";
import type { ReactNode } from "react";

// The text building blocks are shared with the TradeLens legal pages.
export {
  AddressBlock,
  BulletList,
  DocSection,
} from "@/components/tradelens/tradelens-legal";

export const SPORTLENS_ACCENT = "#3B82F6";

/** "Sport" in white, "Lens" in the app's blue, as on the app's home screen. */
/** The app's wordmark: Oxanium, slanted, "Lens" in blue, next to the app icon. */
export function SportLensWordmark({ size = 17, icon = true }: { size?: number; icon?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.5) }}>
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/sportlens/app-icon.png"
          alt=""
          width={Math.round(size * 1.65)}
          height={Math.round(size * 1.65)}
          style={{ borderRadius: Math.round(size * 0.4), display: "block" }}
        />
      ) : null}
      <span
        style={{
          fontFamily: "var(--font-oxanium), ui-sans-serif, system-ui, sans-serif",
          fontSize: size,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "0.01em",
          display: "inline-block",
          transform: "skewX(-12deg)",
        }}
      >
        Sport<span style={{ color: SPORTLENS_ACCENT }}>Lens</span>
      </span>
    </span>
  );
}

export function SportLensLegalChrome({
  breadcrumb,
  eyebrow,
  pageTitle,
  provider,
  date,
  children,
}: {
  breadcrumb: string;
  eyebrow: string;
  pageTitle: string;
  provider: string;
  date: string;
  children: ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <div
      style={{
        fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
        background: "#010101",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            height: 68,
          }}
        >
          <Link href="/sportlens" style={{ textDecoration: "none" }} aria-label="SportLens">
            <SportLensWordmark />
          </Link>
          <span
            style={{
              marginLeft: 16,
              paddingLeft: 16,
              borderLeft: "1px solid rgba(255,255,255,0.12)",
              fontSize: 14,
              color: "#7f7f7f",
            }}
          >
            {breadcrumb}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px 120px" }}>
        <div
          style={{
            marginBottom: 56,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: SPORTLENS_ACCENT,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {eyebrow}
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            {pageTitle}
          </h1>
          <p style={{ fontSize: 15, color: "#7f7f7f", margin: "0 0 4px" }}>{provider}</p>
          <p style={{ fontSize: 14, color: "#7f7f7f", margin: 0 }}>{date}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>{children}</div>

        <div style={{ marginTop: 64, textAlign: "center" }}>
          <Link
            href="/sportlens"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: SPORTLENS_ACCENT,
              textDecoration: "none",
            }}
          >
            ← Back to SportLens
          </Link>
        </div>
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "24px",
          textAlign: "center",
          fontSize: 13,
          color: "#7f7f7f",
        }}
      >
        <Link href="/" className="text-[#7f7f7f] no-underline transition-colors hover:text-white">
          © {year} Daverion Digital
        </Link>
      </footer>
    </div>
  );
}

/** A highlighted note with a plain label on top. */
export function Callout({
  variant,
  label,
  children,
}: {
  variant: "warning" | "info";
  label: string;
  children: ReactNode;
}) {
  const warn = variant === "warning";
  return (
    <div
      style={{
        borderLeft: `3px solid ${warn ? "rgba(239,68,68,0.7)" : "rgba(59,130,246,0.7)"}`,
        background: warn ? "rgba(239,68,68,0.05)" : "rgba(59,130,246,0.05)",
        borderRadius: "0 10px 10px 0",
        padding: "16px 20px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: warn ? "#fca5a5" : "#93c5fd",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 15, color: "#b6b6b6", lineHeight: 1.75, margin: 0 }}>{children}</p>
    </div>
  );
}

/** A sub-heading inside a section, e.g. "3.1 Loading games and picks". */
export function SubSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#e5e5e5",
          letterSpacing: "-0.01em",
          marginBottom: 8,
        }}
      >
        {heading}
      </h3>
      <div>{children}</div>
    </div>
  );
}

export function DataTable({ head, rows }: { head: readonly string[]; rows: readonly (readonly string[])[] }) {
  return (
    <div style={{ margin: "14px 0", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.55 }}>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                style={{
                  textAlign: "left",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#7f7f7f",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0 16px 10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: "10px 16px 10px 0",
                    color: i === 0 ? "#e5e5e5" : "#b6b6b6",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const COMPANY_ADDRESS = [
  "Daverion Digital KLG",
  "Stockenstrasse 1",
  "8802 Kilchberg ZH",
  "Switzerland",
] as const;

export const LEGAL_EMAIL = "contact@daverion.digital";
export const SUPPORT_EMAIL = "help@daverion.digital";

export const linkStyle = { color: SPORTLENS_ACCENT, textDecoration: "none", fontWeight: 500 } as const;
