export const S = {
  nav: {
    picks: "Picks",
    scout: "Scout",
    sports: "Sports",
    responsible: "Play safe",
    ariaLabel: "Main navigation",
    ariaHome: "SportLens – Back to the SportLens page",
  },
  hero: {
    headlineL1: "Know which bets",
    headlineL2: "are worth taking.",
    sub: "SportLens prices every game with its own model, checks it against 30+ bookmakers and tells you plainly when a bet is worth it, and when it isn't.",
  },
  sportsBand: {
    label: "One model, every sport you follow",
    sports: ["Football", "NBA", "NFL", "NHL", "MLB", "Tennis", "MMA"],
  },
  pick: {
    eyebrow: "Inside a pick",
    heading: "Every pick shows its working.",
    sub: "No mystery tips. You see what our model expects, what the bookmakers expect, and how much the gap is worth.",
    example: "Example",
    callouts: [
      {
        title: "Our number against theirs",
        body: "The model gives this bet 67%. The bookmakers' average says 56%. That gap is the edge.",
      },
      {
        title: "How much to stake",
        body: "Strong picks get 1 unit, smaller edges half a unit. When there is no real edge, SportLens says so.",
      },
      {
        title: "The reason in one line",
        body: "Every card says why in plain words, and Scout explains the rest if you ask.",
      },
    ],
  },
  scout: {
    eyebrow: "Scout",
    heading: "A betting mentor that talks your language.",
    sub: "Ask about any game, prop or price and get a straight answer in seconds. Scout explains at your level, from casual fan to data nerd.",
    bullets: [
      "Answers from the same numbers you see in the app",
      "Says so when a bet has no edge",
      "Available in six languages",
    ],
  },
  numbers: [
    { stat: "75,000+", label: "past games behind the model" },
    { stat: "30+", label: "bookmakers averaged on every game" },
    { stat: "7", label: "sports, from the Premier League to the UFC" },
    { stat: "0", label: "ads or trackers in the app" },
  ],
  bento: {
    heading: "Built around how you bet.",
    tiles: {
      props: {
        title: "Player props from real game logs",
        body: "Minutes, recent form and the opponent, projected and checked against every bookmaker's line.",
      },
      odds: {
        title: "Your odds format",
        body: "Decimal, fractional or American.",
      },
      languages: {
        title: "Six languages",
        body: "English, Deutsch, Français, Español, Italiano, Português.",
      },
      times: {
        title: "Kickoffs in your time",
        body: "Every game in your own time zone, in 12 or 24 hours.",
      },
      private: {
        title: "No account needed",
        body: "Your settings and Scout chats stay on your phone.",
      },
    },
  },
  responsible: {
    eyebrow: "18+ · Responsible gambling",
    heading: "Bet with a clear head.",
    body: "SportLens is for adults of legal betting age. Our picks are estimates, not guarantees, and even well-priced bets lose often.",
    principles: [
      {
        title: "Set a budget first",
        description: "Decide before you start how much you can afford to lose, and stop when it's gone.",
      },
      {
        title: "Never chase losses",
        description:
          "Losing runs happen, even with good picks. Raising your stakes to win money back rarely ends well.",
      },
      {
        title: "Take a break",
        description: "If betting stops being fun or starts to feel like pressure, step away and talk to someone.",
      },
    ],
    helpHeading: "Free, confidential help",
    helpBody: "Worried about your betting, or someone else's? These services are there to help.",
    help: [
      { country: "Switzerland", name: "SOS Spielsucht", url: "https://www.sos-spielsucht.ch" },
      { country: "Germany", name: "Check dein Spiel", url: "https://www.check-dein-spiel.de" },
      { country: "Austria", name: "Spielsuchthilfe", url: "https://www.spielsuchthilfe.at" },
      { country: "United Kingdom", name: "GambleAware", url: "https://www.gambleaware.org" },
      { country: "United States", name: "1-800-GAMBLER", url: "https://www.1800gambler.net" },
      { country: "Everywhere else", name: "Gambling Therapy", url: "https://www.gamblingtherapy.org" },
    ],
    disclaimer:
      "SportLens provides sports analysis and does not accept bets. Not affiliated with any league, club or bookmaker.",
  },
  cta: {
    heading: "Your next matchday, with a plan.",
    sub: "Made for iPhone. 18+ only.",
  },
  appStore: {
    line1: "Download on the",
    /** Until the listing is live. */
    soonLine1: "Coming soon to the",
    line2: "App Store",
  },
  footer: {
    tagline: "Know which bets are worth taking.",
    legalHeading: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    contactHeading: "Contact",
    copyright: (year: number) => `© ${year} Daverion Digital`,
    ariaEmail: "Contact SportLens by email",
  },
} as const;
