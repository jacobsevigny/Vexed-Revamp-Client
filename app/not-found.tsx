import Link from "next/link"
import { HeroBackground } from "@/components/hero-background"

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-primary to-secondary pt-16">
      <HeroBackground />

      <div className="relative z-10 text-center px-4">
        <p className="text-8xl md:text-9xl font-black text-white mb-4 leading-none">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/70 text-lg mb-10 max-w-sm mx-auto">
          This page could not be found. It may have moved or never existed.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-secondary font-bold text-lg px-8 py-3 rounded-xl shadow-2xl hover:bg-white/90 hover:scale-105 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
