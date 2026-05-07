import Image from "next/image"

/**
 * Decorative background pattern reused by the Hero section and error pages.
 * Renders a rotated grid of alternating logo-circle / logo-text SVGs at low
 * opacity. Place inside a `relative overflow-hidden` container.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 p-8 -rotate-12 scale-150">
        {Array.from({ length: 35 }).map((_, index) => {
          const row = Math.floor(index / 5)
          const col = index % 5
          const isCircle = (row + col) % 2 === 0
          return (
            <div key={index} className="flex items-center justify-center">
              {isCircle ? (
                <Image
                  src="/logo-circle.svg"
                  alt=""
                  width={120}
                  height={120}
                  className="w-20 h-20 md:w-28 md:h-28 opacity-60"
                />
              ) : (
                <Image
                  src="/logo-text.svg"
                  alt=""
                  width={180}
                  height={70}
                  className="w-28 h-11 md:w-40 md:h-16 opacity-60"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
