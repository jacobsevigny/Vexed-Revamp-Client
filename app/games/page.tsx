import type { Metadata } from "next"
import { GamesSection } from "@/components/games-section"

export const metadata: Metadata = {
  title: "All Games",
  description:
    "Browse all four Vexed Sports daily trivia games — Daily Quest, Fan Feud, Career Path, and Draft Class. Free to play. New challenges every day for NFL, NBA, and NHL fans.",
  openGraph: { url: "https://vexedsports.com/games" },
}

export default function GamesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#2eaafd" }}>
      <div className="pt-16">
        <GamesSection />
      </div>
    </div>
  )
}
