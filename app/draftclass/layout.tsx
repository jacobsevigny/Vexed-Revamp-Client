import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Draft Class",
  description:
    "Identify an NFL team from their draft class picks on Vexed Sports. Clues unlock with each wrong guess — use as few as possible for the best score. Updated daily.",
  openGraph: { url: "https://vexedsports.com/draftclass" },
}

export default function DraftClassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
