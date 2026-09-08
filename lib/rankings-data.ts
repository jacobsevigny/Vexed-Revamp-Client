// Server-side data helpers for the public Position Rankings feature (home page
// section, /rankings index, /rankings/[position] detail pages). Mirrors the
// fetch-on-the-server + `next: { revalidate }` pattern already used by
// components/articles/home-articles-section.tsx and app/articles/[slug]/page.tsx.

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ""

export const DEFAULT_SEASON_LABEL = "Entering 2026 NFL Season"

export const POSITION_SLUGS = {
  quarterback: "QB",
  "running-back": "RB",
  "wide-receiver": "WR",
  "tight-end": "TE",
} as const

export type PositionSlug = keyof typeof POSITION_SLUGS
export type PositionCode = (typeof POSITION_SLUGS)[PositionSlug]

export const POSITION_LABELS: Record<PositionSlug, string> = {
  quarterback: "Quarterback",
  "running-back": "Running Back",
  "wide-receiver": "Wide Receiver",
  "tight-end": "Tight End",
}

export const POSITION_SLUG_LIST = Object.keys(POSITION_SLUGS) as PositionSlug[]

export function isPositionSlug(value: string): value is PositionSlug {
  return Object.prototype.hasOwnProperty.call(POSITION_SLUGS, value)
}

export type RankedPlayer = {
  rank: number
  playerName: string
  espnId: number | null
  headShotUrl: string | null
  teamAbbreviation: string | null
  teamLogoUrl: string | null
}

export async function getSeasonLabel(): Promise<string> {
  if (!API_BASE) return DEFAULT_SEASON_LABEL
  try {
    const res = await fetch(`${API_BASE}/api/settings?key=rankings_season_label`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return DEFAULT_SEASON_LABEL
    const data = await res.json()
    return data?.value || DEFAULT_SEASON_LABEL
  } catch {
    return DEFAULT_SEASON_LABEL
  }
}

export async function getPositionRankings(position: PositionCode): Promise<RankedPlayer[]> {
  if (!API_BASE) return []
  try {
    const res = await fetch(`${API_BASE}/api/rankings?position=${position}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export type PositionCard = {
  slug: PositionSlug
  label: string
  hasPlayer: boolean
  playerName: string
  headshotUrl: string | null
}

function pickRandom<T>(arr: T[]): T | null {
  if (arr.length === 0) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

// Shared by the home page section and the /rankings index page — fetches all
// four positions in parallel and picks one random ranked player per position
// to feature as the card's headshot.
export async function getPositionCards(): Promise<PositionCard[]> {
  const rankingsByPosition = await Promise.all(
    POSITION_SLUG_LIST.map((slug) => getPositionRankings(POSITION_SLUGS[slug]))
  )

  return POSITION_SLUG_LIST.map((slug, i) => {
    const featured = pickRandom(rankingsByPosition[i])
    return {
      slug,
      label: POSITION_LABELS[slug],
      hasPlayer: !!featured,
      playerName: featured?.playerName ?? "",
      headshotUrl: featured?.headShotUrl ?? null,
    }
  })
}
