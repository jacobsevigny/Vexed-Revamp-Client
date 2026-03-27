import { useState, useRef, useEffect } from 'react'
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
  const ref = useRef<HTMLInputElement>(null)
  const normalized = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/gi, '')
  const filtered = value ? suggestions.filter(s => normalized(s).includes(normalized(value))).slice(0, 50) : suggestions.slice(0, 50)
  const isExact = !!value && suggestions.includes(value)

  useEffect(() => {
    if (!focused && isExact && exactMatch) {
      ref.current?.blur()
    }
  }, [isExact, focused, exactMatch])

  return (
    <div className="relative">
      <Input
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(isExact && exactMatch ? 'ring-2 ring-[#2eaafd] border-[#2eaafd] bg-blue-50 font-semibold' : '', className)}
        autoComplete="off"
        {...props}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 animate-spin">⏳</div>
      )}
      {focused && filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-blue-100 rounded-md shadow-lg max-h-56 overflow-auto z-50">
          {filtered.map(s => (
            <div
              key={s}
              onMouseDown={() => { onSelect(s); setFocused(false) }}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-800"
            >
              {s}
            </div>
          ))}
        </div>
      )}
      {focused && !loading && filtered.length === 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-blue-100 rounded-md shadow-lg z-50 px-3 py-2 text-sm text-slate-400">No suggestions</div>
      )}
    </div>
  )
}
