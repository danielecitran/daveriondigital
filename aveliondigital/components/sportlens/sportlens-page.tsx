"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

import { S } from "@/components/sportlens/sportlens-copy";
import { SPORTLENS_ACCENT, SUPPORT_EMAIL, SportLensWordmark } from "@/components/sportlens/sportlens-legal";

// Not on the App Store yet: swap in the listing URL at launch.
const APP_STORE_URL = "#";

const GREEN = "#34D399";
const MEDIA = "/sportlens";

/* ---------- small building blocks ---------- */

/** Fades a block up once it scrolls into view; still for people who prefer less motion. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SPORTLENS_ACCENT }}>
      {children}
    </p>
  );
}

function AppStoreBadge({ large = false }: { large?: boolean }) {
  const t = S.appStore;
  return (
    <a
      href={APP_STORE_URL}
      onClick={(e) => {
        if (APP_STORE_URL === "#") e.preventDefault();
      }}
      aria-label="Download SportLens on the App Store"
      className={`inline-flex shrink-0 items-center gap-3 rounded-[14px] bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
        large ? "px-7 py-3.5" : "px-5 py-2.5"
      }`}
    >
      <svg viewBox="0 0 24 24" width={large ? 26 : 21} height={large ? 32 : 26} fill="#000" aria-hidden>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="flex flex-col items-start leading-[1.15]">
        <span className={`${large ? "text-[11px]" : "text-[10px]"} tracking-[0.05em] opacity-65`}>
          {APP_STORE_URL === "#" ? t.soonLine1 : t.line1}
        </span>
        <span className={`${large ? "text-[21px]" : "text-[18px]"} font-bold tracking-[-0.025em]`}>{t.line2}</span>
      </span>
    </a>
  );
}

/** One of the app's screen recordings, already framed in its phone. */
function PhoneVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}

/* ---------- sections ---------- */

