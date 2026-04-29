"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { LogOut, User, Users, ShieldCheck, ChevronDown } from "lucide-react"

import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setProfileOpen(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setProfileOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-secondary/95 backdrop-blur-md shadow-lg" : "bg-secondary"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image
              src="/logo-full-transparent.svg"
              alt="Vexed Sports"
              width={160}
              height={46}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* Nav links (desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
              <Link href="/games" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Games
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
              <Link href="/stats" className="text-white/90 hover:text-white font-medium transition-colors relative group">
                Stats
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">

                {/* Admin link (admin only) */}
                {user?.isAdmin && (
                  <Link
                    href="/admin/add-trivia"
                    className="flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors text-sm"
                    title="Admin panel"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}

                {/* Profile dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(prev => !prev)}
                    className="flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors rounded-md px-2 py-1 hover:bg-white/10"
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                  >
                    <User className="h-4 w-4 shrink-0" />
                    <span className="hidden sm:inline max-w-[120px] truncate">{user?.username}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-white/60 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 shadow-2xl overflow-hidden z-[9999]"
                      style={{ backgroundColor: "#082644" }}
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <User className="h-4 w-4 text-white/60" />
                        Profile
                      </Link>
                      <div className="border-t border-white/10" />
                      <Link
                        href="/friends"
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Users className="h-4 w-4 text-white/60" />
                        Friends
                      </Link>
                    </div>
                  )}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors text-sm"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-white/90 hover:text-white font-medium transition-colors relative group text-sm">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}
