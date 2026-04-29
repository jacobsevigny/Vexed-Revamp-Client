"use client"

import Link from "next/link"
import { ShieldOff } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-16"
      style={{ backgroundColor: "#2eaafd" }}
    >
      <div
        className="rounded-2xl border border-white/10 shadow-xl p-10 text-center max-w-sm w-full"
        style={{ backgroundColor: "#082644" }}
      >
        <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <ShieldOff className="h-8 w-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          You don't have permission to view this page. Admin access is required.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#2eaafd] hover:bg-[#2eaafd]/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
