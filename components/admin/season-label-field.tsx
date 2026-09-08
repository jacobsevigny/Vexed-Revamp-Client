"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { authFetch } from "@/lib/api"
import { DEFAULT_SEASON_LABEL } from "@/lib/rankings-data"

const SETTING_KEY = "rankings_season_label"

const DARK_INPUT =
  "bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-white/20"

export function SeasonLabelField() {
  const { toast } = useToast()
  const [value, setValue] = useState(DEFAULT_SEASON_LABEL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await authFetch(`/api/settings?key=${SETTING_KEY}`)
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled && data?.value) setValue(data.value)
      } catch {
        // keep default — field just starts with the default text
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await authFetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: SETTING_KEY, value }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err?.error || "Failed to save season label", variant: "destructive" })
        return
      }
      toast({ title: "Saved!", description: "Season label updated." })
    } catch {
      toast({ title: "Error", description: "Network error — please try again.", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4">
      <Label htmlFor="season-label" className="mb-1.5 block text-sm font-medium text-white/80">
        Season Label
      </Label>
      <div className="flex gap-2">
        <Input
          id="season-label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          placeholder={DEFAULT_SEASON_LABEL}
          className={DARK_INPUT}
        />
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving || loading}
          className="shrink-0 bg-primary font-semibold hover:bg-primary/90"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </div>
      <p className="mt-2 text-xs text-white/40">
        Shown as the subtitle on the public Position Rankings section and pages.
      </p>
    </div>
  )
}
