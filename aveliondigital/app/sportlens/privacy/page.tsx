import type { Metadata } from "next";
import Link from "next/link";

import {
  AddressBlock,
  BulletList,
  COMPANY_ADDRESS,
  DataTable,
  DocSection,
  LEGAL_EMAIL,
  SportLensLegalChrome,
  SubSection,
  linkStyle,
} from "@/components/sportlens/sportlens-legal";

export const metadata: Metadata = {
  title: "Privacy Policy | SportLens",
  description:
    "Privacy Policy of the SportLens App — the iOS sports analysis app by Daverion Digital.",
  alternates: { canonical: "/sportlens/privacy" },
};

export default function SportLensPrivacyPage() {
  return (
    <SportLensLegalChrome
      breadcrumb="Privacy Policy"
      eyebrow="Legal"
      pageTitle="Privacy Policy"
      provider="Provided by Daverion Digital"
      date="Last updated: October 27, 2026"
    >
      <DocSection heading="Introduction">
        This Privacy Policy explains how Daverion Digital KLG processes personal data when you use
        the SportLens app. We comply with the Swiss Federal Act on Data Protection (FADP) and,
        where it applies to users in the EU/EEA, the General Data Protection Regulation (GDPR).
      </DocSection>

      <DocSection heading="1. Controller">
        <AddressBlock
          lines={[...COMPANY_ADDRESS, "Commercial register no.: CH-020.2.010.360-8"]}
          email={LEGAL_EMAIL}
        />
      </DocSection>

      <DocSection heading="2. The short version">
        <BulletList
          items={[
            "You don't need an account to use SportLens.",
            "There are no ads, no analytics and no tracking in the app.",
            "Your settings and your Scout chat history are stored on your phone, not on our servers.",
            "Data leaves your phone only when it has to: to load games and picks from our server, to answer your Scout questions (through OpenAI), to manage your subscription (through Apple and RevenueCat), and when the app loads team logos.",
          ]}
        />
      </DocSection>

      <DocSection heading="3. Data we process">
        <SubSection heading="3.1 Loading games and picks">
          When the app loads games, picks and odds, our server receives your IP address, the time
          of the request, the requested address and technical details such as app version,
          operating system and the app&apos;s language. These server logs are used for security
          and troubleshooting, and are deleted automatically after 14 days.
        </SubSection>

        <SubSection heading="3.2 Settings on your device">
          Your chosen sports, odds format, time format and experience level are stored only on your
          device. They are deleted when you delete the app.
        </SubSection>

        <SubSection heading="3.3 Scout">
          When you ask Scout a question, the app sends your message, the recent conversation (up to
          20 messages), the game you&apos;re asking about, your time-zone offset, your odds format,
          your experience level and the app&apos;s language to our server. Our server sends this, together with the game
          data, to OpenAI to generate the answer. If you use SportLens in a language other than
          English, OpenAI also translates your question and the answer. Before your first question,
          the app asks for your permission to send your questions to OpenAI. Without it, nothing is
          sent and Scout stays unused.
          <BulletList
            items={[
              "We do not store your conversations on our server. Your chat history is saved only on your device, and you can delete it in the app.",
              "To prevent abuse, our server keeps your IP address in memory for about a minute to limit how many questions can be sent.",
              "OpenAI processes the data to generate the answers, under OpenAI's API terms and privacy policy. It may be kept for up to 30 days for abuse monitoring.",
            ]}
          />
          Please don&apos;t enter personal information, such as names, contact details or
          financial details, into Scout.
        </SubSection>

        <SubSection heading="3.4 Subscriptions">
          Payments are processed by Apple through the App Store (or Google through Google Play). We
          never see your payment details. To unlock your subscription and restore purchases, we use
          RevenueCat, which receives an anonymous app user ID, your purchase and subscription
          status, transaction information from the app store, your country and currency, app
          version, device type and IP address.
        </SubSection>

        <SubSection heading="3.5 Team logos and images">
          Team logos, flags and player photos are loaded directly from third-party servers, mainly
          ESPN, API-Sports and jsDelivr. When your phone requests an image, these servers receive your IP
          address and basic device information, as they would when you visit any website.
        </SubSection>

        <SubSection heading="3.6 Support">
          If you contact us by email, we use your email address and message to answer you. We keep
          this correspondence as long as needed for your request and for statutory retention
          periods.
        </SubSection>
      </DocSection>

      <DocSection heading="4. Purposes and legal bases">
        We process personal data to provide SportLens and your subscription, to answer your Scout
        questions, to keep the Service secure and working, to handle support requests, and to meet
        legal obligations.
        <br />
        <br />
        Where the GDPR applies, the legal bases are the performance of our contract with you (Art.
        6(1)(b) GDPR), your consent for sending Scout questions to OpenAI (Art. 6(1)(a) GDPR),
        which you can withdraw at any time with effect for the future, our legitimate interest in a secure and reliable service (Art. 6(1)(f)
        GDPR), and compliance with legal obligations (Art. 6(1)(c) GDPR).
      </DocSection>

      <DocSection heading="5. What we don't do">
        <BulletList
          items={[
            "We don't show ads or use advertising SDKs.",
            "We don't use analytics or track you across other apps or websites.",
            "We don't sell or rent personal data.",
            "We don't use profiling or automated decisions that have legal or similarly significant effects on you.",
          ]}
        />
      </DocSection>

      <DocSection heading="6. Recipients">
        We use the following service providers:
        <DataTable
          head={["Provider", "Purpose", "Location"]}
          rows={[
            ["Hetzner Online GmbH", "Hosting of our server", "Germany"],
            ["OpenAI, L.L.C.", "Answers from Scout", "USA"],
            ["RevenueCat, Inc.", "Subscription management", "USA"],
          ]}
        />
        Apple (App Store) and Google (Google Play) process payment data as independent controllers
        under their own privacy policies. ESPN, API-Sports and jsDelivr act independently when serving images.
        We disclose data to authorities only where we are legally required to.
      </DocSection>

      <DocSection heading="7. Transfers abroad">
        Germany and the EU have an adequate level of data protection recognised by Switzerland.
        Transfers to the USA take place on the basis of the Swiss–U.S. and EU–U.S. Data Privacy
        Framework where the recipient is certified, and otherwise on the basis of standard
        contractual clauses recognised by the Federal Data Protection and Information Commissioner
        (FDPIC) and the European Commission.
      </DocSection>

      <DocSection heading="8. How long we keep data">
        <DataTable
          head={["Data", "Kept for"]}
          rows={[
            ["Server logs (IP address, request)", "14 days"],
            ["IP address for Scout abuse protection", "about 1 minute, in memory only"],
            ["Scout conversations", "not stored by us; up to 30 days at OpenAI for abuse monitoring"],
            ["Settings and chat history", "on your device until you delete them or the app"],
            ["Subscription records", "as long as needed for your subscription and statutory retention"],
            ["Support emails", "as long as needed for your request and statutory retention"],
          ]}
        />
      </DocSection>

      <DocSection heading="9. Your rights">
        You have the right to request access to your personal data, and to have it corrected or
        deleted. You can also object to or restrict processing, ask for data portability, and
        withdraw consent you have given, within the limits of the applicable law. Because SportLens
        has no accounts, we may need information from you, such as the approximate time of a
        request or details of your purchase, to find data about you.
        <br />
        <br />
        To exercise your rights, contact us at{" "}
        <a href={`mailto:${LEGAL_EMAIL}`} style={linkStyle}>
          {LEGAL_EMAIL}
        </a>
        . You can lodge a complaint with the Swiss Federal Data Protection and Information
        Commissioner (FDPIC). If you live in the EU/EEA, you can also lodge a complaint with your
        local data protection authority.
      </DocSection>

      <DocSection heading="10. Security">
        All connections between the app and our server are encrypted (HTTPS). Access to our server
        is restricted, and we keep the data we hold to what the Service needs.
      </DocSection>

      <DocSection heading="11. Children">
        SportLens is only for adults aged 18 and over. We do not knowingly process data from
        minors. If you believe a minor has provided us with data, please contact us and we will
        delete it.
      </DocSection>

      <DocSection heading="12. Changes">
        We may update this Privacy Policy when the app or the law changes. The current version is
        always available in the app and on our website, and we will inform you of material changes
        in the app. Our{" "}
        <Link href="/sportlens/terms" style={linkStyle}>
          Terms of Use
        </Link>{" "}
        apply alongside this policy.
      </DocSection>

      <DocSection heading="13. Contact">
        For questions about privacy, or to exercise your rights:
        <AddressBlock lines={[...COMPANY_ADDRESS]} email={LEGAL_EMAIL} />
      </DocSection>
    </SportLensLegalChrome>
  );
}
