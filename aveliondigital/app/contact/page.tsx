import type { Metadata } from "next";

import { ContactForm } from "@/components/studio/contact-form";
import { StudioShell } from "@/components/studio/studio-shell";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/seo";

const DESCRIPTION = `Get in touch with ${SITE_NAME} about partnerships, press, app support or anything else.`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact | ${SITE_NAME}`, description: DESCRIPTION, url: "/contact" },
};

export default function ContactPage() {
  return (
    <StudioShell>
      <div className="px-4 pb-10 pt-6 sm:px-6 md:px-8 md:pb-8 md:pt-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12 xl:gap-16">
          <div className="studio-rise">
            <h1 className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] leading-none tracking-[-0.012em] text-bone">
              Say hello.
            </h1>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ash">
              A partnership, a press question, trouble with one of our apps or an
              idea you can&apos;t stop thinking about. We read every message.
            </p>

            <dl className="mt-8 text-[15px]">
              <div>
                <dt className="text-[13px] text-ash">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-bone underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-bone"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="studio-rise rounded-2xl border border-white/[0.06] bg-ink-900 p-5 [animation-delay:100ms] sm:p-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
