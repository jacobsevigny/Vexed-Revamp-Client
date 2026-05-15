"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GAMES, type GameId } from "@/lib/games-config"

type Props = {
  currentGame: GameId
}

export function GameNavHub({ currentGame }: Props) {
  return (
    <section aria-label="Other Vexed Sports games" className="w-full max-w-3xl mx-auto px-4 pt-10 pb-14">
      <div className="border-t border-white/15 mb-8" />
      <p className="text-white/50 text-[11px] font-semibold uppercase tracking-widest text-center mb-5">
        More Games
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GAMES.map((game, i) => {
          const isActive = game.id === currentGame

          const inner = (
            <div className="flex flex-col items-center gap-2.5 p-4 text-center">
              <img
                src={game.iconUrl}
                alt={`${game.title} game icon`}
                width={52}
                height={52}
                className={`object-contain transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}
                style={{ width: 52, height: 52 }}
              />
              <p
                className={`text-sm font-bold leading-tight ${
                  isActive ? "text-white" : "text-white/70 group-hover:text-white transition-colors duration-200"
                }`}
              >
                {game.title}
              </p>
              {isActive && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2eaafd]/20 text-[#2eaafd]">
                  Playing
                </span>
              )}
            </div>
          )

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 320, damping: 26 }}
            >
              {isActive ? (
                <div
                  aria-current="page"
                  className="rounded-2xl border border-[#2eaafd]/40 bg-[#2eaafd]/10 cursor-default"
                >
                  {inner}
                </div>
              ) : (
                <Link
                  href={game.href}
                  aria-label={`Play ${game.title}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  {inner}
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
