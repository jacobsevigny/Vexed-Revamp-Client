"use client"
import type React from "react"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Persist minimal auth state client-side
      if (data.accessToken) localStorage.setItem('accessToken', data.accessToken)
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user))

      // Notify other parts of the app in the same window about auth change
      try {
        window.dispatchEvent(new Event('authChanged'))
      } catch (e) {
        // ignore
      }

      setIsLoading(false)
      router.push('/')
    } catch (err: any) {
      console.error('Login error', err)
      setError(err?.message || 'Network error')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary/95 to-primary p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 hover:opacity-90 transition-opacity">
          <svg className="h-16 w-auto" viewBox="0 0 4106.94 1181.83" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`
                .cls-1 { fill: #7bc143; }
                .cls-1, .cls-2, .cls-3, .cls-4, .cls-5 { stroke-width: 0px; }
                .cls-2 { fill: #c9cac4; }
                .cls-3 { fill: #f0efef; }
                .cls-4 { fill: #fff; }
                .cls-5 { fill: #1958a4; }
              `}</style>
            </defs>
            <g>
              <circle className="cls-3" cx="590.83" cy="558.19" r="26.46" />
              <g>
                <path
                  className="cls-5"
                  d="M804.1,909.59c54.07-11.81,107.27-26.45,158.84-43.77l-130.34,300.86h-219.13l-94.42-217.97c91.51-4.62,187.17-17.73,285.05-39.12Z"
                />
                <path
                  className="cls-5"
                  d="M1392.3,15.15l-135.3,171.83-47.4,109.42-2.1,4.84-39.02,90.1-130.24,300.63c-80.17,37.2-171.16,67.43-263.91,87.68-107.86,23.54-215.97,36.08-312.78,36.31l-111.89-258.3h-.02l-40.43-93.39-120.13-277.29L53.78,15.15l428.77,147.28,170.96,347.07c-113.24-99.76-336.25-226.51-336.25-226.51l146.74,180c-33.27,95.46,23.46,205.12,127.1,187.12,68.37-11.88,84.27-59.4,87.19-90.32l44.75,90.87,44.75-90.87c2.91,30.92,18.82,78.44,87.19,90.32,103.64,18.01,160.37-91.66,127.1-187.12l146.74-180s-223,126.75-336.25,226.51l170.96-347.07L1392.3,15.15Z"
                />
                <circle className="cls-3" cx="855.25" cy="558.19" r="26.46" />
              </g>
              <polygon className="cls-1" points="309.21 464.27 349.67 557.66 349.65 557.66 309.21 464.27" />
              <polygon className="cls-1" points="1207.51 301.24 1168.48 391.34 1168.46 391.34 1207.51 301.24" />
              <path
                className="cls-4"
                d="M1425.89,448.27c-12.37-64.46-86.17-103.46-198.08-119.34l-17.93,41.37c72.27,16.3,116.7,45.25,122.18,79.6,6.54,40.93-17.26,101.78-127.96,180.89-42.46,30.35-90.67,58.31-143.13,83.26-84.59,40.28-180.2,72.69-280.31,94.55-110.9,24.2-222.17,37-321.78,37-5.71,0-11.31-.02-16.84-.12-198.65-2.49-291.07-49.55-302.44-101.54-9.76-44.8,31.84-112.58,125.69-171.73,14.67-9.24,30.21-18.43,46.48-27.44l-17.24-39.79c-162.34,82.57-258.35,180.82-239.55,266.94,21.78,99.73,190.6,153.55,419.61,148.74,98.84-2.07,208.9-15.07,323.18-40.01,78.22-17.07,152.02-39.69,219.65-66.07,260.15-101.39,429.24-258.08,408.47-366.31Z"
              />
            </g>
          </svg>
        </Link>

        <Card className="border-0 shadow-2xl animate-slide-up">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-balance">Welcome Back</CardTitle>
            <CardDescription className="text-base">Sign in to continue your sports trivia journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-11 font-semibold" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* OAuth buttons removed per request */}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
