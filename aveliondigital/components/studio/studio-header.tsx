"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { StudioLogo } from "@/components/studio/studio-logo";
import { cn } from "@/lib/utils";

/** Kachel-Optik der Navigation: leicht abgesetzt, feine Lichtkante oben. */
export const studioTile =
  "rounded-md border border-white/[0.06] bg-ink-850 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone/70";

export function StudioHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const careersActive = pathname.startsWith("/careers");

  return (
    <header className="relative z-40 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-6 sm:pb-5 md:px-8">
      <nav className="relative z-[60] flex items-center justify-between gap-3" aria-label="Main">
        <Link
          href="/"
          aria-label="Daverion Digital home"
          className={cn(
            studioTile,
            focusRing,
            "flex h-12 shrink-0 items-center px-3.5 transition-colors hover:bg-ink-800 sm:h-14 sm:px-4",
          )}
        >
          <StudioLogo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/careers"
            aria-current={careersActive ? "page" : undefined}
            className={cn(
              studioTile,
              focusRing,
              "inline-flex h-12 items-center px-5 text-base lowercase transition-colors hover:bg-ink-800 hover:text-bone",
              careersActive ? "text-bone" : "text-ash",
            )}
          >
            careers
          </Link>
          <Link
            href="/contact"
            className={cn(
              focusRing,
              "inline-flex h-12 items-center rounded-md bg-bone px-5 text-base lowercase text-ink-950",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.4)] transition-colors hover:bg-white",
            )}
          >
            contact
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            studioTile,
            focusRing,
            "flex size-12 shrink-0 items-center justify-center text-bone md:hidden",
          )}
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          aria-controls="studio-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M5 8h14" />
                <path d="M5 12h14" />
                <path d="M5 16h14" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <div
        id="studio-mobile-nav"
        className={cn("fixed inset-0 z-50 md:hidden", !open && "pointer-events-none")}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="close menu"
          tabIndex={open ? 0 : -1}
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-3 top-[calc(max(1rem,env(safe-area-inset-top))+3.75rem)] origin-top rounded-xl border border-white/[0.07] bg-ink-850 p-2",
            "shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.98] opacity-0",
          )}
        >
          <Link
            href="/careers"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={cn(
              focusRing,
              "block rounded-lg px-4 py-3.5 text-base lowercase text-bone transition-colors hover:bg-ink-800",
            )}
          >
            careers
          </Link>
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={cn(
              focusRing,
              "mt-2 flex items-center justify-center rounded-md bg-bone px-4 py-3.5 text-base lowercase text-ink-950",
            )}
          >
            contact
          </Link>
        </div>
      </div>
    </header>
  );
}
