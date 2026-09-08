"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useAuth } from "@/lib/auth-context"
import { PositionRankingSection, type Position } from "@/components/admin/position-ranking-section"
import { SeasonLabelField } from "@/components/admin/season-label-field"

const SECTIONS: { position: Position; label: string }[] = [
  { position: "QB", label: "Quarterbacks" },
  { position: "RB", label: "Running Backs" },
  { position: "WR", label: "Wide Receivers" },
  { position: "TE", label: "Tight Ends" },
]

// Guard wrapper — keeps all hooks in the inner component so there are no
// Rules-of-Hooks violations from conditional returns.
export default function RankingsPage() {
  const { user, isAuthenticated, isHydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { router.replace("/login?redirect=/admin/rankings"); return }
    if (!user?.isAdmin)   { router.replace("/unauthorized"); return }
  }, [isHydrated, isAuthenticated, user, router])

  if (!isHydrated || !isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2eaafd" }}>
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    )
  }

  return <RankingsContent />
}

function RankingsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52] py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <h1 className="mb-1 text-3xl font-extrabold text-white">Position Rankings</h1>
        <p className="mb-8 text-white/50">
          Curate the Top 32 ranked players for each position. Drag to reorder, search to add.
        </p>

        <SeasonLabelField />

        <Accordion type="multiple" className="space-y-2">
          {SECTIONS.map(({ position, label }) => (
            <AccordionItem
              key={position}
              value={position}
              className="border border-white/10 rounded-xl overflow-visible"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5 rounded-xl text-white [&>svg]:text-white/50">
                <span className="font-semibold text-white">{label}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 overflow-visible">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <PositionRankingSection position={position} label={label} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
