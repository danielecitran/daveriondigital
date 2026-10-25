import Link from "next/link";

import { cn } from "@/lib/utils";

const links = [
  { label: "imprint", href: "/imprint" },
  { label: "privacy", href: "/privacy" },
  { label: "terms", href: "/terms" },
] as const;

export function StudioFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "relative z-10 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 md:px-8",
        className,
      )}
    >
      <div className="flex flex-col-reverse gap-3 px-1 text-[13px] text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Daverion Digital KLG</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="lowercase transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
