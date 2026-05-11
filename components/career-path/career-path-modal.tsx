"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { rankSuggestions } from "@/lib/search-utils"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Props = {
  answersDb: string
  allNames?: string[]
  onSubmit: (guess: string) => void
  shake?: boolean
  incorrectGuesses?: number
  readOnly?: boolean
  playerName?: string
}

export function CareerPathModal({ answersDb, allNames = [], onSubmit, shake, incorrectGuesses = 0, readOnly = false, playerName }: Props) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    setSuggestions(input.trim() && allNames.length ? rankSuggestions(allNames, input.trim()) : [])
  }, [input, allNames])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`w-full max-w-2xl relative z-40 ${shake ? "animate-shake" : ""}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="bg-gradient-to-br from-[#082644] to-[#152a4d] rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-center text-white mb-6 drop-shadow-lg">
              Whose career path is this?
            </h2>

            {/* hide the input when readOnly (keep the question visible, just no textbox) */}
            {!readOnly ? (
              <form onSubmit={handleSubmit}>
                <div className="relative z-[1100]">
                  <input
                    name="answer"
                    type="text"
                    placeholder="Type your answer..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:outline-none focus:border-[#2eaafd] focus:ring-4 focus:ring-[#2eaafd]/20 text-white text-lg placeholder-white/50 font-semibold transition-all duration-300"
                    autoFocus
                    autoComplete="off"
                  />

                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full w-full mt-2 bg-[#082644] border-2 border-white/20 rounded-2xl shadow-2xl z-30 max-h-60 overflow-y-auto overflow-x-hidden"
                    >
                      {suggestions.map((name, idx) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="py-3 px-5 cursor-pointer hover:bg-[#2eaafd]/30 transition-colors border-b border-white/10 last:border-b-0 text-white text-lg font-medium first:rounded-t-2xl last:rounded-b-2xl"
                          onClick={() => {
                            onSubmit(name)
                            setInput("")
                          }}
                        >
                          {name}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </form>
            ) : (
              <div className="w-full text-center">
                <p className="text-white text-lg font-semibold">
                  <span className="text-white/80">Correct Player:&nbsp;</span>
                  <span className="font-bold text-white">{playerName ?? "Unknown Player"}</span>
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="text-white/80 font-bold text-lg mr-2">Lives:</span>
              {Array.from({ length: 3 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 500 }}
                >
                  <Image
                    src="/logo-circle.svg"
                    alt="Life"
                    width={32}
                    height={32}
                    style={{
                      opacity: idx < 3 - incorrectGuesses ? 1 : 0.2,
                      filter:
                        idx < 3 - incorrectGuesses
                          ? "drop-shadow(0 0 8px rgba(46, 170, 253, 0.5))"
                          : "grayscale(1) brightness(0.4)",
                      transition: "all 0.3s",
                    }}
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
