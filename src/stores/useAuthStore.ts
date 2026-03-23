import { create } from "zustand"
import { toast } from "sonner"
import { authService } from "@/services/authService"
import type { AuthState } from "@/types/store"
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => set({ accessToken: null, user: null, loading: false }),

    signUp: async (firstName, lastName, username, email, password) => {

        try {
            set({ loading: true })
            await authService.signUp(firstName, lastName, username, email, password);
            toast.success("Account created successfully!")
        } catch (error) {
            console.error("Sign Up Error:", error)
            toast.error("Failed to create account.")
        } finally {
            set({ loading: false })
        }
    },

    signIn: async (username, password) => {
        try {
            set({ loading: true })
            const { accessToken } = await authService.signIn(username, password)
            set({ accessToken })
            await get().fetchMe()
            toast.success("Signed in successfully!")
        } catch (error) {
            console.error("Sign In Error:", error)
            toast.error("Failed to sign in.")
        } finally {
            set({ loading: false })
        }
    },

    signOut: async () => {
        try {
            get().clearState()
            await authService.signOut()
            toast.success("Signed out successfully!")
        } catch (error) {
            console.error("Sign Out Error:", error)
            toast.error("Failed to sign out.")
        }
    },

    fetchMe: async () => {
        try {
            set({ loading: true })
            const user = await authService.fetchMe()
            console.log("Fetched User:", user)
            set({ user })
        } catch (error) {
            console.error("Fetch Me Error:", error)
            toast.error("Failed to fetch user data.")
        } finally {
            set({ loading: false })
        }
    },

    refreshToken: async () => {
        try{
            set({ loading: true })
            const { accessToken } = await authService.refreshToken()
            set({ accessToken })
            const {user, fetchMe} = get()
            if(!user){
                await fetchMe()
            }
        }catch(error){
            console.error("Refresh Token Error:", error)
            get().clearState()
            toast.error("Session expired. Please sign in again.")
        }finally{
            set({ loading: false })
        }
    },

    setAccessToken: (accessToken) => {
        set({ accessToken })
    }
}))
