export function useAuth() {
  return {
    user: null,
    isLoaded: true,
    openSignIn: () => {},
    openSignUp: () => {},
    signOut: () => {},
    isSignedIn: false
  }
}
