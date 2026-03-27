"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToGames = () => {
    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-primary to-secondary pt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 p-8 -rotate-12 scale-150">
          {Array.from({ length: 35 }).map((_, index) => {
            const row = Math.floor(index / 5)
            const col = index % 5
            const isCircle = (row + col) % 2 === 0

            return (
              <div key={index} className="flex items-center justify-center">
                {isCircle ? (
                  <Image
                    src="/logo-circle.svg"
                    alt=""
                    width={120}
                    height={120}
                    className="w-20 h-20 md:w-28 md:h-28 opacity-60"
                  />
                ) : (
                  <Image
                    src="/logo-text.svg"
                    alt=""
                    width={180}
                    height={70}
                    className="w-28 h-11 md:w-40 md:h-16 opacity-60"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 text-balance leading-tight">
          Test Your Sports Knowledge Every Day.
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
          Play daily trivia challenges, climb the leaderboards, and prove you're the ultimate fan.
        </p>

        {/* CTAs */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={scrollToGames}
            className="bg-white text-secondary hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:scale-105 transition-transform"
          >
            Play Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
