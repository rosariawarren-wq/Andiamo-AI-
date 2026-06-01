import { useUser, useClerk } from '@clerk/clerk-react'

export function useAuth() {
  const { user, isLoaded } = useUser()
  const { openSignIn, openSignUp, signOut } = useClerk()
  return {
    user,
    isLoaded,
    openSignIn,
    openSignUp,
    signOut,
    isSignedIn: !!user
  }
}
