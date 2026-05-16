"use client"

import { GameCompleteModal } from "@/components/game-complete-modal"

type Props = {
  correctCount: number
  totalCount: number
  onClose: () => void
}

export function FanFeudCompleteModal({ correctCount, totalCount, onClose }: Props) {
  const getScoreMessage = () => {
    if (totalCount === 0) return "Nice Try!"
    const pct = correctCount / totalCount
    if (pct === 1) return "Perfect Score! 🎉"
    if (pct >= 0.8) return "Excellent Work! 🌟"
    if (pct >= 0.6) return "Good Job! 👏"
    if (pct >= 0.4) return "Not Bad! 💪"
    return "Keep Practicing! 📚"
  }

  return (
    <GameCompleteModal
      onClose={onClose}
      title="Fan Feud Complete!"
      badge={
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-2xl shadow-lg">
          <span className="text-3xl sm:text-5xl font-bold">{correctCount}</span>
          <span className="text-lg sm:text-2xl font-semibold">/{totalCount}</span>
        </div>
      }
      message={getScoreMessage()}
      subMessage="Come back tomorrow to play again!"
      currentGame="fanfeud"
    />
  )
}
