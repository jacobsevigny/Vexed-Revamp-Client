"use client"

import { GameCompleteModal } from "@/components/game-complete-modal"

type Props = {
  score: number
  onClose: () => void
}

export default function CompleteModal({ score, onClose }: Props) {
  const getScoreMessage = () => {
    if (score === 5) return "Perfect Score! 🎉"
    if (score >= 4) return "Excellent Work! 🌟"
    if (score >= 3) return "Good Job! 👏"
    if (score >= 2) return "Not Bad! 💪"
    return "Keep Practicing! 📚"
  }

  return (
    <GameCompleteModal
      onClose={onClose}
      title="Daily Quest Complete!"
      badge={
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white px-8 py-4 rounded-2xl shadow-lg">
          <span className="text-5xl font-bold">{score}</span>
          <span className="text-2xl font-semibold">/5</span>
        </div>
      }
      message={getScoreMessage()}
      subMessage="Come back tomorrow for new trivia questions!"
      currentGame="dailyquest"
    />
  )
}
