import type { ReactNode } from "react";

import { StudioFooter } from "@/components/studio/studio-footer";
import { StudioHeader } from "@/components/studio/studio-header";
import { cn } from "@/lib/utils";

/**
 * Rahmen aller Seiten im Studio-Design: Header, Inhalt, schlanker Footer.
 * Nativer Scroll — kein ScrollSmoother wie auf der alten Seite.
 */
export function StudioShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="studio-root relative flex min-h-svh flex-col bg-ink-950 font-sans text-bone">
      <StudioHeader />
      <main className={cn("relative z-10 flex flex-1 flex-col", className)}>{children}</main>
      <StudioFooter />
      <div className="studio-grain" aria-hidden />
    </div>
  );
}
