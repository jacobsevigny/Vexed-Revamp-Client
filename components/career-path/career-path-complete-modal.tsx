"use client"

import { GameCompleteModal } from "@/components/game-complete-modal"

type Props = {
  onClose: () => void
  gameOver?: boolean
  playerName?: string
}

export function CareerPathCompleteModal({ onClose, gameOver, playerName }: Props) {
  const getMessage = () => {
    if (gameOver) return playerName ? `The correct player was: ${playerName}` : "The correct player was not guessed."
    return playerName ? `You guessed the correct player: ${playerName}` : "You completed the career path!"
  }

  return (
    <GameCompleteModal
      onClose={onClose}
      title={gameOver ? "Game Over!" : "Career Path Complete!"}
      badge={
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-2xl shadow-lg">
          <span className="text-lg sm:text-2xl font-bold">{playerName ?? "Player"}</span>
        </div>
      }
      message={getMessage()}
      subMessage="Come back tomorrow to play again!"
      currentGame="careerpath"
    />
  )
}
