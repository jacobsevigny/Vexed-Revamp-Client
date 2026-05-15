"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, HelpCircle } from "lucide-react"

interface Step {
  step: string
  title: string
  desc: string
}

interface HowToPlayModalProps {
  gameName: string
  subtitle: string
  steps: Step[]
}

export function HowToPlayModal({ gameName, subtitle, steps }: HowToPlayModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        return
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(4, 15, 30, 0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="htp-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            style={{ backgroundColor: "#152a4d", maxHeight: "90svh", overflowY: "auto" }}
          >
            {/* Header */}
            <div
              className="sticky top-0 flex items-start justify-between px-6 pt-5 pb-4 border-b border-white/10"
              style={{ backgroundColor: "#152a4d" }}
            >
              <div>
                <h2 id="htp-title" className="text-lg font-bold text-white leading-tight">
                  How to Play {gameName}
                </h2>
                <p className="text-white/55 text-sm mt-0.5">{subtitle}</p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                aria-label="Close how to play"
                className="ml-4 mt-0.5 shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2eaafd]/60"
              >
                <X size={17} />
              </button>
            </div>

            {/* Steps */}
            <div className="p-5 grid sm:grid-cols-2 gap-3">
              {steps.map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.25, ease: "easeOut" }}
                  className="flex gap-3.5 p-4 rounded-xl border border-white/10"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <span className="text-2xl font-black text-[#2eaafd] shrink-0 leading-none pt-0.5">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{title}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={`How to play ${gameName}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/25 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2eaafd]/60"
      >
        <HelpCircle size={13} strokeWidth={2.2} />
        How to Play
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  )
}
