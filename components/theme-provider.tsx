'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { AuthProvider } from '@/lib/auth-context'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <AuthProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </AuthProvider>
  )
}
