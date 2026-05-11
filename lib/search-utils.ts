export function normalizeSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toLowerCase()
    .trim()
}

export function rankSuggestions(names: string[], query: string, limit = 10): string[] {
  const nq = normalizeSearch(query)
  if (!nq) return names.slice(0, limit)

  const matched = names.filter(n => normalizeSearch(n).includes(nq))

  matched.sort((a, b) => {
    const score = (s: string): number => {
      const ns = normalizeSearch(s)
      if (ns === nq) return 0
      if (ns.startsWith(nq)) return 1
      if (ns.split(" ").some(w => w.startsWith(nq))) return 2
      return 3
    }
    return score(a) - score(b)
  })

  return matched.slice(0, limit)
}
