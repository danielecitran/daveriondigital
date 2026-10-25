import { RetroComputer } from "@/components/studio/retro-computer";
import { RotatingWord } from "@/components/studio/rotating-word";

/** Erstes Wort = Ruhezustand und das, was Suchmaschinen/Screenreader lesen. */
const WORDS = ["better", "easier", "healthier", "calmer", "simpler", "happier"] as const;

export function StudioHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-4 mb-4 flex flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900 sm:mx-6 md:mx-8 md:rounded-[1.75rem]"
    >
      <div className="relative grid w-full grid-cols-1 content-center justify-items-center gap-10 px-6 pb-12 pt-10 sm:gap-14 sm:px-10 sm:pb-14 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-10 xl:gap-12 xl:px-12 lg:py-16">
        <div className="studio-rise w-full max-w-[34rem] lg:w-auto lg:max-w-none lg:justify-self-center">
          <h1
            id="hero-title"
            className="font-serif text-[clamp(1.75rem,8.6vw,3.25rem)] leading-[1.02] tracking-[-0.012em] text-bone lg:text-[clamp(1.85rem,2.95vw,3.6rem)]"
          >
            <span className="sr-only">
              We build apps that make people&apos;s lives better every day.
            </span>
            <span aria-hidden>
              We build apps that make
              <br />
              people&apos;s lives <RotatingWord words={WORDS} className="italic" />
              <br />
              every day.
            </span>
          </h1>
        </div>

        <RetroComputer className="studio-rise w-[min(66vw,19.5rem)] [animation-delay:120ms] lg:w-[clamp(17rem,24vw,25rem)]" />

        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
