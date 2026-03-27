"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, User, Mail, Calendar, Clock, Upload, Trash2, Shield } from "lucide-react"

// User will be read from localStorage or fetched from the API

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<{ id?: number; username?: string; email?: string; avatar?: string; createdAt?: string } | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number"
    }
    return ""
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))

    if (field === "newPassword") {
      const error = validatePassword(value)
      setErrors((prev) => ({ ...prev, newPassword: error }))
    }

    if (field === "confirmPassword" || (field === "newPassword" && passwordForm.confirmPassword)) {
      const newPass = field === "newPassword" ? value : passwordForm.newPassword
      const confirmPass = field === "confirmPassword" ? value : passwordForm.confirmPassword
      if (confirmPass && newPass !== confirmPass) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }))
      }
    }
  }

  const handleSubmitPasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      currentPassword: passwordForm.currentPassword ? "" : "Current password is required",
      newPassword: validatePassword(passwordForm.newPassword),
      confirmPassword: passwordForm.newPassword !== passwordForm.confirmPassword ? "Passwords do not match" : "",
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error !== "")) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password Updated!",
      description: "Your password has been changed successfully.",
      className: "bg-green-500 text-white border-green-600",
    })

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Load user info from localStorage and optionally refresh from the API
  useEffect(() => {
    let mounted = true
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (mounted) setUser(parsed)
      }
    } catch (e) {
      // ignore
    }

    // If we have an access token, try to fetch fresh user info from server
    (async () => {
      try {
        const { isAuthenticated } = require('@/lib/auth-context').useAuth();
        if (!isAuthenticated) return;
        const { authFetch } = require('@/lib/api');
        const res = await authFetch('/auth/me', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.user) {
          setUser(data.user)
          try { localStorage.setItem('user', JSON.stringify(data.user)) } catch (e) {}
        }
      } catch (err) {
        // ignore fetch errors
      } finally {
        if (mounted) setLoadingUser(false)
      }
    })()

    return () => { mounted = false }
  }, [])

  const initials = user?.username ? user.username.substring(0, 2).toUpperCase() : "?"
  const formattedCreatedAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/70">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Account Information Card */}
          <Card className="border-white/10 shadow-xl animate-slide-up" style={{ backgroundColor: "#082644" }}>
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <User className="h-6 w-6" />
                Account Information
              </CardTitle>
              <CardDescription className="text-white/60">
                Your account details are linked to your profile and cannot be changed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Avatar Section */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || 'Profile'} />
                  <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white mb-1">{user?.username || ''}</h3>
                  <p className="text-white/60 text-sm mb-3">{user?.email || ''}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    disabled
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Picture (Coming Soon)
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* User Details Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/80 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={user?.username || ''}
                    disabled
                    className="bg-white/5 border-white/20 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-white/5 border-white/20 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="created" className="text-white/80 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Account Created
                  </Label>
                  <Input
                    id="created"
                    value={formattedCreatedAt}
                    disabled
                    className="bg-white/5 border-white/20 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastLogin" className="text-white/80 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Last Login
                  </Label>
                  <Input
                    id="lastLogin"
                    value={""}
                    disabled
                    className="bg-white/5 border-white/20 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-white/70">These details are linked to your account and cannot be changed.</p>
              </div>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card
            className="border-white/10 shadow-xl animate-slide-up [animation-delay:100ms]"
            style={{ backgroundColor: "#082644" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Change Password
              </CardTitle>
              <CardDescription className="text-white/60">
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPasswordChange} className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-white/80">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                      className="bg-white/5 border-white/20 text-white pr-10 focus:border-primary"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-400 text-sm animate-shake">{errors.currentPassword}</p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white/80">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      className="bg-white/5 border-white/20 text-white pr-10 focus:border-primary"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-red-400 text-sm animate-shake">{errors.newPassword}</p>}
                  {!errors.newPassword && passwordForm.newPassword && (
                    <p className="text-green-400 text-sm">Password meets requirements</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/80">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                      className="bg-white/5 border-white/20 text-white pr-10 focus:border-primary"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm animate-shake">{errors.confirmPassword}</p>
                  )}
                  {!errors.confirmPassword &&
                    passwordForm.confirmPassword &&
                    passwordForm.newPassword === passwordForm.confirmPassword && (
                      <p className="text-green-400 text-sm">Passwords match</p>
                    )}
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-sm font-medium text-white/80 mb-2">Password Requirements:</p>
                  <ul className="text-sm text-white/60 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-xs">•</span>
                      At least 8 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">•</span>
                      Contains uppercase and lowercase letters
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-xs">•</span>
                      Contains at least one number
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg transition-all hover:scale-[1.02]"
                >
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card
            className="border-red-500/20 shadow-xl animate-slide-up [animation-delay:200ms]"
            style={{ backgroundColor: "#082644", borderColor: "rgba(239, 68, 68, 0.2)" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
                <Trash2 className="h-6 w-6" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-white/60">
                Permanently delete your account and all associated data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                disabled
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account (Coming Soon)
              </Button>
              <p className="text-xs text-white/50 mt-2 text-center">
                This action cannot be undone. This feature will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
