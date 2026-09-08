"use client"

import { useState } from "react"

// Two distinct fallback cases for the home/index position cards:
//  - no player ranked yet for this position  → generic silhouette placeholder
//  - a player exists but their headshot 404s → hide the image entirely
export function PositionCardHeadshot({
  src,
  alt,
  hasPlayer,
}: {
  src: string | null
  alt: string
  hasPlayer: boolean
}) {
  const [errored, setErrored] = useState(false)

  if (!hasPlayer) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/placeholder-user.jpg"
        alt=""
        className="h-20 w-20 rounded-full border-2 border-white/10 bg-white/5 object-cover opacity-50 sm:h-24 sm:w-24"
      />
    )
  }

  if (!src || errored) {
    return <div className="h-20 w-20 rounded-full border-2 border-white/10 bg-white/5 sm:h-24 sm:w-24" />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-20 w-20 rounded-full border-2 border-white/10 bg-white/5 object-cover sm:h-24 sm:w-24"
    />
  )
}
