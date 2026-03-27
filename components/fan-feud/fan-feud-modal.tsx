"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getAllNames } from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Props = {
  question: string
  answersDb: string
  onSubmit: (guess: string) => void
  shake?: boolean
  allAnswers?: string[]
  incorrectGuesses?: number
  readOnly?: boolean
}

export function FanFeudModal({ question, answersDb, onSubmit, shake, allAnswers, incorrectGuesses = 0, readOnly = false }: Props) {
  const [input, setInput] = useState("")
  const [allNames, setAllNames] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (allAnswers && allAnswers.length > 0) {
      setAllNames(allAnswers)
      return
    }

    // Fetch all names once on mount
    ;(async () => {
      try {
        const names = await getAllNames(answersDb)
        setAllNames(names)
      } catch (err) {
        console.error("All names fetch error:", err)
        setAllNames([])
      }
    })()
  }, [answersDb, allAnswers])

  function normalize(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]/gi, "")
  }

  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([])
      return
    }
    const normalizedInput = normalize(input.trim())
    const filtered = allNames.filter((name) => normalize(name).includes(normalizedInput)).slice(0, 10)
    setSuggestions(filtered)
  }, [input, allNames])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`relative mx-auto z-[9999] w-full max-w-2xl ${shake ? "animate-shake" : ""}`}
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
            <h2 className="text-2xl sm:text-3xl font-black text-center text-white mb-6 drop-shadow-lg">{question}</h2>

            {!readOnly && (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative z-50">
                  <div className="relative">
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
                  </div>

                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full w-full mt-2 bg-[#082644] border-2 border-white/20 rounded-2xl shadow-2xl z-[10000] max-h-60 overflow-y-auto"
                    >
                      {suggestions.map((name, idx) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
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
