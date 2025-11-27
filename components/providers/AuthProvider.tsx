'use client'

import { SessionProvider } from "next-auth/react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider

// Export a hook that mimics the old one for backward compatibility if needed,
// but ideally we should switch to useSession() in components.
// For now, let's export a simple useAuth that wraps useSession to minimize refactoring errors immediately,
// or better yet, we will refactor the consumers.
//
// However, since we are removing the old auth logic entirely, 
// any component using `useAuth` will break unless we provide a compatibility layer 
// OR refactor them.
//
// Let's check where useAuth is used.
// It was used in:
// - login/page.tsx (we are rewriting this)
// - forgot-password/page.tsx (we are deleting this)
// - reset-password/page.tsx (we are deleting this)
//
// So we might not need a compatibility layer if we fix the consumers.
// But let's keep the export to avoid build errors in other files we haven't checked.
// Actually, let's just export the provider for now.

