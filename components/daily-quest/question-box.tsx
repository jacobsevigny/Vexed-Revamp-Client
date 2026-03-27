"use client"

import { Eye } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

type Props = {
  index: number
  unlocked: boolean
  answered: boolean
  correct: boolean
  locked?: boolean
  onClick: () => void
  active?: boolean
}

const trophyImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q1-rOZnt08GsRDIHnGPDFVfrASC70rIYJ.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q2-IZmcUJXexbvL1qXWB4AOyofm0PPlPU.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q3-GzKC5Eyl5NGxTX5un4E9HItvSuz0b6.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q4-gZ0uyxTJITeZiwiL0NFWHkOsB0Rkth.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q5-jDBIioaILMBEK81kJsok4mziqx1Y10.png",
]

export default function QuestionBox({ index, unlocked, answered, correct, locked, onClick, active }: Props) {
  return (
    <motion.div
      onClick={unlocked ? onClick : undefined}
      className={`
        relative w-24 h-24 md:w-32 md:h-32 rounded-2xl
        flex items-center justify-center
        font-bold text-2xl transition-all duration-300
        ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}
        ${locked ? "opacity-40" : "opacity-100"}
        ${
          answered
            ? correct
              ? "bg-[#08947C] border-4 border-[#152a4d]"
              : "bg-[#ff346c] border-4 border-[#152a4d]"
            : active
              ? "bg-[#2a569c] border-4 border-[#152a4d] shadow-lg shadow-blue-500/50"
              : "bg-[#2a569c] border-4 border-[#152a4d]"
        }
      `}
      whileHover={unlocked ? { scale: 1.05 } : {}}
      whileTap={unlocked ? { scale: 0.95 } : {}}
    >
      <div className="flex flex-col items-center justify-center text-white relative">
        <Image
          src={trophyImages[index] || "/placeholder.svg"}
          alt={`Question ${index + 1}`}
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
        />
        {answered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg"
          >
            <Eye size={16} className="text-[#2a569c]" />
          </motion.div>
        )}
      </div>

      {/* Active indicator */}
      {active && !answered && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-4 border-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
  )
}
