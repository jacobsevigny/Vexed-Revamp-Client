import Link from "next/link"
import { PositionCardHeadshot } from "./position-card-headshot"
import type { PositionCard } from "@/lib/rankings-data"

export function PositionRankingsCards({ cards }: { cards: PositionCard[] }) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.slug}
          href={`/rankings/${card.slug}`}
          className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] sm:p-6"
        >
          <PositionCardHeadshot src={card.headshotUrl} alt={card.playerName} hasPlayer={card.hasPlayer} />
          <div>
            <h3 className="text-lg font-black text-white sm:text-xl">{card.label}</h3>
            <p className="mt-1 text-xs text-white/45">See our current rankings</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
