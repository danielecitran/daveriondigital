import type { Metadata } from "next";

import { StudioShell } from "@/components/studio/studio-shell";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/seo";

const DESCRIPTION = `Careers at ${SITE_NAME}, an independent app studio from Zurich. No open roles right now, but open applications are welcome.`;

export const metadata: Metadata = {
  title: "Careers",
  description: DESCRIPTION,
  alternates: { canonical: "/careers" },
  openGraph: { title: `Careers | ${SITE_NAME}`, description: DESCRIPTION, url: "/careers" },
};

/** Sobald es Stellen gibt: hier eintragen, die Liste rendert sich nach Bereich gruppiert. */
const ROLES: ReadonlyArray<{ title: string; team: string; location: string; href: string }> = [];

export default function CareersPage() {
  const teams = [...new Set(ROLES.map((role) => role.team))];

  return (
    <StudioShell>
      <div className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 md:px-8 md:pt-16">
        <div className="studio-rise mx-auto max-w-4xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] leading-none tracking-[-0.012em] text-bone">
              Open roles
            </h1>
            <p className="pb-1.5 text-[13px] text-ash">
              {ROLES.length === 0 ? "0 open positions" : `${ROLES.length} open positions`}
            </p>
          </div>

          <div className="mt-10 border-t border-white/[0.07] md:mt-14">
            {ROLES.length === 0 ? (
              <div className="flex flex-col gap-2 border-b border-white/[0.07] py-8 md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-10">
                <p className="text-[17px] text-bone">Nothing open right now.</p>
                <p className="max-w-md text-[15px] leading-relaxed text-ash">
                  We&apos;re a small team and we hire rarely. When a role opens up, it
                  shows up here first.
                </p>
              </div>
            ) : (
              teams.map((team) => (
                <div key={team} className="pt-8">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ash">{team}</p>
                  <ul className="mt-3">
                    {ROLES.filter((role) => role.team === team).map((role) => (
                      <li
                        key={role.href}
                        className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/[0.07] py-5 md:grid-cols-[1fr_12rem_auto]"
                      >
                        <span className="text-bone">{role.title}</span>
                        <span className="hidden text-ash md:block">{role.location}</span>
                        <a href={role.href} className="text-ash underline-offset-4 hover:text-bone hover:underline">
                          learn more
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-ink-900 p-6 sm:p-8 md:mt-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-[1.9rem] leading-tight text-bone">
                Think you&apos;d fit anyway?
              </h2>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">
                Tell us who you are and send us something you&apos;ve built, like an
                app, a repo, a design or a video. We read every application.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Open application")}`}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-bone px-5 text-base lowercase text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone/70"
            >
              send an open application
            </a>
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
