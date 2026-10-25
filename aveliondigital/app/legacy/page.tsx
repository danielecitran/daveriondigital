import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/intro-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ScrollSmoothLayout } from "@/components/scroll-smooth-layout";
import { ServicesScroll } from "@/components/services-scroll";
import { Header } from "@/components/ui/header-2";

/**
 * Die frühere Agentur-Startseite. Bleibt erreichbar, ist aber nirgends
 * verlinkt, nicht in der Sitemap und für Suchmaschinen auf noindex.
 */
export const metadata: Metadata = {
  title: "Archive",
  robots: { index: false, follow: false },
};

export default function LegacyHome() {
  return (
    <>
      <Header />
      <ScrollSmoothLayout>
        <div className="relative bg-[#050508]">
          <Hero />
          <div className="bg-white">
            <IntroSection />
          </div>
          <ServicesScroll />
          <PortfolioSection />
          <ContactSection />
        </div>
      </ScrollSmoothLayout>
    </>
  );
}
