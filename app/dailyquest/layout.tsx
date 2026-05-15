import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily Quest",
  description:
    "Answer 5 daily NFL trivia questions covering various categories. Answer a question to unlock the next. New questions every day on Vexed Sports.",
  openGraph: { url: "https://vexedsports.com/dailyquest" },
}

export default function DailyQuestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
