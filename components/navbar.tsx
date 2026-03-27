"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useState, useEffect } from "react"
import { User, LogOut } from 'lucide-react'
import Image from "next/image"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  async function handleLogout() {
    try {
      // Attempt server logout to revoke refresh cookie (best-effort)
      try {
        await fetch('http://localhost:5000/auth/logout', { method: 'POST', credentials: 'include' })
      } catch (_) {
        // ignore network errors
      }

      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setIsLoggedIn(false)
      setUser(null)
      try { window.dispatchEvent(new Event('authChanged')) } catch (e) {}
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-secondary/95 backdrop-blur-md shadow-lg" : "bg-secondary"}`}>
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
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-white font-medium transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </Link>
            <Link href="/games" className="text-white/90 hover:text-white font-medium transition-colors relative group">
              Games
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
