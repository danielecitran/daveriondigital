"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

import { S } from "@/components/sportlens/sportlens-copy";
import {
  SPORTLENS_ACCENT,
  SUPPORT_EMAIL,
  SportLensWordmark,
} from "@/components/sportlens/sportlens-legal";
import {
  FadeUp,
  TradeLensMotionLiteContext,
  scrollToTradeLensSection,
  useTradeLensMotionLite,
  useTradeLensMotionLiteFlag,
} from "@/components/tradelens/tradelens-motion";

// Not on the App Store yet: swap in the listing URL at launch.
const APP_STORE_URL = "#";

function AppStoreBadge({ large = false }: { large?: boolean }) {
  const t = S.appStore;
  const lite = useTradeLensMotionLite();
  return (
    <motion.a
      href={APP_STORE_URL}
      onClick={(e) => {
        if (APP_STORE_URL === "#") e.preventDefault();
      }}
      aria-label="Download SportLens on the App Store"
      whileHover={
        lite
          ? undefined
          : { scale: 1.03, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }
      }
      whileTap={lite ? { scale: 0.98 } : { scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: large ? 14 : 11,
        background: "#ffffff",
        borderRadius: 13,
        padding: large ? "13px 28px" : "10px 20px",
        textDecoration: "none",
        color: "#000",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={large ? 26 : 21}
        height={large ? 32 : 26}
        fill="#000"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.15,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: large ? 11 : 10,
            fontWeight: 400,
            opacity: 0.65,
            letterSpacing: "0.05em",
          }}
        >
          {t.line1}
        </span>
        <span
          style={{
            fontSize: large ? 21 : 18,
            fontWeight: 700,
            letterSpacing: "-0.025em",
          }}
        >
          {t.line2}
        </span>
      </div>
    </motion.a>
  );
}

const FEATURE_ICONS = [
  <svg key="percent" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>,
  <svg key="scale" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>,
  <svg key="target" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  <svg key="activity" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>,
  <svg key="chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  <svg key="globe" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
];

const navLink =
  "hidden md:inline-flex items-center text-[#b6b6b6] hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200";

function SLNav() {
  const t = S.nav;
  const [scrolled, setScrolled] = useState(false);
  const lite = useTradeLensMotionLite();
  const prefersReducedMotion = useReducedMotion();

  const handleInPageAnchor = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    scrollToTradeLensSection(sectionId, behavior);
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        ...(lite
          ? {}
          : {
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }),
        background: lite
          ? scrolled
            ? "rgba(1,1,1,0.98)"
            : "rgba(1,1,1,0.96)"
          : scrolled
            ? "rgba(1,1,1,0.92)"
            : "rgba(1,1,1,0.55)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <Link
          href="/sportlens"
          style={{ textDecoration: "none", lineHeight: 1 }}
          aria-label={t.ariaHome}
        >
          <SportLensWordmark size={20} />
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          aria-label={t.ariaLabel}
        >
          <a
            href="#how-it-works"
            onClick={(e) => handleInPageAnchor(e, "how-it-works")}
            className={navLink}
          >
            {t.howItWorks}
          </a>
          <a
            href="#features"
            onClick={(e) => handleInPageAnchor(e, "features")}
            className={navLink}
          >
            {t.features}
          </a>
        </nav>
      </div>
    </header>
  );
}

