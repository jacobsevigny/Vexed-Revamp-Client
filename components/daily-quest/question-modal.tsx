"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Props = {
  question: string
  answersDb: string
  allNames?: string[]
  onSubmit?: (input: string) => void
  onClose: () => void
  review?: boolean
  guess?: string
  correctAnswer?: string
  wasCorrect?: boolean
}

export default function QuestionModal({
  question,
  answersDb,
  allNames,
  onSubmit,
  onClose,
  review,
  guess,
  correctAnswer,
  wasCorrect,
}: Props) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose()
      }
    }
    window.addEventListener("mousedown", handleClickOutside)
    return () => window.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .trim()

  useEffect(() => {
    if (!input.trim() || !allNames || allNames.length === 0) {
      setSuggestions([])
      return
    }
    const normalizedInput = normalize(input.trim())
    const filtered = allNames.filter((name) => normalize(name).includes(normalizedInput)).slice(0, 10)
    setSuggestions(filtered)
  }, [input, allNames])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && onSubmit) {
      onSubmit(input)
      setInput("")
    }
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-start justify-center p-4 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#2a569c] rounded-3xl shadow-2xl w-full max-w-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#152a4d] to-[#2a569c] p-6 md:p-8 rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-white text-center pr-8">{question}</h2>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {review ? (
              <div className="flex flex-col gap-4">
                <div
                  className={`p-4 rounded-xl border-2 ${
                    wasCorrect ? "bg-[#08947C] border-[#08947C]" : "bg-[#ff346c] border-[#ff346c]"
                  }`}
                >
                  <p className="text-sm text-white/80 mb-1">Your Answer:</p>
                  <p className="text-lg font-bold text-white">{guess}</p>
                </div>
                {!wasCorrect && (
                  <div className="p-4 rounded-xl border-2 bg-[#08947C] border-[#08947C]">
                    <p className="text-sm text-white/80 mb-1">Correct Answer:</p>
                    <p className="text-lg font-bold text-white">{correctAnswer}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    name="answer"
                    type="text"
                    placeholder="Type your answer..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-6 py-4 text-lg bg-[#152a4d] text-white placeholder:text-white/50 border-2 border-[#152a4d] rounded-xl focus:outline-none focus:border-[#2eaafd] focus:ring-4 focus:ring-[#2eaafd]/20 transition-all"
                    autoFocus
                    autoComplete="off"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#152a4d] border-2 border-[#2eaafd] rounded-xl shadow-xl max-h-60 overflow-y-auto z-[10001]">
                      {suggestions.map((name, idx) => (
                        <div
                          key={idx}
                          className="px-6 py-3 cursor-pointer text-white hover:bg-[#2eaafd]/20 transition-colors border-b border-white/10 last:border-b-0"
                          onClick={() => {
                            if (onSubmit) {
                              onSubmit(name)
                              setInput("")
                            }
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
