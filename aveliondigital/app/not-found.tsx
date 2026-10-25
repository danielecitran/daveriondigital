import type { Metadata } from "next";
import Link from "next/link";

import { StudioShell } from "@/components/studio/studio-shell";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <StudioShell>
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-10 text-center">
        <p className="studio-rise font-serif text-[clamp(6rem,22vw,12rem)] leading-none text-bone/90">
          404
        </p>
        <p className="studio-rise mt-4 max-w-sm text-[15px] leading-relaxed text-ash [animation-delay:80ms]">
          This page doesn&apos;t exist. Maybe it never did.
        </p>
        <Link
          href="/"
          className="studio-rise mt-8 inline-flex h-12 items-center rounded-md bg-bone px-5 text-base lowercase text-ink-950 transition-colors [animation-delay:160ms] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone/70"
        >
          back home
        </Link>
      </div>
    </StudioShell>
  );
}
