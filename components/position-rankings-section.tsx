import { getSeasonLabel, getPositionCards } from "@/lib/rankings-data"
import { PositionRankingsCards } from "./position-rankings-cards"

export async function PositionRankingsSection() {
  const [seasonLabel, cards] = await Promise.all([getSeasonLabel(), getPositionCards()])

  return (
    <section id="rankings" className="border-y border-white/10 bg-secondary py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black text-white text-balance md:text-5xl">
            Position Rankings
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white text-pretty">{seasonLabel}</p>
        </div>

        <PositionRankingsCards cards={cards} />
      </div>
    </section>
  )
}
