import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import {
  POSITION_SLUGS,
  POSITION_LABELS,
  isPositionSlug,
  getSeasonLabel,
  getPositionRankings,
  type PositionSlug,
} from "@/lib/rankings-data"
import { RankingHeadshot } from "@/components/ranking-headshot"

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ position: string }>
}): Promise<Metadata> {
  const { position: slug } = await params
  if (!isPositionSlug(slug)) return { title: "Rankings Not Found" }

  const label = POSITION_LABELS[slug]
  return {
    title: `${label} Rankings | Vexed Sports`,
    description: `Our current Top 32 ${label} rankings.`,
  }
}

// ─── Rank badge ───────────────────────────────────────────────────────────────

function RankBadge({ rank, className }: { rank: number; className: string }) {
  return (
    <span className={className}>
      #{rank}
    </span>
  )
}

// ─── Team logo badge ────────────────────────────────────────────────────────────
// Sits in the bottom-right corner of a headshot. Reuses RankingHeadshot's
// null/404 -> render-nothing behavior, since the requirements are identical
// ("if missing or broken, show nothing — never a placeholder or broken icon").

function TeamBadge({ src, className }: { src: string | null; className: string }) {
  return <RankingHeadshot src={src} alt="" className={className} />
}

// ─── Tier 1 — #1 overall (hero) ────────────────────────────────────────────────

function FeaturedFirst({ player }: { player: { rank: number; playerName: string; headShotUrl: string | null; teamLogoUrl: string | null } }) {
  return (
    <div className="mb-4 flex flex-col items-center gap-4 rounded-3xl border border-primary/30 bg-white/[0.04] px-8 py-10 text-center">
      {/* Unclipped wrapper (relative, no overflow-hidden) so the corner badge
          below isn't cut off by the inner circle's clip mask. */}
      <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
        <div className="h-full w-full overflow-hidden rounded-full border-2 border-primary/40 bg-white/5">
          <RankingHeadshot
            src={player.headShotUrl}
            alt={player.playerName}
            className="h-full w-full object-cover"
          />
        </div>
        <TeamBadge
          src={player.teamLogoUrl}
          className="absolute bottom-0 right-0 h-9 w-8 rounded-md border border-white/20 bg-[#0a2d52] object-contain p-0.5 shadow-md"
        />
      </div>
      <div>
        <RankBadge
          rank={player.rank}
          className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-black text-white"
        />
        <h2 className="text-2xl font-black text-white sm:text-3xl">{player.playerName}</h2>
      </div>
    </div>
  )
}

// ─── Tier 2 — ranks 2-5 ─────────────────────────────────────────────────────────

function FeaturedNext({ players }: { players: { rank: number; playerName: string; headShotUrl: string | null; teamLogoUrl: string | null }[] }) {
  return (
    <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {players.map((p) => (
        <div
          key={p.rank}
          className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center"
        >
          <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
            <div className="h-full w-full overflow-hidden rounded-full border border-white/15 bg-white/5">
              <RankingHeadshot src={p.headShotUrl} alt={p.playerName} className="h-full w-full object-cover" />
            </div>
            <TeamBadge
              src={p.teamLogoUrl}
              className="absolute bottom-0 right-0 h-7 w-6 rounded border border-white/20 bg-[#0a2d52] object-contain p-0.5 shadow-md"
            />
          </div>
          <div>
            <RankBadge rank={p.rank} className="text-xs font-bold text-white/50" />
            <p className="mt-0.5 text-sm font-bold leading-snug text-white">{p.playerName}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Tier 3 — ranks 6-32 ─────────────────────────────────────────────────────────
// Same vertical card structure as FeaturedNext (#2-5) above, scaled down:
// headshot ~65-70% of the #2-5 size, everything else matched exactly.

function CompactGrid({ players }: { players: { rank: number; playerName: string; headShotUrl: string | null; teamLogoUrl: string | null }[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {players.map((p) => (
        <div
          key={p.rank}
          className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center"
        >
          <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <div className="h-full w-full overflow-hidden rounded-full border border-white/15 bg-white/5">
              <RankingHeadshot src={p.headShotUrl} alt={p.playerName} className="h-full w-full object-cover" />
            </div>
            <TeamBadge
              src={p.teamLogoUrl}
              className="absolute bottom-0 right-0 h-5 w-4 rounded border border-white/20 bg-[#0a2d52] object-contain p-0.5 shadow-md sm:h-6 sm:w-5"
            />
          </div>
          <div>
            <RankBadge rank={p.rank} className="text-xs font-bold text-white/50" />
            <p className="mt-0.5 text-xs font-bold leading-snug text-white">{p.playerName}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PositionRankingsPage({
  params,
}: {
  params: Promise<{ position: string }>
}) {
  const { position: slug } = await params
  if (!isPositionSlug(slug)) notFound()

  const typedSlug: PositionSlug = slug
  const label = POSITION_LABELS[typedSlug]
  const code = POSITION_SLUGS[typedSlug]

  const [seasonLabel, players] = await Promise.all([getSeasonLabel(), getPositionRankings(code)])

  const first = players[0]
  const next4 = players.slice(1, 5)
  const rest = players.slice(5)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-20">
        <Link
          href="/#rankings"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> All Rankings
        </Link>

        <header className="mb-12 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/35">
            Vexed Sports
          </p>
          <h1 className="text-4xl font-black text-white text-balance md:text-5xl">
            {label} Rankings
          </h1>
          <p className="mt-3 text-white/50">{seasonLabel}</p>
        </header>

        {players.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 py-20 text-center text-white/40">
            Rankings for {label} haven&apos;t been published yet.
          </div>
        ) : (
          <>
            {first && <FeaturedFirst player={first} />}
            {next4.length > 0 && <FeaturedNext players={next4} />}
            {rest.length > 0 && <CompactGrid players={rest} />}
          </>
        )}
      </div>
    </div>
  )
}
