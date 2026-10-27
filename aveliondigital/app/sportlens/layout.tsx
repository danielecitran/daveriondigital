import { Oxanium } from "next/font/google";
import type { ReactNode } from "react";

/** The app's wordmark face: cut corners and heavy strokes, like the S in the logo. */
const oxanium = Oxanium({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-oxanium",
  display: "swap",
});

export default function SportLensLayout({ children }: { children: ReactNode }) {
  return <div className={`${oxanium.variable} min-h-full bg-[#010101]`}>{children}</div>;
}
