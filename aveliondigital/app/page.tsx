import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { StudioHero } from "@/components/studio/studio-hero";
import { StudioShell } from "@/components/studio/studio-shell";
import {
  faqJsonLd,
  HOME_FAQ,
  SITE_DESCRIPTION,
  SITE_NAME,
  webPageJsonLd,
} from "@/lib/seo";

const TITLE = SITE_NAME;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            path: "/",
            title: TITLE,
            description: SITE_DESCRIPTION,
          }),
          faqJsonLd(HOME_FAQ),
        ]}
      />
      <StudioShell>
        <StudioHero />
      </StudioShell>
    </>
  );
}
