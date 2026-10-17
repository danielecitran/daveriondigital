import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { SportLensPage } from "@/components/sportlens/sportlens-page";
import { SPORTLENS_DESCRIPTION, SPORTLENS_NAME, SPORTLENS_PATH, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "SportLens App | Sports Analysis",
  },
  description: SPORTLENS_DESCRIPTION,
  alternates: { canonical: SPORTLENS_PATH },
  openGraph: {
    title: "SportLens App | Sports Analysis",
    description: SPORTLENS_DESCRIPTION,
    url: SPORTLENS_PATH,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SportLens App | Sports Analysis",
    description: SPORTLENS_DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            path: SPORTLENS_PATH,
            title: `${SPORTLENS_NAME} App | Sports Analysis`,
            description: SPORTLENS_DESCRIPTION,
          }),
        ]}
      />
      <SportLensPage />
    </>
  );
}
