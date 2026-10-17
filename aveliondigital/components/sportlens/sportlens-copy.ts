export const S = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    ariaLabel: "Main navigation",
    ariaHome: "SportLens – Back to the SportLens page",
  },
  hero: {
    headlineL1: "Professional AI",
    headlineL2: "Betting Analysis in",
    headlineAccent: "Seconds.",
    sub: "Get win chances, fair odds and clear picks for every game, compared against 30+ bookmakers, with an AI mentor that explains every bet.",
  },
  howItWorks: {
    eyebrow: "3 simple steps",
    heading: "How it works",
    steps: [
      {
        title: "Pick your sports",
        description:
          "Choose the leagues you follow, how you read odds and how much detail you want from Scout.",
      },
      {
        title: "We price every game",
        description:
          "Our own model, sharpened by AI, weighs seasons of results against the prices of 30+ bookmakers.",
      },
      {
        title: "See what's worth betting",
        description:
          "Every pick is graded, shows how much to stake and comes with the numbers behind it. Ask Scout if anything is unclear.",
      },
    ],
  },
  features: {
    eyebrow: "Features",
    heading: "What SportLens can do",
    subtitle: "Everything you need to bet with a plan, all in one app.",
    items: [
      {
        title: "Win Chances and Fair Odds",
        description:
          "For every game across the NBA, NFL, NHL, MLB and top European football: our model's win chance and the fair price it implies.",
      },
      {
        title: "Our Model vs. the Bookmakers",
        description:
          "Every price is compared with the average of 30+ bookmakers, so you see at a glance where the odds pay more than they should.",
      },
      {
        title: "Clear Picks and Stake Sizes",
        description:
          "Picks are graded Best bet, Value or Longshot, with how much of your bankroll to stake. When there is no edge, SportLens says so.",
      },
      {
        title: "Player Props and Corners",
        description:
          "Projected from real game logs, minutes and the opponent, then checked against every bookmaker's line.",
      },
      {
        title: "Scout, Your Betting Mentor",
        description:
          "Ask about any game or pick and get a clear answer in seconds, explained at your level, from casual fan to data nerd.",
      },
      {
        title: "Your Odds, Your Language",
        description:
          "Decimal, fractional or American odds, kickoff times in your time zone, and the whole app in six languages.",
      },
    ],
  },
  valueProps: {
    headingPart1: "What takes hours of research,",
    headingAccent: "SportLens shows you at a glance.",
    items: [
      {
        stat: "30+",
        label: "bookmakers",
        description: "Compared on every game we price",
      },
      {
        stat: "24/7",
        label: "Scout",
        description: "Your AI betting mentor is always there for you",
      },
      {
        stat: "0",
        label: "ads or trackers",
        description: "No account needed, and your chats stay on your phone",
      },
    ],
  },
  cta: {
    eyebrow: "Coming soon to the App Store",
    heading: "Find the value bets with SportLens",
    sub: "Less guessing, more confidence on every bet.",
  },
  responsible: {
    eyebrow: "18+ · Responsible gambling",
    heading: "Bet with a clear head.",
    body: "SportLens is for adults of legal betting age. Our picks are estimates, not guarantees, and even well-priced bets lose often.",
    principles: [
      {
        title: "Set a budget first",
        description:
          "Decide before you start how much you can afford to lose, and stop when it's gone.",
      },
      {
        title: "Never chase losses",
        description:
          "Losing runs happen, even with good picks. Raising your stakes to win money back rarely ends well.",
      },
      {
        title: "Take a break",
        description:
          "If betting stops being fun or starts to feel like pressure, step away and talk to someone.",
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
  appStore: {
    line1: "Download on the",
    line2: "App Store",
  },
  footer: {
    tagline: "Clear sports analysis. Smarter bets.",
    connectHeading: "Connect with us",
    legalHeading: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    contactHeading: "Contact",
    copyright: (year: number) => `© ${year} Daverion Digital`,
    ariaEmail: "Contact SportLens by email",
    ariaLegal: "Legal links",
  },
} as const;
