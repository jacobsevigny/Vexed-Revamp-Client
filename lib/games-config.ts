export const GAMES = [
  {
    id: "dailyquest",
    title: "Daily Quest",
    href: "/dailyquest",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daily-quest-xEdLnWtWdxs0s2Boj9SnRpQMx0dQZZ.png",
  },
  {
    id: "fanfeud",
    title: "Fan Feud",
    href: "/fanfeud",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-feud-sGYenYe9XUg6x6ksnhQmrYMOnWnOOo.png",
  },
  {
    id: "careerpath",
    title: "Career Path",
    href: "/careerpath",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/career-path-5XXDodosQ38jzCXi9nvjrcEMrJ8OAs.png",
  },
  {
    id: "draftclass",
    title: "Draft Class",
    href: "/draftclass",
    iconUrl: "https://mxful4sao5eyuuei.public.blob.vercel-storage.com/draft-class.png",
  },
] as const

export type GameId = (typeof GAMES)[number]["id"]
