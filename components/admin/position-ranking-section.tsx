"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { authFetch } from "@/lib/api"

const DARK_INPUT =
  "bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-white/20"

const TOTAL_SLOTS = 32
const FALLBACK_HEADSHOT = "/placeholder-user.jpg"

export type Position = "QB" | "RB" | "WR" | "TE"

type SearchResult = {
  id: string
  playerName: string
  espnId: number | null
  headshotUrl: string | null
  teamAbbreviation: string | null
}

type ClientPlayer = {
  clientId: string
  playerName: string
  espnId: number | null
  headShotUrl: string | null
  teamAbbreviation: string | null
}

function newId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10)
}

// ─── Headshot with 404 fallback ───────────────────────────────────────────────

function Headshot({ src, alt }: { src: string | null; alt: string }) {
  const [errored, setErrored] = useState(false)
  const finalSrc = !src || errored ? FALLBACK_HEADSHOT : src
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-10 w-10 rounded-full object-cover bg-white/10 shrink-0"
    />
  )
}

// ─── Empty numbered placeholder slot ──────────────────────────────────────────

function EmptySlot({ rank }: { rank: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/10 px-3 py-2.5 text-white/25">
      <span className="w-7 shrink-0 text-center text-sm font-bold">#{rank}</span>
      <span className="text-sm">Empty slot</span>
    </div>
  )
}

// ─── Draggable filled slot ─────────────────────────────────────────────────────

function SortableSlot({
  clientId,
  rank,
  player,
  onRemove,
}: {
  clientId: string
  rank: number
  player: ClientPlayer
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: clientId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-xl border bg-white/5 px-3 py-2 transition-shadow ${
        isDragging ? "opacity-50 shadow-2xl border-white/30" : "border-white/10 hover:border-white/20"
      }`}
    >
      <button
        type="button"
        {...listeners}
        {...attributes}
        className="shrink-0 cursor-grab text-white/25 hover:text-white/60 active:cursor-grabbing"
        title="Drag to reorder"
        tabIndex={-1}
      >
        <GripVertical size={16} />
      </button>

      <span className="w-7 shrink-0 text-center text-sm font-bold text-white/70">#{rank}</span>

      <Headshot src={player.headShotUrl} alt={player.playerName} />

      <span className="min-w-0 flex-1 truncate font-medium text-white">{player.playerName}</span>

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded p-1.5 text-white/30 transition-colors hover:bg-red-500/15 hover:text-red-400"
        title="Remove player"
      >
        <X size={16} />
      </button>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function PositionRankingSection({ position, label }: { position: Position; label: string }) {
  const { toast } = useToast()

  const [players, setPlayers] = useState<ClientPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState<SearchResult | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isFull = players.length >= TOTAL_SLOTS

  // ── Load existing rankings ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const res = await authFetch(`/api/admin/rankings?position=${position}`)
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setPlayers(
          (data || []).map((r: { playerName: string; espnId: number | null; headShotUrl: string | null; teamAbbreviation: string | null }) => ({
            clientId: newId(),
            playerName: r.playerName,
            espnId: r.espnId,
            headShotUrl: r.headShotUrl,
            teamAbbreviation: r.teamAbbreviation ?? null,
          }))
        )
      } catch {
        // silently ignore — section just starts empty
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [position])

  // ── Search ───────────────────────────────────────────────────────────────────
  const handleQueryChange = (val: string) => {
    setQuery(val)
    setSelected(null)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 2) {
      setResults([])
      return
    }
    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await authFetch(
          `/api/admin/rankings/player-search?q=${encodeURIComponent(val)}&position=${position}`
        )
        setResults(res.ok ? await res.json() : [])
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
  }

  const handleSelectResult = (r: SearchResult) => {
    setSelected(r)
    setQuery(r.playerName)
    setResults([])
  }

  const isDuplicate = useCallback(
    (candidate: SearchResult) =>
      players.some(
        (p) =>
          (candidate.espnId != null && p.espnId === candidate.espnId) ||
          p.playerName.toLowerCase() === candidate.playerName.toLowerCase()
      ),
    [players]
  )

  const handleAdd = useCallback(() => {
    if (!selected || isFull) return
    if (isDuplicate(selected)) {
      toast({
        title: "Already ranked",
        description: `${selected.playerName} is already in this list.`,
        variant: "destructive",
      })
      return
    }
    setPlayers((prev) => [
      ...prev,
      {
        clientId: newId(),
        playerName: selected.playerName,
        espnId: selected.espnId,
        headShotUrl: selected.headshotUrl,
        teamAbbreviation: selected.teamAbbreviation,
      },
    ])
    setQuery("")
    setSelected(null)
    setResults([])
  }, [selected, isFull, isDuplicate, toast])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  const handleRemove = (clientId: string) => {
    setPlayers((prev) => prev.filter((p) => p.clientId !== clientId))
  }

  // ── Drag and drop ─────────────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setPlayers((prev) => {
      const oldIndex = prev.findIndex((p) => p.clientId === active.id)
      const newIndex = prev.findIndex((p) => p.clientId === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }, [])

  // ── Save ───────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await authFetch("/api/admin/rankings/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position,
          rankings: players.map((p, i) => ({
            rank: i + 1,
            playerName: p.playerName,
            espnId: p.espnId,
            headShotUrl: p.headShotUrl,
            teamAbbreviation: p.teamAbbreviation,
          })),
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err?.error || "Failed to save rankings", variant: "destructive" })
        return
      }
      toast({ title: "Saved!", description: `${label} rankings have been updated.` })
    } catch {
      toast({ title: "Error", description: "Network error — please try again.", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-white/50" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* ── Search + Add ──────────────────────────────────────────────────── */}
      <div className="relative">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isFull ? "Ranking is full" : "Search NFL players by name…"}
            disabled={isFull}
            className={DARK_INPUT}
          />
          <Button
            type="button"
            onClick={handleAdd}
            disabled={isFull || !selected}
            className="shrink-0 bg-primary font-semibold hover:bg-primary/90"
          >
            Add
          </Button>
        </div>

        {isFull && (
          <p className="mt-2 text-sm font-medium text-amber-400/80">
            Ranking is full — remove a player to add another.
          </p>
        )}

        {!isFull && query.trim().length >= 2 && (results.length > 0 || searching) && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-xl border border-white/15 shadow-2xl" style={{ backgroundColor: "#0a2d52" }}>
            {searching ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin text-white/50" />
              </div>
            ) : (
              results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelectResult(r)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-white/10"
                >
                  <Headshot src={r.headshotUrl} alt={r.playerName} />
                  <span className="truncate text-sm font-medium text-white">{r.playerName}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Ranked slots ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={players.map((p) => p.clientId)} strategy={verticalListSortingStrategy}>
            {players.map((p, i) => (
              <SortableSlot
                key={p.clientId}
                clientId={p.clientId}
                rank={i + 1}
                player={p}
                onRemove={() => handleRemove(p.clientId)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {Array.from({ length: TOTAL_SLOTS - players.length }, (_, i) => (
          <EmptySlot key={`empty-${i}`} rank={players.length + i + 1} />
        ))}
      </div>

      {/* ── Save ──────────────────────────────────────────────────────────── */}
      <Button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full font-bold bg-primary hover:bg-primary/90 sm:w-auto sm:self-end"
      >
        {saving ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving…
          </div>
        ) : (
          `Save ${label} Rankings`
        )}
      </Button>
    </div>
  )
}
