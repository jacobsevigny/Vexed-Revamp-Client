"use client"

import { Button } from "@/components/ui/button"
import { HeroBackground } from "@/components/hero-background"

export function HeroSection() {
  const scrollToGames = () => {
    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-primary to-secondary pt-16">
      <HeroBackground />

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
            <img src="/logo-circle.svg" alt="" aria-hidden="true" className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
