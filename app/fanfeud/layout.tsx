import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fan Feud",
  description:
    "Name all top answers on the board on Vexed Sports. New challenge every day.",
  openGraph: { url: "https://vexedsports.com/fanfeud" },
}

export default function FanFeudLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
