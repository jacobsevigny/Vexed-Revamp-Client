import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Career Path",
  description:
    "Study a player's career team history and guess who they are on Vexed Sports. You have 3 guesses to identify the mystery player. New player every day.",
  openGraph: { url: "https://vexedsports.com/careerpath" },
}

export default function CareerPathLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