function SLHero() {
  const t = S.hero;
  const lite = useTradeLensMotionLite();

  return (
    <section
      className="flex min-h-[calc(100svh-72px)] items-center justify-center"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "64px 24px",
        textAlign: "center",
      }}
    >
      {lite ? (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(100vw, 800px)",
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.06) 45%, transparent 72%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ) : (
        <>
          <motion.div
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.09) 35%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
            style={{
              position: "absolute",
              top: "62%",
              left: "8%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </>
      )}

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 960, margin: "0 auto" }}>
        <FadeUp>
          <h1
            style={{
              // Scales with the screen so the second line never wraps.
              fontSize: "clamp(24px, 6.6vw, 70px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.02,
              color: "#ffffff",
              margin: "0 0 24px",
            }}
          >
            {t.headlineL1}
            <br />
            <span style={{ whiteSpace: "nowrap" }}>
              {t.headlineL2}{" "}
              <span style={{ color: SPORTLENS_ACCENT }}>{t.headlineAccent}</span>
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#b6b6b6",
              maxWidth: 620,
              margin: "0 auto 44px",
            }}
          >
            {t.sub}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="md:hidden">
              <AppStoreBadge />
            </div>
            <div className="hidden md:block">
              <AppStoreBadge large />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function SLHowItWorks() {
  const t = S.howItWorks;
  return (
    <section id="how-it-works" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp className="mb-16 text-center">
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              color: SPORTLENS_ACCENT,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.eyebrow}
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            {t.heading}
          </h2>
        </FadeUp>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          {t.steps.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.08}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "84px 1fr",
                  gap: 18,
                  alignItems: "start",
                  padding: i === t.steps.length - 1 ? "10px 0" : "10px 0 36px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} aria-hidden>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 9999,
                      display: "grid",
                      placeItems: "center",
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.20), rgba(59,130,246,0.07) 55%, rgba(0,0,0,0) 72%)",
                      boxShadow: "0 0 30px rgba(59,130,246,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", color: "#93c5fd" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {i !== t.steps.length - 1 ? (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        marginTop: 10,
                        background:
                          "linear-gradient(180deg, rgba(59,130,246,0.32) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 100%)",
                        minHeight: 44,
                      }}
                    />
                  ) : null}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.04em",
                      margin: "2px 0 10px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b6b6b6", margin: 0, maxWidth: 640 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function SLFeatures() {
  const t = S.features;
  return (
    <section id="features" style={{ padding: "100px 24px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp className="mb-4 text-center">
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              color: SPORTLENS_ACCENT,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.eyebrow}
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              margin: "0 0 16px",
            }}
          >
            {t.heading}
          </h2>
          <p style={{ fontSize: 18, color: "#b6b6b6", maxWidth: 540, margin: "0 auto 60px" }}>
            {t.subtitle}
          </p>
        </FadeUp>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            {t.items.map((feat, i) => (
              <FadeUp key={feat.title} delay={i * 0.06}>
                <div style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, alignItems: "flex-start" }}>
                  <div aria-hidden style={{ paddingTop: 2 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9999,
                        display: "grid",
                        placeItems: "center",
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.16), rgba(59,130,246,0.07) 55%, rgba(0,0,0,0) 72%)",
                        boxShadow: "0 0 26px rgba(59,130,246,0.10)",
                      }}
                    >
                      {FEATURE_ICONS[i]}
                    </div>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        margin: "0 0 8px",
                      }}
                    >
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b6b6b6", margin: 0 }}>
                      {feat.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SLValueProps() {
  const t = S.valueProps;
  return (
    <section style={{ padding: "100px 24px", background: "#010101" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp className="text-center">
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              maxWidth: 700,
              margin: "0 auto 56px",
            }}
          >
            {t.headingPart1}{" "}
            <span style={{ color: SPORTLENS_ACCENT }}>{t.headingAccent}</span>
          </h2>
        </FadeUp>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-16">
            {t.items.map((vp, i) => (
              <FadeUp key={vp.label} delay={i * 0.08}>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 64,
                      fontWeight: 900,
                      letterSpacing: "-0.08em",
                      lineHeight: 0.98,
                      color: "#ffffff",
                      marginBottom: 10,
                    }}
                  >
                    {vp.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "#ffffff",
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 18,
                        height: 2,
                        borderRadius: 9999,
                        background: "rgba(59,130,246,0.9)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(147,197,253,0.92)" }}>{vp.label}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "#b6b6b6", margin: 0, maxWidth: 360 }}>
                    {vp.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SLDownloadCTA() {
  const t = S.cta;
  const lite = useTradeLensMotionLite();
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px",
        textAlign: "center",
        background: "#010101",
      }}
    >
      {lite ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(100vw, 640px)",
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, rgba(29,78,216,0.06) 45%, transparent 72%)",
            pointerEvents: "none",
          }}
        />
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, rgba(29,78,216,0.1) 40%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            style={{
              position: "absolute",
              top: "30%",
              left: "20%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
        <FadeUp>
          <div
            style={{
              fontSize: "clamp(14px, 2.5vw, 18px)",
              fontWeight: 700,
              color: SPORTLENS_ACCENT,
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            {t.eyebrow}
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(30px, 5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              color: "#ffffff",
              margin: "0 0 20px",
            }}
          >
            {t.heading}
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p style={{ fontSize: 18, color: "#b6b6b6", lineHeight: 1.65, margin: "0 auto 44px", maxWidth: 520 }}>
            {t.sub}
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="md:hidden">
              <AppStoreBadge />
            </div>
            <div className="hidden md:block">
              <AppStoreBadge large />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function SLResponsible() {
  const t = S.responsible;
  return (
    <section
      id="responsible-gambling"
      style={{
        padding: "100px 24px",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
          <FadeUp>
            <span
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                color: SPORTLENS_ACCENT,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t.eyebrow}
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "#ffffff",
                margin: "0 0 20px",
              }}
            >
              {t.heading}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#b6b6b6", margin: 0, maxWidth: 420 }}>
              {t.body}
            </p>
          </FadeUp>

          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {t.principles.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <li
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 12,
                    padding: "24px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                    paddingTop: i === 0 ? 4 : 24,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      color: "#93c5fd",
                      paddingTop: 4,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        margin: "0 0 6px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b6b6b6", margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>

        <FadeUp>
          <div
            style={{
              marginTop: 72,
              paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                margin: "0 0 6px",
              }}
            >
              {t.helpHeading}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b6b6b6", margin: 0 }}>
              {t.helpBody}
            </p>
            <ul
              className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3"
              style={{ listStyle: "none", margin: "28px 0 0", padding: 0 }}
            >
              {t.help.map((h) => (
                <li key={h.country}>
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block no-underline"
                  >
                    <span
                      className="block"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#7f7f7f",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {h.country}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#e5e5e5] transition-colors group-hover:text-white">
                      {h.name}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ opacity: 0.5 }}>
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "#7f7f7f", margin: "40px 0 0" }}>
              {t.disclaimer}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const lite = useTradeLensMotionLite();
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      aria-label={label}
      whileHover={lite ? undefined : { scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 44,
        height: 44,
        borderRadius: 9999,
        background: "rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#b6b6b6",
        textDecoration: "none",
      }}
    >
      {children}
    </motion.a>
  );
}

function SLFooter() {
  const t = S.footer;
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#010101",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "72px 24px 0",
      }}
      role="contentinfo"
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div>
            <div style={{ display: "flex", alignItems: "center", height: 32, marginBottom: 14 }}>
              <SportLensWordmark size={16} />
            </div>
            <p style={{ fontSize: 13, color: "#7f7f7f", lineHeight: 1.65, margin: 0, maxWidth: 200 }}>
              {t.tagline}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7f7f7f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              {t.connectHeading}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <SocialButton href={`mailto:${SUPPORT_EMAIL}`} label={t.ariaEmail}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </SocialButton>
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7f7f7f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t.legalHeading}
            </p>
            <nav aria-label={t.ariaLegal} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/sportlens/privacy" className="text-sm text-[#b6b6b6] no-underline transition-colors hover:text-white">
                {t.privacyPolicy}
              </Link>
              <Link href="/sportlens/terms" className="text-sm text-[#b6b6b6] no-underline transition-colors hover:text-white">
                {t.termsOfUse}
              </Link>
            </nav>
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7f7f7f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t.contactHeading}
            </p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm text-[#b6b6b6] no-underline transition-colors hover:text-white">
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            paddingBottom: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
            fontSize: 13,
            color: "#7f7f7f",
          }}
        >
          <Link href="/" className="text-[#7f7f7f] no-underline transition-colors hover:text-white">
            {t.copyright(year)}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function SportLensPage() {
  const motionLite = useTradeLensMotionLiteFlag();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = requestAnimationFrame(() => {
      scrollToTradeLensSection(hash, reduce ? "auto" : "smooth");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <TradeLensMotionLiteContext.Provider value={motionLite}>
      <div
        style={{
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
          background: "#010101",
          color: "#ffffff",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(900px 600px at 12% 16%, rgba(59,130,246,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(700px 480px at 88% 28%, rgba(99,102,241,0.08) 0%, rgba(0,0,0,0) 58%), radial-gradient(900px 520px at 50% 92%, rgba(52,211,153,0.05) 0%, rgba(0,0,0,0) 60%)",
            opacity: motionLite ? 0.55 : 0.8,
          }}
        />
        <SLNav />
        <main style={{ position: "relative", zIndex: 1 }}>
          <SLHero />
          <SLHowItWorks />
          <SLFeatures />
          <SLValueProps />
          <SLDownloadCTA />
          <SLResponsible />
        </main>
        <SLFooter />
      </div>
    </TradeLensMotionLiteContext.Provider>
  );
}
