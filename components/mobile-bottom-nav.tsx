"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Gamepad2, Users, BarChart3 } from "lucide-react"
import { GAMES } from "@/lib/games-config"

// Individual game pages (Daily Quest, Fan Feud, etc.) count as part of the
// "Games" section so the tab stays highlighted while playing. The standalone
// /games hub page was removed — Games now lives at #games on the home page.
const GAME_ROUTES = GAMES.map((g) => g.href)

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Games", href: "/#games", icon: Gamepad2 },
  { label: "Friends", href: "/friends", icon: Users },
  { label: "Stats", href: "/stats", icon: BarChart3 },
] as const

function isTabActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/"
  if (href === "/#games") {
    return GAME_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MobileBottomNav() {
  const pathname = usePathname()

  // When already on the home page, smooth-scroll to a hash-target tab
  // instead of doing a full navigation (matches the desktop navbar and the
  // hero section's existing scroll-to-games behavior).
  const handleTabClick = (e: React.MouseEvent, href: string) => {
    const hashIndex = href.indexOf("#")
    if (hashIndex === -1) return
    const targetPath = href.slice(0, hashIndex) || "/"
    if (pathname !== targetPath) return
    e.preventDefault()
    document.getElementById(href.slice(hashIndex + 1))?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-secondary border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-4 h-16">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active = isTabActive(href, pathname)
          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleTabClick(e, href)}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                active ? "text-[#2eaafd]" : "text-white/60 hover:text-white/90"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
