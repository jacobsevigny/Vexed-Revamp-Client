import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { GamesSection } from "@/components/games-section"
import { HomeArticlesSection } from "@/components/articles/home-articles-section"

export const metadata: Metadata = {
  title: "Vexed Sports – Free Daily Sports Trivia",
  description:
    "Play free daily sports trivia games including Daily Quest, Fan Feud, Career Path, and Draft Class. Test your NFL, NBA, and NHL knowledge every day.",
  openGraph: {
    url: "https://vexedsports.com/",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <GamesSection />
      <HomeArticlesSection />
    </main>
  )
}
