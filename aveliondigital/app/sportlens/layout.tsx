import type { ReactNode } from "react";

export default function SportLensLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-full bg-[#010101]">{children}</div>;
}