function Nav() {
  const t = S.nav;
  const links = [
    { href: "#picks", label: t.picks },
    { href: "#scout", label: t.scout },
    { href: "#sports", label: t.sports },
    { href: "#play-safe", label: t.responsible },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#010101]/75 backdrop-blur-xl">
      <nav aria-label={t.ariaLabel} className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/sportlens" aria-label={t.ariaHome}>
          <SportLensWordmark size={20} />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden sm:block">
          <AppStoreBadge />
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const t = S.hero;
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      {/* The onboarding's stadium, far in the background and fading into black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-[0.16] md:w-[58%]"
        style={{
          backgroundImage: `url(${MEDIA}/stadium.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          maskImage: "linear-gradient(to right, black 20%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to right, black 20%, transparent 92%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 md:grid-cols-[1.25fr_0.75fr] md:pb-24">
        <Reveal>
          <h1 className="font-heading text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[68px]">
            {t.headlineL1}
            <br />
            <span style={{ color: SPORTLENS_ACCENT }}>{t.headlineL2}</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/60">{t.sub}</p>
          <div className="mt-9">
            <AppStoreBadge large />
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[380px]">
          <PhoneVideo
            src={`${MEDIA}/showcase.mp4`}
            poster={`${MEDIA}/showcase-poster.jpg`}
            className="relative w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}

/** The paywall's morphing balls, as a wide band with the sports running across it. */
function SportsBand() {
  const t = S.sportsBand;
  const reduce = useReducedMotion();
  const row = [...t.sports, ...t.sports, ...t.sports];
  return (
    <section id="sports" className="relative isolate overflow-hidden border-y border-white/[0.06]">
      <video
        className="absolute left-1/2 top-1/2 -z-10 h-[125%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60"
        src={`${MEDIA}/sports-loop.mp4`}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#010101] via-transparent to-[#010101]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#010101] via-transparent to-[#010101]" />
      {/* Outlined words: a ring around the filled letters' silhouette, so the font's
          overlapping strokes never show as seams the way a text-stroke does. */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="sl-outline">
          <feMorphology in="SourceAlpha" operator="dilate" radius="1.2" result="grown" />
          <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
          <feFlood floodColor="rgba(255,255,255,0.6)" />
          <feComposite in2="ring" operator="in" />
        </filter>
      </svg>
      <div className="py-24 sm:py-32">
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">{t.label}</p>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex shrink-0 gap-12 pr-12"
            animate={reduce ? undefined : { x: ["0%", "-33.333%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {row.map((sport, i) => (
              <span
                key={`${sport}-${i}`}
                className="font-heading text-5xl font-extrabold tracking-[-0.04em] text-white sm:text-7xl"
                style={i % 2 ? { filter: "url(#sl-outline)" } : undefined}
              >
                {sport}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** A pick card drawn the way the app draws it. */
function PickCard() {
  return (
    <div
      className="rounded-[22px] p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0.24))",
      }}
    >
      <div className="relative overflow-hidden rounded-[21px] bg-[#0b0b0b] px-5 pb-5 pt-4">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />
        <div className="relative flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/45">Points</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-[1.5px]" style={{ borderColor: GREEN }}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill={GREEN} aria-hidden>
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
            </svg>
          </span>
        </div>
        <div className="relative mt-3 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-bold text-white/80">
            WC
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-xl font-extrabold tracking-[-0.02em] text-white">Carter O 9.5 pts</p>
            <p className="text-xs text-white/45">Magic vs Hawks</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-white">1.77</p>
            <p className="text-[11px] font-semibold text-white/55">Avg. odds</p>
          </div>
        </div>
        <div className="relative mt-4 grid grid-cols-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
          {[
            { k: "Edge", v: "+11%", c: GREEN },
            { k: "Stake", v: "1u", c: "#fff" },
            { k: "Confidence", v: "80", c: "#fff" },
          ].map((m, i) => (
            <div key={m.k} className={i ? "border-l border-white/[0.06] pl-3" : ""}>
              <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-white/45">{m.k}</p>
              <p className="mt-0.5 font-heading text-lg font-extrabold" style={{ color: m.c }}>
                {m.v}
              </p>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <div className="flex justify-between text-sm font-bold">
            <span style={{ color: GREEN }}>Over</span>
            <span className="text-white">Under</span>
          </div>
          <div className="mt-1.5 flex h-2 gap-1">
            <span className="h-full rounded-full" style={{ width: "67%", background: GREEN }} />
            <span className="h-full flex-1 rounded-full bg-white/15" />
          </div>
          <div className="mt-1.5 flex justify-between font-heading text-xl font-extrabold">
            <span style={{ color: GREEN }}>67%</span>
            <span className="text-white">33%</span>
          </div>
        </div>
        <p className="relative mt-3 text-[13px] leading-snug text-white/60">
          Our model gives this 67%, the bookmakers 56%. A clear gap with plenty of data behind it: 1u.
        </p>
      </div>
    </div>
  );
}

function PickSection() {
  const t = S.pick;
  return (
    <section id="picks" className="scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <div className="relative mx-auto max-w-[400px]">
            <span className="absolute -top-7 left-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              {t.example}
            </span>
            <PickCard />
          </div>
        </Reveal>
        <div className="order-1 md:order-2">
          <Reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">{t.heading}</h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/55">{t.sub}</p>
          </Reveal>
          <ol className="mt-10 space-y-6">
            {t.callouts.map((c, i) => (
              <Reveal key={c.title} delay={0.08 * i}>
                <li className="flex gap-4">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-medium"
                    style={{ background: "rgba(59,130,246,0.12)", color: SPORTLENS_ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{c.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">{c.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ScoutSection() {
  const t = S.scout;
  return (
    <section id="scout" className="relative scroll-mt-20 overflow-hidden bg-black px-5 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.14), transparent)" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">{t.heading}</h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/55">{t.sub}</p>
          <ul className="mt-8 space-y-3">
            {t.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[15px] text-white/80">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={GREEN} strokeWidth="2.4" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.12} className="mx-auto w-full max-w-[340px]">
          <PhoneVideo src={`${MEDIA}/scout.mp4`} poster={`${MEDIA}/scout-poster.jpg`} className="w-full" />
        </Reveal>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="border-y border-white/[0.06] px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {S.numbers.map((n, i) => (
          <Reveal
            key={n.label}
            delay={0.06 * i}
            className={`py-10 ${i % 2 ? "pl-6 md:pl-8" : "pr-6 md:pr-8"} ${i ? "md:border-l md:border-white/[0.06] md:pl-8" : ""} ${
              i > 1 ? "border-t border-white/[0.06] md:border-t-0" : ""
            } ${i === 1 ? "border-l border-white/[0.06]" : ""} ${i === 3 ? "border-l border-white/[0.06]" : ""}`}
          >
            <p className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">{n.stat}</p>
            <p className="mt-2 max-w-[180px] text-sm leading-snug text-white/50">{n.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Bento() {
  const t = S.bento;
  const tile = "rounded-3xl border border-white/[0.07] bg-[#0b0b0b] p-6";
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-xl font-heading text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">{t.heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Reveal className={`${tile} relative overflow-hidden md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-8`}>
            <div>
              <p className="text-lg font-semibold text-white">{t.tiles.props.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{t.tiles.props.body}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${MEDIA}/chart.jpg`}
              alt="SportLens points projection chart"
              className="mx-auto mt-6 w-full max-w-[340px] rounded-[18px] md:mt-0"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.05} className={`${tile} flex flex-col`}>
            <p className="text-lg font-semibold text-white">{t.tiles.odds.title}</p>
            <p className="mt-2 text-sm text-white/50">{t.tiles.odds.body}</p>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              {["2.50", "6/4", "+150"].map((o, i) => (
                <span
                  key={o}
                  className="rounded-2xl border px-5 py-2.5 font-heading text-2xl font-extrabold tracking-[-0.03em]"
                  style={{
                    borderColor: i === 0 ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)",
                    color: i === 0 ? SPORTLENS_ACCENT : "#fff",
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className={tile}>
            <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-white">EN · DE · FR</p>
            <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-white/30">ES · IT · PT</p>
            <p className="mt-4 text-lg font-semibold text-white">{t.tiles.languages.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/50">{t.tiles.languages.body}</p>
          </Reveal>
          <Reveal delay={0.15} className={tile}>
            <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-white">20:30</p>
            <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-white/30">8:30 PM</p>
            <p className="mt-4 text-lg font-semibold text-white">{t.tiles.times.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/50">{t.tiles.times.body}</p>
          </Reveal>
          <Reveal delay={0.2} className={tile}>
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke={GREEN} strokeWidth="1.8" aria-hidden>
              <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-5 text-lg font-semibold text-white">{t.tiles.private.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/50">{t.tiles.private.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Responsible() {
  const t = S.responsible;
  return (
    <section id="play-safe" className="scroll-mt-20 px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/[0.07] bg-[#080808] p-7 sm:p-12">
        <div className="grid gap-8">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl">{t.heading}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">{t.body}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.principles.map((p, i) => (
              <Reveal key={p.title} delay={0.06 * i} className="rounded-2xl bg-white/[0.03] p-5">
                <p className="whitespace-nowrap font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-white/[0.07] pt-8">
          <p className="font-semibold text-white">{t.helpHeading}</p>
          <p className="mt-1 text-sm text-white/50">{t.helpBody}</p>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {t.help.map((h) => (
              <a key={h.name} href={h.url} target="_blank" rel="noopener noreferrer" className="group">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">{h.country}</p>
                <p className="text-sm text-white/80 transition-colors group-hover:text-white">{h.name} ↗</p>
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-white/35">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const t = S.cta;
  return (
    <section className="relative overflow-hidden px-5 pb-28 text-center">
      <Reveal>
        <div className="relative mx-auto w-fit">
          <div
            aria-hidden
            className="absolute inset-0 scale-150 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.35), transparent)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${MEDIA}/app-icon.png`}
            alt="SportLens app icon"
            width={112}
            height={112}
            className="relative rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
        <h2 className="mx-auto mt-10 max-w-2xl font-heading text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl">
          {t.heading}
        </h2>
        <p className="mt-4 text-white/50">{t.sub}</p>
        <div className="mt-8 flex justify-center">
          <AppStoreBadge large />
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const t = S.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <SportLensWordmark size={18} />
          <p className="mt-3 text-sm text-white/45">{t.tagline}</p>
        </div>
        <div className="flex gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{t.legalHeading}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/sportlens/privacy" className="text-white/70 hover:text-white">
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/sportlens/terms" className="text-white/70 hover:text-white">
                  {t.termsOfUse}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{t.contactHeading}</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} aria-label={t.ariaEmail} className="mt-3 block text-sm text-white/70 hover:text-white">
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-white/30">{t.copyright(year)}</p>
    </footer>
  );
}

export function SportLensPage() {
  return (
    <main className="min-h-screen bg-black font-sans text-white antialiased [scroll-behavior:smooth]">
      <Nav />
      <Hero />
      <SportsBand />
      <PickSection />
      <ScoutSection />
      <Numbers />
      <Bento />
      <Responsible />
      <FinalCta />
      <Footer />
    </main>
  );
}
