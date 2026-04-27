"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function AutocompleteInput({
  value,
  onChange,
  onSelect,
  suggestions,
  placeholder,
  loading,
  disabled,
  className,
  exactMatch,
  ...props
}: {
  value: string
  onChange: (val: string) => void
  onSelect: (val: string) => void
  suggestions: string[]
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  className?: string
  exactMatch?: boolean
  [key: string]: any
}) {
  const [focused, setFocused] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [mounted, setMounted] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const normalized = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/gi, '')
  const filtered = value
    ? suggestions.filter(s => normalized(s).includes(normalized(value))).slice(0, 50)
    : suggestions.slice(0, 50)
  const isExact = !!value && suggestions.includes(value)

  // Measure and track the wrapper's position for the portal dropdown.
  // Runs whenever the dropdown is open, and updates on scroll/resize so the
  // dropdown follows the input if the page scrolls while it is open.
  const updateRect = useCallback(() => {
    if (wrapperRef.current) setRect(wrapperRef.current.getBoundingClientRect())
  }, [])

  useEffect(() => {
    if (!focused) { setRect(null); return }
    updateRect()
    window.addEventListener('scroll', updateRect, true)
    window.addEventListener('resize', updateRect)
    return () => {
      window.removeEventListener('scroll', updateRect, true)
      window.removeEventListener('resize', updateRect)
    }
  }, [focused, updateRect])

  const showDropdown = focused && rect && (filtered.length > 0 || (!loading && value))

  const dropdownStyle: React.CSSProperties = rect
    ? { position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width, zIndex: 9999 }
    : {}

  const dropdown = showDropdown ? (
    <div
      style={dropdownStyle}
      className="bg-white border border-blue-100 rounded-md shadow-xl max-h-56 overflow-auto"
    >
      {filtered.length > 0 ? (
        filtered.map(s => (
          <div
            key={s}
            onMouseDown={() => { onSelect(s); setFocused(false) }}
            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-800"
          >
            {s}
          </div>
        ))
      ) : (
        <div className="px-3 py-2 text-sm text-slate-400">No suggestions</div>
      )}
    </div>
  ) : null

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          isExact && exactMatch ? 'ring-2 ring-[#2eaafd] border-[#2eaafd] font-semibold' : '',
          className,
        )}
        autoComplete="off"
        {...props}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 text-xs animate-pulse">…</div>
      )}
      {mounted && dropdown && createPortal(dropdown, document.body)}
    </div>
  )
}
