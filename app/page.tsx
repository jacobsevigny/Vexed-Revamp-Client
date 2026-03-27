import { HeroSection } from "@/components/hero-section"
import { GamesSection } from "@/components/games-section"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <GamesSection />
      {/* <AboutSection /> */}
    </main>
  )
}
