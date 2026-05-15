"use client"

import { GameCompleteModal } from "@/components/game-complete-modal"

type Props = {
  onClose: () => void
  solved: boolean
  year: number | null
  correctTeam: string | null
  correctTeamLogo: string | null
  guessCount: number
}

export function DraftClassCompleteModal({
  onClose,
  solved,
  year,
  correctTeam,
  correctTeamLogo,
  guessCount,
}: Props) {
  const getScoreMessage = () => {
    if (!solved) return "Better luck next time! 💪"
    if (guessCount === 1) return "Incredible! First try! 🎉"
    if (guessCount === 2) return "Outstanding! 🌟"
    if (guessCount === 3) return "Well done! 👏"
    if (guessCount === 4) return "Good effort! 💡"
    return "You got it! 🏈"
  }

  const getSubMessage = () => {
    const teamLabel = [year, correctTeam].filter(Boolean).join(" ")
    if (solved) {
      const word = guessCount === 1 ? "guess" : "guesses"
      return `You identified the ${teamLabel} draft class in ${guessCount} ${word}.`
    }
    return teamLabel ? `The answer was the ${teamLabel}.` : "Come back and try again tomorrow!"
  }

  const badge = (
    <div className="flex flex-col items-center gap-3">
      {correctTeamLogo && (
        <img
          src={correctTeamLogo}
          alt={`${correctTeam ?? "team"} logo`}
          className="h-16 w-16 object-contain"
        />
      )}
      <div
        className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl shadow-lg text-white ${
          solved
            ? "bg-gradient-to-r from-[#2a569c] to-[#2eaafd]"
            : "bg-white/10 border border-white/20"
        }`}
      >
        <span className="text-2xl font-bold">{correctTeam ?? "Unknown Team"}</span>
      </div>
    </div>
  )

  return (
    <GameCompleteModal
      onClose={onClose}
      title={solved ? "Draft Class Solved!" : "Game Over!"}
      badge={badge}
      message={getScoreMessage()}
      subMessage={getSubMessage()}
      currentGame="draftclass"
    />
  )
}
