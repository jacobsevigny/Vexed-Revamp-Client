"use client"

import { useState } from "react"

// Used on the /rankings/[position] detail page. Every entry here is a real
// ranked player, so there's no "no player" case — only "no headshot on file"
// or "headshot 404s", both of which should just hide the image (no broken
// icon), leaving the neutral circle background as a quiet placeholder.
export function RankingHeadshot({
  src,
  alt,
  className,
}: {
  src: string | null
  alt: string
  className: string
}) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setErrored(true)} className={className} />
  )
}
