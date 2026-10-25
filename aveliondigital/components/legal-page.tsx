import type { ReactNode } from "react";

import { StudioShell } from "@/components/studio/studio-shell";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <StudioShell>
      <div className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 md:px-8 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="studio-rise font-serif text-[clamp(2.75rem,7vw,4.5rem)] leading-none tracking-[-0.012em] text-bone">
            {title}
          </h1>
          {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
        </div>
      </div>
    </StudioShell>
  );
}
