"use client"

import { useEffect } from "react"
import Link from "next/link"
import { HeroBackground } from "@/components/hero-background"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-primary to-secondary pt-16">
      <HeroBackground />

      <div className="relative z-10 text-center px-4">
        <p className="text-7xl md:text-8xl font-black text-white mb-4 leading-none">Oops!</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/70 text-lg mb-10 max-w-sm mx-auto">
          An unexpected error occurred. You can try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="bg-white text-secondary font-bold text-lg px-8 py-3 rounded-xl shadow-2xl hover:bg-white/90 hover:scale-105 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-white/20 text-white font-bold text-lg px-8 py-3 rounded-xl hover:bg-white/30 hover:scale-105 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
