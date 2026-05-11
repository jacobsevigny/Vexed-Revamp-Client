import { AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

interface NoPuzzleTodayProps {
  game: string
}

export function NoPuzzleToday({ game }: NoPuzzleTodayProps) {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center pt-16 px-4"
        style={{ backgroundColor: "#2eaafd" }}
      >
        <div
          className="rounded-2xl border border-white/10 shadow-xl p-8 text-center max-w-sm w-full"
          style={{ backgroundColor: "#082644" }}
        >
          <AlertCircle className="h-12 w-12 text-white/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No puzzle today</h2>
          <p className="text-white/60 text-sm">
            Check back tomorrow for a new {game} challenge.
          </p>
        </div>
      </div>
    </>
  )
}
